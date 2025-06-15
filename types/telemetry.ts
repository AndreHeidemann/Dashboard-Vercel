export type TimeSeriesData = {
  timestamp: string
  value: number
}

export type Measurement = {
  value: number
  unit: string
  data: TimeSeriesData[]
}

export type Equipment = {
  name: string
  measurement: {
    [measurementName: string]: Measurement
  }
}

export type Area = {
  name: string
  equipment: {
    [resource: string]: Equipment
  }
}

export type TelemetryData = {
  [index: string]: Area
}

export type TelemetryResponse = {
  data: TelemetryData
  lastUpdate: string
} 