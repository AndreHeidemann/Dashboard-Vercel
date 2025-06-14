"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Factory, Power, CheckCircle, Clock, Filter } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data structure
const mockData = {
  CEM: {
    name: "Coverage",
    equipment: {
      Reactor_1: {
        name: "Reactor 1",
        measurements: {
          temperature: { value: 85.2, unit: "°C", data: generateTimeSeriesData(85, 5) },
          pressure: { value: 2.4, unit: "Bar", data: generateTimeSeriesData(2.4, 0.3) },
          agitator_speed: { value: 120, unit: "RPM", data: generateTimeSeriesData(120, 10) },
          agitator_status: { value: true, unit: "boolean" },
          motor_current: { value: 15.8, unit: "A", data: generateTimeSeriesData(15.8, 2) },
        },
      },
      Mixer_1: {
        name: "Mixer 1",
        measurements: {
          temperature: { value: 65.5, unit: "°C", data: generateTimeSeriesData(65.5, 3) },
          motor_frequency: { value: 45, unit: "Hz", data: generateTimeSeriesData(45, 5) },
          power_consumption: { value: 12.3, unit: "kW", data: generateTimeSeriesData(12.3, 1.5) },
          mixer_status: { value: true, unit: "boolean" },
        },
      },
    },
  },
  PSV: {
    name: "Pastes & Masses",
    equipment: {
      Misturador_1: {
        name: "Misturador 1",
        measurements: {
          frequencia_bomba: { value: 35, unit: "Hz", data: generateTimeSeriesData(35, 3) },
          frequencia_misturador: { value: 28, unit: "Hz", data: generateTimeSeriesData(28, 2) },
          peso_misturador: { value: 450, unit: "Kg", data: generateTimeSeriesData(450, 25) },
          temperatura: { value: 72, unit: "°C", data: generateTimeSeriesData(72, 4) },
          setpoint_temperatura: { value: 75, unit: "°C", data: generateTimeSeriesData(75, 1) },
          status_agitador: { value: true, unit: "boolean" },
        },
      },
      Tank_Storage_1: {
        name: "Tank Storage 1",
        measurements: {
          level: { value: 78, unit: "%", data: generateTimeSeriesData(78, 8) },
          temperature: { value: 25, unit: "°C", data: generateTimeSeriesData(25, 2) },
          pump_status: { value: false, unit: "boolean" },
          flow_rate: { value: 125, unit: "L/min", data: generateTimeSeriesData(125, 15) },
        },
      },
    },
  },
  SPR: {
    name: "Spray",
    equipment: {
      Spray_Dryer_1: {
        name: "Spray Dryer 1",
        measurements: {
          inlet_temperature: { value: 180, unit: "°C", data: generateTimeSeriesData(180, 10) },
          outlet_temperature: { value: 85, unit: "°C", data: generateTimeSeriesData(85, 5) },
          atomizer_speed: { value: 15000, unit: "RPM", data: generateTimeSeriesData(15000, 500) },
          feed_rate: { value: 50, unit: "kg/h", data: generateTimeSeriesData(50, 5) },
          dryer_status: { value: true, unit: "boolean" },
        },
      },
    },
  },
  DET: {
    name: "Distillery",
    equipment: {
      Distillation_Column_1: {
        name: "Distillation Column 1",
        measurements: {
          top_temperature: { value: 78, unit: "°C", data: generateTimeSeriesData(78, 3) },
          bottom_temperature: { value: 95, unit: "°C", data: generateTimeSeriesData(95, 4) },
          reflux_ratio: { value: 3.2, unit: "ratio", data: generateTimeSeriesData(3.2, 0.2) },
          column_pressure: { value: 1.2, unit: "Bar", data: generateTimeSeriesData(1.2, 0.1) },
          reboiler_status: { value: true, unit: "boolean" },
        },
      },
    },
  },
}

function generateTimeSeriesData(baseValue: number, variance: number) {
  const data = []
  const now = new Date()

  for (let i = 287; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000)
    const value = baseValue + (Math.random() - 0.5) * variance * 2
    data.push({
      timestamp: timestamp.toISOString(),
      time: timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      value: Number(value.toFixed(2)),
    })
  }

  return data
}

