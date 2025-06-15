import useSWR from 'swr'
import { TelemetryResponse } from '@/types/telemetry'

const fetcher = async (url: string): Promise<TelemetryResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Erro ao buscar dados')
  }
  const data = await response.json()
  return {
    data,
    lastUpdate: new Date().toISOString()
  }
}

export function useTelemetry(timeRange: string) {
  const { data, error, isLoading } = useSWR<TelemetryResponse>(
    `/api/telemetria?timeRange=${timeRange}`,
    fetcher,
    {
      refreshInterval: 300000, // 5 minutos
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  )

  return {
    data,
    isLoading,
    error,
  }
} 