import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { gerarDadosTelemetria } from '@/lib/telemetriaGenerator';
import { TelemetryData } from '@/types/telemetry';

type TimeSeriesData = {
  timestamp: string;
  time: string;
  value: number;
};

type Measurement = {
  value: number;
  unit: string;
  data: TimeSeriesData[];
};

type Equipment = {
  name: string;
  measurement: {
    [measurementName: string]: Measurement;
  };
};

type IndexStructure = {
  name: string;
  equipment: {
    [resource: string]: Equipment;
  };
};

type CSVRow = {
  timestamp: string;
  index: string;
  NOME: string;
  RECURSO: string;
  measurement_name: string;
  measurement_value: string;
  UM: string;
};

// Cache para armazenar os dados do CSV
let csvCache: {
  data: CSVRow[];
  lastRead: number;
} | null = null;

// Função para ler o CSV com cache
async function readCSVWithCache(): Promise<CSVRow[]> {
  const CACHE_DURATION = 5 * 60 * 1000; // 10 minutos em milissegundos
  const now = Date.now();

  // Se o cache existe e não expirou, retorna os dados do cache
  if (csvCache && (now - csvCache.lastRead) < CACHE_DURATION) {
    console.log('Retornando dados do cache');
    return csvCache.data;
  }

  console.log('Cache expirado ou não existe, lendo arquivo CSV');
  const filePath = path.join(process.cwd(), 'data', 'telemetria.csv');

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo de telemetria não encontrado');
  }

  // Lê o arquivo CSV com streaming para melhor performance
  const data = await new Promise<CSVRow[]>((resolve, reject) => {
    const results: CSVRow[] = [];
    const stream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 }); // 64KB chunks

    stream
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim(),
        mapValues: ({ value }) => value.trim()
      }))
      .on('data', (row: CSVRow) => results.push(row))
      .on('end', () => {
        console.log(`CSV lido com sucesso: ${results.length} registros`);
        resolve(results);
      })
      .on('error', (error: Error) => {
        console.error('Erro ao ler CSV:', error);
        reject(error);
      });
  });

  // Atualiza o cache
  csvCache = {
    data,
    lastRead: now
  };

  return data;
}

// Função para normalizar o formato do timestamp
function normalizeTimestamp(timestamp: string): Date {
  const [datePart, timePart] = timestamp.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  
  if (isNaN(date.getTime())) {
    console.error('Timestamp inválido:', timestamp);
    throw new Error('Formato de timestamp inválido');
  }
  
  return date;
}

