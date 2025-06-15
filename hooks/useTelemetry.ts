import { useQuery } from '@tanstack/react-query';

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

type TelemetryResponse = {
  data: TelemetryData;
  lastUpdate: string;
};

const fetchTelemetryData = async (timeRange: string): Promise<TelemetryResponse> => {
  const response = await fetch(`/api/telemetria?timeRange=${timeRange}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados de telemetria');
  }
  const data = await response.json();
  return {
    data,
    lastUpdate: new Date().toISOString()
  };
};

export function useTelemetry(timeRange: string = '24h') {
  return useQuery<TelemetryResponse>({
    queryKey: ['telemetry', timeRange],
    queryFn: () => fetchTelemetryData(timeRange),
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });
} 