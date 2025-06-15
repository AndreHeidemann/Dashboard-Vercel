import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

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

type TelemetryData = {
  [index: string]: IndexStructure;
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
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos
  const now = Date.now();

  // Se o cache existe e não expirou, retorna os dados do cache
  if (csvCache && (now - csvCache.lastRead) < CACHE_DURATION) {
    return csvCache.data;
  }

  const filePath = path.join(process.cwd(), 'data', 'telemetria.csv');

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo de telemetria não encontrado');
  }

  // Lê o arquivo CSV
  const data = await new Promise<CSVRow[]>((resolve, reject) => {
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

  // Atualiza o cache
  csvCache = {
    data,
    lastRead: now
  };

  return data;
}

// Função para filtrar dados por período
function filterDataByTimeRange(data: CSVRow[], timeRange: string): CSVRow[] {
  const now = new Date();
  let startTime: Date;

  // Extrai o número e a unidade do timeRange (ex: "1h" -> { value: 1, unit: "h" })
  const match = timeRange.match(/^(\d+)([hdm])$/);
  
  if (!match) {
    // Se o formato não for válido, usa 24h como padrão
    startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  } else {
    const [, value, unit] = match;
    const numericValue = parseInt(value, 10);

    // Calcula o tempo em milissegundos baseado na unidade
    const milliseconds = numericValue * (
      unit === 'h' ? 60 * 60 * 1000 : // horas
      unit === 'd' ? 24 * 60 * 60 * 1000 : // dias
      60 * 1000 // minutos
    );

    startTime = new Date(now.getTime() - milliseconds);
  }

  return data.filter(row => {
    const rowDate = new Date(row.timestamp);
    return rowDate >= startTime && rowDate <= now;
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '24h';

    // Lê os dados do CSV (com cache)
    const data = await readCSVWithCache();

    // Filtra os dados pelo período selecionado
    const filteredData = filterDataByTimeRange(data, timeRange);

    const telemetryData: TelemetryData = {};

    // Agrupa os dados por índice, equipamento e medição
    const groupedData: { [key: string]: { [key: string]: { [key: string]: TimeSeriesData[] } } } = {};

    filteredData.forEach((row) => {
      const index = row.index;
      const recurso = row.RECURSO;
      const measurementName = row.measurement_name;
      const measurementValue = parseFloat(row.measurement_value);
      const timestamp = row.timestamp;

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
        timestamp: timestamp,
        time: timestamp.split(' ')[1],
        value: measurementValue
      });
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
    console.error('Erro ao processar arquivo de telemetria:', error);
    return NextResponse.json(
      { error: 'Erro ao processar arquivo de telemetria', details: error instanceof Error ? error.message : String(error) },
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