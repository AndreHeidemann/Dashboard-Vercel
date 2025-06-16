import { addDays, subDays, format, addMinutes } from 'date-fns';

// Estrutura de dados
const estrutura = {
  "CEM": {
    "NOME": "Cobertura",
    "Reator 4": [
      ["Status agitador interno", "Bool"],
      ["Velocidade impelidor interno", "RPM"],
      ["Status agitador externo", "Bool"],
      ["Velocidade impelidor externo", "RPM"],
      ["Peso", "Kg"],
      ["Temperatura", "ºC"]
    ],
    "Reator 5": [
      ["Status agitador interno", "Bool"],
      ["Velocidade impelidor interno", "RPM"],
      ["Status agitador externo", "Bool"],
      ["Velocidade impelidor externo", "RPM"],
      ["Peso", "Kg"],
      ["Temperatura", "ºC"]
    ]
  },
  "PSV": {
    "NOME": "Pastas Massas e Variegatos",
    "Misturador 1": [
      ["Frequência bomba", "Hz"],
      ["Frequência misturador", "Hz"],
      ["Frequência samba", "Hz"],
      ["Peso misturador", "Kg"],
      ["Temperatura", "ºC"],
      ["Setpoint Temperatura", "ºC"]
    ],
    "Misturador 2": [
      ["Frequência bomba", "Hz"],
      ["Frequência misturador", "Hz"],
      ["Frequência samba", "Hz"],
      ["Peso misturador", "Kg"],
      ["Temperatura", "ºC"],
      ["Setpoint Temperatura", "ºC"]
    ],
    "Misturador 3": [
      ["Frequência bomba", "Hz"],
      ["Frequência misturador", "Hz"],
      ["Frequência samba", "Hz"],
      ["Peso misturador", "Kg"],
      ["Temperatura", "ºC"],
      ["Setpoint Temperatura", "ºC"]
    ],
    "Misturador 4": [
      ["Frequência bomba", "Hz"],
      ["Frequência misturador", "Hz"],
      ["Frequência samba", "Hz"],
      ["Peso misturador", "Kg"],
      ["Temperatura", "ºC"],
      ["Setpoint Temperatura", "ºC"]
    ],
    "Moinho 1": [
      ["Corrente do moinho", "A"],
      ["Potência do moinho", "kW"],
      ["Pressão interna", "Bar"],
      ["Rotação", "RPM"],
      ["Temp. Entrada", "ºC"],
      ["Temp. Saida", "ºC"],
      ["Temp. Saida Trocador", "ºC"],
      ["Frequência bomba alimentação", "Hz"],
      ["Frequência bomba descarga", "Hz"]
    ],
    "Moinho 2": [
      ["Corrente do moinho", "A"],
      ["Potência do moinho", "kW"],
      ["Pressão interna", "Bar"],
      ["Rotação", "RPM"],
      ["Temp. Entrada", "ºC"],
      ["Temp. Saida", "ºC"],
      ["Temp. Saida Trocador", "ºC"],
      ["Frequência bomba alimentação", "Hz"],
      ["Frequência bomba descarga", "Hz"]
    ],
    "Moinho 3": [
      ["Corrente do moinho", "A"],
      ["Potência do moinho", "kW"],
      ["Pressão interna", "Bar"],
      ["Rotação", "RPM"],
      ["Temp. Entrada", "ºC"],
      ["Temp. Saida", "ºC"],
      ["Temp. Saida Trocador", "ºC"],
      ["Frequência bomba alimentação", "Hz"],
      ["Frequência bomba descarga", "Hz"]
    ],
    "Moinho 4": [
      ["Corrente do moinho", "A"],
      ["Potência do moinho", "kW"],
      ["Pressão interna", "Bar"],
      ["Rotação", "RPM"],
      ["Temp. Entrada", "ºC"],
      ["Temp. Saida", "ºC"],
      ["Temp. Saida Trocador", "ºC"],
      ["Frequência bomba alimentação", "Hz"],
      ["Frequência bomba descarga", "Hz"]
    ],
    "Moinho 5": [
      ["Corrente do moinho", "A"],
      ["Potência do moinho", "kW"],
      ["Pressão interna", "Bar"],
      ["Rotação", "RPM"],
      ["Temp. Entrada", "ºC"],
      ["Temp. Saida", "ºC"],
      ["Temp. Saida Trocador", "ºC"],
      ["Frequência bomba alimentação", "Hz"],
      ["Frequência bomba descarga", "Hz"]
    ],
    "Moinho 6": [
      ["Corrente do moinho", "A"],
      ["Potência do moinho", "kW"],
      ["Pressão interna", "Bar"],
      ["Rotação", "RPM"],
      ["Temp. Entrada", "ºC"],
      ["Temp. Saida", "ºC"],
      ["Temp. Saida Trocador", "ºC"],
      ["Frequência bomba alimentação", "Hz"],
      ["Frequência bomba descarga", "Hz"]
    ],
    "Reator 1": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador 1", "A"],
      ["Corrente agitador 2", "A"],
      ["Frequência agitador 1", "Hz"],
      ["Frequência agitador 2", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Reator 2": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador 1", "A"],
      ["Corrente agitador 2", "A"],
      ["Frequência agitador 1", "Hz"],
      ["Frequência agitador 2", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Reator 3": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador 1", "A"],
      ["Corrente agitador 2", "A"],
      ["Frequência agitador 1", "Hz"],
      ["Frequência agitador 2", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Reator 4": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador 1", "A"],
      ["Corrente agitador 2", "A"],
      ["Frequência agitador 1", "Hz"],
      ["Frequência agitador 2", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Reator 5": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador 1", "A"],
      ["Corrente agitador 2", "A"],
      ["Frequência agitador 1", "Hz"],
      ["Frequência agitador 2", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Reator 6": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador 1", "A"],
      ["Corrente agitador 2", "A"],
      ["Frequência agitador 1", "Hz"],
      ["Frequência agitador 2", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Tanque Processo 1": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador", "A"],
      ["Frequência agitador", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Tanque Processo 2": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador", "A"],
      ["Frequência agitador", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Tanque Processo 3": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador", "A"],
      ["Frequência agitador", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Tanque Finalização 4": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador", "A"],
      ["Frequência agitador", "Hz"],
      ["Temperatura", "ºC"]
    ],
    "Tanque Finalização 5": [
      ["Setpoint Temperatura", "ºC"],
      ["Corrente agitador", "A"],
      ["Frequência agitador", "Hz"],
      ["Temperatura", "ºC"]
    ]
  },
  "DET": {
    "NOME": "Destilaria",
    "Reator B": [
      ["Velocidade Agitador", "RPM"],
      ["Pressão Interna", "Bar"],
      ["Temperatura", "ºC"]
    ],
    "Reator H": [
      ["Velocidade Agitador", "RPM"],
      ["Pressão Interna", "Bar"],
      ["Temperatura", "ºC"]
    ],
    "Reator K": [
      ["Velocidade Agitador", "RPM"],
      ["Pressão Interna", "Bar"],
      ["Temperatura", "ºC"]
    ],
    "Reator M": [
      ["Velocidade Agitador", "RPM"],
      ["Pressão Interna", "Bar"],
      ["Temperatura", "ºC"]
    ],
    "Reator P": [
      ["Velocidade Agitador", "RPM"],
      ["Pressão Interna", "Bar"],
      ["Temperatura", "ºC"]
    ]
  },
  "SPR": {
    "NOME": "Spray",
    "Spray 2": [
      ["Temperatura entrada", "ºC"],
      ["Temperatura saida", "ºC"],
      ["Vazão bomba alimentação", "RPM"],
      ["Velocidade atomizador", "RPM"],
      ["Velocidade do exaustor", "RPM"]
    ],
    "Spray 4": [
      ["Temperatura entrada", "ºC"],
      ["Temperatura saida", "ºC"],
      ["Vazão bomba alimentação", "RPM"],
      ["Velocidade atomizador", "RPM"],
      ["Velocidade do exaustor", "RPM"]
    ],
    "Spray 5": [
      ["Temperatura entrada", "ºC"],
      ["Temperatura saida", "ºC"],
      ["Vazão bomba alimentação", "RPM"],
      ["Velocidade atomizador", "RPM"],
      ["Velocidade do exaustor", "RPM"]
    ],
    "Spray 6": [
      ["Temperatura entrada", "ºC"],
      ["Temperatura saida", "ºC"],
      ["Vazão bomba alimentação", "RPM"],
      ["Velocidade atomizador", "RPM"],
      ["Velocidade do exaustor", "RPM"]
    ],
    "Spray 7": [
      ["Temperatura entrada", "ºC"],
      ["Temperatura saida", "ºC"],
      ["Vazão bomba alimentação", "RPM"],
      ["Velocidade atomizador", "RPM"],
      ["Velocidade do exaustor", "RPM"]
    ],
    "Spray 8": [
      ["Temperatura entrada", "ºC"],
      ["Temperatura saida", "ºC"],
      ["Vazão bomba alimentação", "RPM"],
      ["Velocidade atomizador", "RPM"],
      ["Velocidade do exaustor", "RPM"]
    ],
    "Spray 9": [
      ["Temperatura entrada", "ºC"],
      ["Temperatura saida", "ºC"],
      ["Vazão bomba alimentação", "RPM"],
      ["Velocidade atomizador", "RPM"],
      ["Velocidade do exaustor", "RPM"]
    ]
  },
  "FLO": {
    "NOME": "Flocos",
    "Queimador 1": [
      ["Frequência exaustor", "Hz"],
      ["Temperatura queimador", "ºC"]
    ],
    "Queimador 2": [
      ["Frequência exaustor", "Hz"],
      ["Temperatura queimador", "ºC"]
    ],
    "Queimador 4": [
      ["Frequência exaustor", "Hz"],
      ["Temperatura queimador", "ºC"]
    ]
  }
};