// Função para filtrar dados por período
function filterDataByTimeRange(data: any[], timeRange: string): any[] {
  const now = new Date();
  let startTime: Date;

  const match = timeRange.match(/^(\d+)([hdm])$/);
  
  if (!match) {
    console.log('Formato de tempo inválido, usando padrão 24h');
    startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  } else {
    const [, value, unit] = match;
    const numericValue = parseInt(value, 10);

    const milliseconds = numericValue * (
      unit === 'h' ? 60 * 60 * 1000 :
      unit === 'd' ? 24 * 60 * 60 * 1000 :
      60 * 1000
    );

    startTime = new Date(now.getTime() - milliseconds);
  }

  return data.filter(row => {
    try {
      const rowDate = normalizeTimestamp(row.timestamp);
      return rowDate >= startTime && rowDate <= now;
    } catch (error) {
      console.error('Erro ao processar timestamp:', row.timestamp);
      return false;
    }
  }).sort((a, b) => {
    const dateA = normalizeTimestamp(a.timestamp);
    const dateB = normalizeTimestamp(b.timestamp);
    return dateA.getTime() - dateB.getTime();
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '12h';

    // Gera os dados simulados
    const rawData = gerarDadosTelemetria();

    // Filtra os dados pelo período selecionado
    const filteredData = filterDataByTimeRange(rawData, timeRange);

    const telemetryData: TelemetryData = {};

    // Se não houver dados filtrados, retorna um objeto vazio
    if (filteredData.length === 0) {
      console.log('Nenhum dado encontrado para o período:', timeRange);
      return NextResponse.json(telemetryData);
    }

    // Agrupa os dados por índice, equipamento e medição
    const groupedData: { [key: string]: { [key: string]: { [key: string]: any[] } } } = {};

    filteredData.forEach((row) => {
      const index = row.index;
      const recurso = row.RECURSO;
      const measurementName = row.measurement_name;
      const measurementValue = parseFloat(row.measurement_value);
      const timestamp = row.timestamp;

      try {
        const normalizedDate = normalizeTimestamp(timestamp);
        
        if (!groupedData[index]) {
          groupedData[index] = {};
        }
        if (!groupedData[index][recurso]) {
          groupedData[index][recurso] = {};
        }
        if (!groupedData[index][recurso][measurementName]) {
          groupedData[index][recurso][measurementName] = [];
        }

        groupedData[index][recurso][measurementName].push({
          timestamp: normalizedDate.toISOString(),
          time: normalizedDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          value: measurementValue
        });
      } catch (error) {
        console.error('Erro ao processar timestamp no agrupamento:', timestamp);
      }
    });

    // Processa os dados agrupados
    Object.entries(groupedData).forEach(([index, equipmentData]) => {
      if (!telemetryData[index]) {
        const firstRow = filteredData.find(row => row.index === index);
        telemetryData[index] = {
          name: firstRow?.NOME || '',
          equipment: {}
        };
      }

      Object.entries(equipmentData).forEach(([recurso, measurements]) => {
        if (!telemetryData[index].equipment[recurso]) {
          telemetryData[index].equipment[recurso] = {
            name: recurso,
            measurement: {}
          };
        }

        Object.entries(measurements).forEach(([measurementName, timeSeriesData]) => {
          const firstRow = filteredData.find(row => 
            row.index === index && 
            row.RECURSO === recurso && 
            row.measurement_name === measurementName
          );

          telemetryData[index].equipment[recurso].measurement[measurementName] = {
            value: timeSeriesData[timeSeriesData.length - 1].value,
            unit: firstRow?.UM || '',
            data: timeSeriesData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
          };
        });
      });
    });

    return NextResponse.json(telemetryData);
  } catch (error) {
    console.error('Erro ao processar dados de telemetria:', error);
    return NextResponse.json(
      { error: 'Erro ao processar dados de telemetria', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'telemetria.csv');

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Arquivo de telemetria não encontrado' },
        { status: 404 }
      );
    }

    // Lê o arquivo CSV atual
    const currentData = await new Promise<CSVRow[]>((resolve, reject) => {
      const results: CSVRow[] = [];
      fs.createReadStream(filePath)
        .pipe(csv({
          mapHeaders: ({ header }) => header.trim(),
          mapValues: ({ value }) => value.trim()
        }))
        .on('data', (row: CSVRow) => results.push(row))
        .on('end', () => resolve(results))
        .on('error', (error: Error) => reject(error));
    });

    // Atualiza os dados
    const updatedData = [...currentData, ...data];

    // Escreve os dados atualizados no arquivo
    const headers = 'timestamp,index,NOME,RECURSO,measurement_name,measurement_value,UM\n';
    const csvContent = headers + updatedData.map(row => 
      `${row.timestamp},${row.index},${row.NOME},${row.RECURSO},${row.measurement_name},${row.measurement_value},${row.UM}`
    ).join('\n');

    fs.writeFileSync(filePath, csvContent);

    // Limpa o cache após atualização
    csvCache = null;

    return NextResponse.json({ message: 'Dados atualizados com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar arquivo de telemetria:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar arquivo de telemetria' },
      { status: 500 }
    );
  }
}

export async function GETGerarDadosTelemetria() {
  try {
    const dados = gerarDadosTelemetria();
    return NextResponse.json(dados);
  } catch (error) {
    console.error('Erro ao gerar dados de telemetria:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar dados de telemetria' },
      { status: 500 }
    );
  }
} 