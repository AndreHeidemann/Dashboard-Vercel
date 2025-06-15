"use client"

import { useState, useMemo } from "react"
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
import { Factory, Power, CheckCircle, Clock, Filter, Loader2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTelemetry } from "@/hooks/useTelemetry"
import { useTheme } from "next-themes"

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

function formatDateTime(timestamp: string): string {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default function TelemetryDashboard() {
  const [selectedIndex, setSelectedIndex] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<string>("24h")
  const { data, isLoading, error } = useTelemetry(timeRange)
  const { theme } = useTheme()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-600">Erro ao carregar dados de telemetria</div>
      </div>
    )
  }

  const telemetryData = data.data;
  const lastUpdate = data.lastUpdate;

  const filteredData =
    selectedIndex === "all" ? telemetryData : { [selectedIndex]: telemetryData[selectedIndex] }

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
                {Object.entries(telemetryData).map(([key, area]) => (
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
                <span className="text-muted-foreground">
                  {formatDateTime(lastUpdate)}
                </span>
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
                  <SelectItem value="30m">Last 30 Minutes</SelectItem>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="12h">Last 12 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="2d">Last 2 Days</SelectItem>
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
                          {Object.entries(equipment.measurement)
                            .filter(([_, measurement]) => measurement.unit === "boolean")
                            .map(([key, measurement]) => {
                              const StatusIcon = getStatusIcon(Boolean(measurement.value))
                              return (
                                <div key={key} className="flex items-center gap-1">
                                  <StatusIcon className={`h-4 w-4 ${getStatusColor(Boolean(measurement.value))}`} />
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
                      {Object.entries(equipment.measurement)
                        .filter(([_, measurement]) => measurement.unit !== "boolean")
                        .map(([measurementKey, measurement]) => (
                          <div key={measurementKey} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium capitalize">{measurementKey.replace(/_/g, " ")}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono">
                                  {measurement.value}
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
                                  <XAxis 
                                    dataKey="time" 
                                    tick={{ 
                                      fontSize: 10,
                                      fill: theme === 'dark' ? '#fff' : '#000'
                                    }} 
                                    interval="preserveStartEnd" 
                                  />
                                  <YAxis 
                                    tick={{ 
                                      fontSize: 10,
                                      fill: theme === 'dark' ? '#fff' : '#000'
                                    }} 
                                    domain={measurement.unit === "bool" ? [0, 1] : ["dataMin - 5", "dataMax + 5"]}
                                    tickFormatter={measurement.unit === "bool" ? (value) => value === 1 ? "ON" : "OFF" : undefined}
                                  />
                                  <Tooltip
                                    labelFormatter={(label) => (
                                      <span style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                                        Time: {label}
                                      </span>
                                    )}
                                    formatter={(value: any) => [
                                      measurement.unit === "bool" 
                                        ? (value === 1 ? "ON" : "OFF")
                                        : `${value} ${measurement.unit}`,
                                      measurementKey.replace(/_/g, " "),
                                    ]}
                                    contentStyle={{
                                      backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                                      border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
                                    }}
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
