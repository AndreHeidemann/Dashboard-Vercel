"use client"

import { useState, useEffect, Suspense, lazy } from "react"
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
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTelemetry } from "@/hooks/useTelemetry"
import { useTheme } from "next-themes"
import { Area, Equipment, Measurement, TelemetryData } from "@/types/telemetry"

const TelemetryChart = lazy(() => import("@/components/TelemetryChart"))

const getStatusColor = (isActive: boolean) => {
  return isActive ? "text-green-500" : "text-gray-400"
}

const getPercentageColor = (active: number, total: number) => {
  const percentage = (active / total) * 100
  if (percentage >= 75) return "bg-green-500 hover:bg-green-600"
  if (percentage >= 50) return "bg-orange-500 hover:bg-orange-600"
  return "bg-destructive hover:bg-destructive/90"
}

const getStatusIcon = (isActive: boolean) => {
  return isActive ? CheckCircle : Power
}

const calculateActiveEquipment = (data: TelemetryData) => {
  let totalEquipment = 0
  let activeEquipment = 0

  Object.values(data).forEach((area: Area) => {
    Object.values(area.equipment).forEach((equip: Equipment) => {
      totalEquipment++
      activeEquipment++
    })
  })

  return { totalEquipment, activeEquipment }
}

function formatDateTime(date: Date) {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export default function TelemetryDashboard() {
  const [selectedIndex, setSelectedIndex] = useState<string>("")
  const [timeRange, setTimeRange] = useState<string>("12h")
  const [isChangingArea, setIsChangingArea] = useState(false)
  const { data, isLoading, error } = useTelemetry(timeRange)
  const { theme } = useTheme()

  useEffect(() => {
    if (data?.data && Object.keys(data.data).length > 0) {
      setSelectedIndex(Object.keys(data.data)[0])
    }
  }, [data])

  const handleAreaChange = (newIndex: string) => {
    setIsChangingArea(true)
    setSelectedIndex(newIndex)
    setTimeout(() => {
      setIsChangingArea(false)
    }, 500)
  }

  if (isLoading || isChangingArea) {
    return (
      <div className="flex h-screen opacity-50 items-center justify-center">
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

  const telemetryData = data.data
  const lastUpdate = data.lastUpdate
  const { totalEquipment, activeEquipment } = calculateActiveEquipment(telemetryData)

  const filteredData = telemetryData[selectedIndex] ? { [selectedIndex]: telemetryData[selectedIndex] } : {}

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
                {Object.entries(telemetryData).map(([key, area]) => (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton onClick={() => handleAreaChange(key)} isActive={selectedIndex === key}>
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
                <Badge variant="secondary" className={getPercentageColor(activeEquipment, totalEquipment)}>
                  {activeEquipment}/{totalEquipment} ({Math.round((activeEquipment/totalEquipment) * 100)}%)
                </Badge>
              </div>              
              <div className="flex items-center justify-between text-sm">
                <span>Last Update</span>
                <span className="text-muted-foreground">
                  {formatDateTime(new Date(lastUpdate))}
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
            <div 
              key={indexKey} 
              className={`space-y-4 transition-all duration-300 ease-in-out ${
                isChangingArea ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono">
                  {indexKey}
                </Badge>
                <h2 className="text-2xl font-bold">{indexData?.name || 'Sem nome'}</h2>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground">
                    {`${Object.keys(indexData?.equipment || {}).length} Equipment Units`}
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {Object.entries(indexData?.equipment || {}).map(([equipKey, equipment]) => (
                  <Card 
                    key={equipKey} 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isChangingArea ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}
                  >
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

                            <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded" />}>
                              <TelemetryChart
                                data={measurement.data}
                                measurementKey={measurementKey}
                                unit={measurement.unit}
                              />
                            </Suspense>
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