const getStatusColor = (isActive: boolean) => {
  return isActive ? "text-green-500" : "text-gray-400"
}

const getStatusIcon = (isActive: boolean) => {
  return isActive ? CheckCircle : Power
}

const chartColors = {
  temperature: "#ef4444",
  pressure: "#3b82f6",
  speed: "#10b981",
  frequency: "#8b5cf6",
  power: "#f59e0b",
  level: "#06b6d4",
  flow: "#84cc16",
  weight: "#f97316",
}

function getChartColor(measurementKey: string) {
  if (measurementKey.includes("temperatura") || measurementKey.includes("temperature")) return chartColors.temperature
  if (measurementKey.includes("pressure") || measurementKey.includes("pressao")) return chartColors.pressure
  if (measurementKey.includes("speed") || measurementKey.includes("velocidade")) return chartColors.speed
  if (measurementKey.includes("frequencia") || measurementKey.includes("frequency")) return chartColors.frequency
  if (measurementKey.includes("power") || measurementKey.includes("potencia")) return chartColors.power
  if (measurementKey.includes("level") || measurementKey.includes("nivel")) return chartColors.level
  if (measurementKey.includes("flow") || measurementKey.includes("fluxo")) return chartColors.flow
  if (measurementKey.includes("peso") || measurementKey.includes("weight")) return chartColors.weight
  return "#6b7280"
}

export default function TelemetryDashboard() {
  const [selectedIndex, setSelectedIndex] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<string>("24h")

  const filteredData =
    selectedIndex === "all" ? mockData : { [selectedIndex]: mockData[selectedIndex as keyof typeof mockData] }

  return (
    <SidebarProvider>
      <Sidebar className="w-64">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Factory className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="font-semibold text-lg">Plant Monitor</h2>
                <p className="text-sm text-muted-foreground">Telemetry Dashboard</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Production Areas
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedIndex("all")} isActive={selectedIndex === "all"}>
                    All Areas
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {Object.entries(mockData).map(([key, area]) => (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton onClick={() => setSelectedIndex(key)} isActive={selectedIndex === key}>
                      <span className="font-mono text-xs bg-muted px-1 rounded">{key}</span>
                      {area.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>System Status</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-2 p-2">
              <div className="flex items-center justify-between text-sm">
                <span>Active Equipment</span>
                <Badge variant="secondary">12/15</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Alerts</span>
                <Badge variant="destructive">2</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Last Update</span>
                <span className="text-muted-foreground">2 min ago</span>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Live Data</span>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-6">
          {Object.entries(filteredData).map(([indexKey, indexData]) => (
            <div key={indexKey} className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono">
                  {indexKey}
                </Badge>
                <h2 className="text-2xl font-bold">{indexData.name}</h2>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground">
                    {Object.keys(indexData.equipment).length} Equipment Units
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {Object.entries(indexData.equipment).map(([equipKey, equipment]) => (
                  <Card key={equipKey} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{equipment.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {Object.entries(equipment.measurements)
                            .filter(([_, measurement]) => measurement.unit === "boolean")
                            .map(([key, measurement]) => {
                              const StatusIcon = getStatusIcon(measurement.value as boolean)
                              return (
                                <div key={key} className="flex items-center gap-1">
                                  <StatusIcon className={`h-4 w-4 ${getStatusColor(measurement.value as boolean)}`} />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {key.replace(/_/g, " ")}
                                  </span>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {Object.entries(equipment.measurements)
                        .filter(([_, measurement]) => measurement.unit !== "boolean")
                        .map(([measurementKey, measurement]) => (
                          <div key={measurementKey} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium capitalize">{measurementKey.replace(/_/g, " ")}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono">
                                  {measurement.value} {measurement.unit}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {measurement.unit}
                                </Badge>
                              </div>
                            </div>

                            <div className="h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={measurement.data}>
                                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                  <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                                  <YAxis tick={{ fontSize: 10 }} domain={["dataMin - 5", "dataMax + 5"]} />
                                  <Tooltip
                                    labelFormatter={(label) => `Time: ${label}`}
                                    formatter={(value: any) => [
                                      `${value} ${measurement.unit}`,
                                      measurementKey.replace(/_/g, " "),
                                    ]}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={getChartColor(measurementKey)}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