// Faixas de valores
const faixas: Record<string, [number, number]> = {
  "Bool": [0, 1],
  "RPM": [500, 3000],
  "Hz": [10, 60],
  "Kg": [100, 1000],
  "ºC": [20, 120],
  "Bar": [0.5, 10],
  "A": [5, 100],
  "kW": [10, 200],
};

const faixasEspecificas: Record<string, [number, number]> = {
  "Temperatura queimador": [400, 900],
  "Temperatura entrada": [60, 90],
  "Temperatura saida": [70, 120],
  "Temp. Entrada": [60, 90],
  "Temp. Saida": [70, 120],
  "Temp. Saida Trocador": [60, 100],
  "Peso": [100, 1000],
  "Peso misturador": [100, 1000],
};

// Função para obter faixa do sensor
function getFaixa(sensor: string, um: string): [number, number] {
  if (sensor in faixasEspecificas) {
    return faixasEspecificas[sensor as keyof typeof faixasEspecificas];
  }
  return faixas[um as keyof typeof faixas] || [0, 1];
}

// Função para gerar valor aleatório dentro de uma faixa
function gerarValorAleatorio(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Função para gerar status de operação
function gerarStatusOperacao(): number {
  return Math.random() > 0.2 ? 1 : 0; // 80% de chance de estar ligado
}

// Função para gerar timestamps
function gerarTimestamps(): Date[] {
  const startTime = new Date();
  // Arredonda para o próximo período de 5 minutos
  const minutos = startTime.getMinutes();
  const minutosArredondados = Math.ceil(minutos / 5) * 5;
  startTime.setMinutes(minutosArredondados);
  startTime.setSeconds(0, 0);
  
  const endTime = subDays(startTime, 7);
  const timestamps: Date[] = [];
  
  let t = startTime;
  while (t > endTime) {
    timestamps.push(t);
    t = addMinutes(t, -5);
  }
  
  return timestamps.reverse();
}

// Função para gerar períodos de operação
function gerarPeriodosOperacao(total: number): Array<[number, number, number]> {
  const periodos: Array<[number, number, number]> = [];
  let i = 0;
  
  while (i < total) {
    // Ligado: 2-8h (24-96 períodos de 5min)
    const ligado = Math.floor(Math.random() * (96 - 24 + 1)) + 24;
    const desligado = Math.floor(Math.random() * (36 - 12 + 1)) + 12;
    
    const ini = i;
    const fim = Math.min(i + ligado, total - 1);
    periodos.push([ini, fim, 1]); // 1 = ligado
    i = fim + 1;
    
    if (i >= total) break;
    
    const iniDesligado = i;
    const fimDesligado = Math.min(i + desligado, total - 1);
    periodos.push([iniDesligado, fimDesligado, 0]); // 0 = desligado
    i = fimDesligado + 1;
  }
  
  return periodos;
}

// Função para verificar status de operação
function statusOperacao(periodos: Array<[number, number, number]>, idx: number): number {
  for (const [ini, fim, status] of periodos) {
    if (ini <= idx && idx <= fim) {
      return status;
    }
  }
  return 0;
}

// Função principal para gerar dados dos últimos 7 dias
export function gerarDadosTelemetria() {
  const timestamps = gerarTimestamps();
  const dados: any[] = [];
  
  // Gerar períodos de operação para cada recurso
  const periodosOperacao: Record<string, Array<[number, number, number]>> = {};
  
  for (const [sigla, info] of Object.entries(estrutura)) {
    for (const recurso of Object.keys(info)) {
      if (recurso !== "NOME") {
        periodosOperacao[`${sigla}-${recurso}`] = gerarPeriodosOperacao(timestamps.length);
      }
    }
  }

  // Gerar dados para cada timestamp
  for (let i = 0; i < timestamps.length; i++) {
    const timestamp = timestamps[i];
    
    for (const [sigla, info] of Object.entries(estrutura)) {
      const nome = info.NOME;
      
      for (const [recurso, sensores] of Object.entries(info)) {
        if (recurso === "NOME") continue;
        
        const status = statusOperacao(periodosOperacao[`${sigla}-${recurso}`], i);
        
        for (const [sensor, um] of sensores) {
          let valor: number;
          
          if (status === 0) {
            valor = um === "Bool" ? 0 : 0.0;
          } else {
            const [min, max] = getFaixa(sensor, um);
            if (um === "Bool") {
              valor = 1;
            } else {
              valor = Number((Math.random() * (max - min) + min).toFixed(2));
            }
          }

          dados.push({
            timestamp: format(timestamp, "yyyy-MM-dd HH:mm:ss"),
            index: sigla,
            NOME: nome,
            RECURSO: recurso,
            measurement_name: sensor,
            measurement_value: valor,
            UM: um,
            status: status
          });
        }
      }
    }
  }

  return dados;
} 