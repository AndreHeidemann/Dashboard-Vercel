import { addDays, subDays, format, addMinutes } from 'date-fns';

// Estrutura de dados
const estrutura = {
  "SEC-01": {
    "NOME": "Section Alpha",
    "Asset-017": [
      ["Status Flag 02", "Bool"],
      ["Speed Metric 05", "RPM"],
      ["Status Flag 01", "Bool"],
      ["Speed Metric 04", "RPM"],
      ["Load Metric Bulk", "Kg"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-018": [
      ["Status Flag 02", "Bool"],
      ["Speed Metric 05", "RPM"],
      ["Status Flag 01", "Bool"],
      ["Speed Metric 04", "RPM"],
      ["Load Metric Bulk", "Kg"],
      ["Thermal Metric 01", "ºC"]
    ]
  },
  "SEC-02": {
    "NOME": "Section Beta",
    "Asset-001": [
      ["Frequency Metric 04", "Hz"],
      ["Frequency Metric 08", "Hz"],
      ["Frequency Metric 09", "Hz"],
      ["Load Metric Blend", "Kg"],
      ["Thermal Metric 01", "ºC"],
      ["Setpoint Metric 01", "ºC"]
    ],
    "Asset-002": [
      ["Frequency Metric 04", "Hz"],
      ["Frequency Metric 08", "Hz"],
      ["Frequency Metric 09", "Hz"],
      ["Load Metric Blend", "Kg"],
      ["Thermal Metric 01", "ºC"],
      ["Setpoint Metric 01", "ºC"]
    ],
    "Asset-003": [
      ["Frequency Metric 04", "Hz"],
      ["Frequency Metric 08", "Hz"],
      ["Frequency Metric 09", "Hz"],
      ["Load Metric Blend", "Kg"],
      ["Thermal Metric 01", "ºC"],
      ["Setpoint Metric 01", "ºC"]
    ],
    "Asset-004": [
      ["Frequency Metric 04", "Hz"],
      ["Frequency Metric 08", "Hz"],
      ["Frequency Metric 09", "Hz"],
      ["Load Metric Blend", "Kg"],
      ["Thermal Metric 01", "ºC"],
      ["Setpoint Metric 01", "ºC"]
    ],
    "Asset-005": [
      ["Current Metric 04", "A"],
      ["Power Metric 01", "kW"],
      ["Pressure Metric 02", "Bar"],
      ["Rotation Metric 01", "RPM"],
      ["Thermal Metric Mixer Inlet", "ºC"],
      ["Thermal Metric Mixer Outlet", "ºC"],
      ["Thermal Metric Transfer Outlet", "ºC"],
      ["Frequency Metric 05", "Hz"],
      ["Frequency Metric 06", "Hz"]
    ],
    "Asset-006": [
      ["Current Metric 04", "A"],
      ["Power Metric 01", "kW"],
      ["Pressure Metric 02", "Bar"],
      ["Rotation Metric 01", "RPM"],
      ["Thermal Metric Mixer Inlet", "ºC"],
      ["Thermal Metric Mixer Outlet", "ºC"],
      ["Thermal Metric Transfer Outlet", "ºC"],
      ["Frequency Metric 05", "Hz"],
      ["Frequency Metric 06", "Hz"]
    ],
    "Asset-007": [
      ["Current Metric 04", "A"],
      ["Power Metric 01", "kW"],
      ["Pressure Metric 02", "Bar"],
      ["Rotation Metric 01", "RPM"],
      ["Thermal Metric Mixer Inlet", "ºC"],
      ["Thermal Metric Mixer Outlet", "ºC"],
      ["Thermal Metric Transfer Outlet", "ºC"],
      ["Frequency Metric 05", "Hz"],
      ["Frequency Metric 06", "Hz"]
    ],
    "Asset-008": [
      ["Current Metric 04", "A"],
      ["Power Metric 01", "kW"],
      ["Pressure Metric 02", "Bar"],
      ["Rotation Metric 01", "RPM"],
      ["Thermal Metric Mixer Inlet", "ºC"],
      ["Thermal Metric Mixer Outlet", "ºC"],
      ["Thermal Metric Transfer Outlet", "ºC"],
      ["Frequency Metric 05", "Hz"],
      ["Frequency Metric 06", "Hz"]
    ],
    "Asset-009": [
      ["Current Metric 04", "A"],
      ["Power Metric 01", "kW"],
      ["Pressure Metric 02", "Bar"],
      ["Rotation Metric 01", "RPM"],
      ["Thermal Metric Mixer Inlet", "ºC"],
      ["Thermal Metric Mixer Outlet", "ºC"],
      ["Thermal Metric Transfer Outlet", "ºC"],
      ["Frequency Metric 05", "Hz"],
      ["Frequency Metric 06", "Hz"]
    ],
    "Asset-010": [
      ["Current Metric 04", "A"],
      ["Power Metric 01", "kW"],
      ["Pressure Metric 02", "Bar"],
      ["Rotation Metric 01", "RPM"],
      ["Thermal Metric Mixer Inlet", "ºC"],
      ["Thermal Metric Mixer Outlet", "ºC"],
      ["Thermal Metric Transfer Outlet", "ºC"],
      ["Frequency Metric 05", "Hz"],
      ["Frequency Metric 06", "Hz"]
    ],
    "Asset-014": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 02", "A"],
      ["Current Metric 03", "A"],
      ["Frequency Metric 02", "Hz"],
      ["Frequency Metric 03", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-015": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 02", "A"],
      ["Current Metric 03", "A"],
      ["Frequency Metric 02", "Hz"],
      ["Frequency Metric 03", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-016": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 02", "A"],
      ["Current Metric 03", "A"],
      ["Frequency Metric 02", "Hz"],
      ["Frequency Metric 03", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-017": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 02", "A"],
      ["Current Metric 03", "A"],
      ["Frequency Metric 02", "Hz"],
      ["Frequency Metric 03", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-018": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 02", "A"],
      ["Current Metric 03", "A"],
      ["Frequency Metric 02", "Hz"],
      ["Frequency Metric 03", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-019": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 02", "A"],
      ["Current Metric 03", "A"],
      ["Frequency Metric 02", "Hz"],
      ["Frequency Metric 03", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-034": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 01", "A"],
      ["Frequency Metric 01", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-035": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 01", "A"],
      ["Frequency Metric 01", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-036": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 01", "A"],
      ["Frequency Metric 01", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-032": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 01", "A"],
      ["Frequency Metric 01", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-033": [
      ["Setpoint Metric 01", "ºC"],
      ["Current Metric 01", "A"],
      ["Frequency Metric 01", "Hz"],
      ["Thermal Metric 01", "ºC"]
    ]
  },
  "SEC-03": {
    "NOME": "Section Gamma",
    "Asset-020": [
      ["Speed Metric 01", "RPM"],
      ["Pressure Metric 01", "Bar"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-021": [
      ["Speed Metric 01", "RPM"],
      ["Pressure Metric 01", "Bar"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-022": [
      ["Speed Metric 01", "RPM"],
      ["Pressure Metric 01", "Bar"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-023": [
      ["Speed Metric 01", "RPM"],
      ["Pressure Metric 01", "Bar"],
      ["Thermal Metric 01", "ºC"]
    ],
    "Asset-024": [
      ["Speed Metric 01", "RPM"],
      ["Pressure Metric 01", "Bar"],
      ["Thermal Metric 01", "ºC"]
    ]
  },
  "SEC-04": {
    "NOME": "Section Delta",
    "Asset-025": [
      ["Thermal Metric Inlet", "ºC"],
      ["Thermal Metric Outlet", "ºC"],
      ["Flow Metric 01", "RPM"],
      ["Speed Metric 02", "RPM"],
      ["Speed Metric 03", "RPM"]
    ],
    "Asset-026": [
      ["Thermal Metric Inlet", "ºC"],
      ["Thermal Metric Outlet", "ºC"],
      ["Flow Metric 01", "RPM"],
      ["Speed Metric 02", "RPM"],
      ["Speed Metric 03", "RPM"]
    ],
    "Asset-027": [
      ["Thermal Metric Inlet", "ºC"],
      ["Thermal Metric Outlet", "ºC"],
      ["Flow Metric 01", "RPM"],
      ["Speed Metric 02", "RPM"],
      ["Speed Metric 03", "RPM"]
    ],
    "Asset-028": [
      ["Thermal Metric Inlet", "ºC"],
      ["Thermal Metric Outlet", "ºC"],
      ["Flow Metric 01", "RPM"],
      ["Speed Metric 02", "RPM"],
      ["Speed Metric 03", "RPM"]
    ],
    "Asset-029": [
      ["Thermal Metric Inlet", "ºC"],
      ["Thermal Metric Outlet", "ºC"],
      ["Flow Metric 01", "RPM"],
      ["Speed Metric 02", "RPM"],
      ["Speed Metric 03", "RPM"]
    ],
    "Asset-030": [
      ["Thermal Metric Inlet", "ºC"],
      ["Thermal Metric Outlet", "ºC"],
      ["Flow Metric 01", "RPM"],
      ["Speed Metric 02", "RPM"],
      ["Speed Metric 03", "RPM"]
    ],
    "Asset-031": [
      ["Thermal Metric Inlet", "ºC"],
      ["Thermal Metric Outlet", "ºC"],
      ["Flow Metric 01", "RPM"],
      ["Speed Metric 02", "RPM"],
      ["Speed Metric 03", "RPM"]
    ]
  },
  "SEC-05": {
    "NOME": "Section Epsilon",
    "Asset-011": [
      ["Frequency Metric 07", "Hz"],
      ["Thermal Metric High", "ºC"]
    ],
    "Asset-012": [
      ["Frequency Metric 07", "Hz"],
      ["Thermal Metric High", "ºC"]
    ],
    "Asset-013": [
      ["Frequency Metric 07", "Hz"],
      ["Thermal Metric High", "ºC"]
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
  "Thermal Metric High": [400, 900],
  "Thermal Metric Inlet": [60, 90],
  "Thermal Metric Outlet": [70, 120],
  "Thermal Metric Mixer Inlet": [60, 90],
  "Thermal Metric Mixer Outlet": [70, 120],
  "Thermal Metric Transfer Outlet": [60, 100],
  "Load Metric Bulk": [100, 1000],
  "Load Metric Blend": [100, 1000],
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