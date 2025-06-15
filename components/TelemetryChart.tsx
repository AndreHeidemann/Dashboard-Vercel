import { memo, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from 'next-themes'
import { useInView } from 'react-intersection-observer'

interface TelemetryChartProps {
  data: any[]
  measurementKey: string
  unit: string
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
  current: "#ec4899",
  setpoint: "#6366f1"
}

function getChartColor(measurementKey: string) {
  const key = measurementKey.toLowerCase();

  if (key.includes("temperatura") || key.includes("temp")) return chartColors.temperature;
  if (key.includes("pressao") || key.includes("pressao interna") || key.includes("pressure")) return chartColors.pressure;
  if (key.includes("velocidade") || key.includes("speed") || key.includes("rotacao")) return chartColors.speed;
  if (key.includes("frequencia") || key.includes("frequency")) return chartColors.frequency;
  if (key.includes("potencia") || key.includes("power")) return chartColors.power;
  if (key.includes("peso") || key.includes("weight")) return chartColors.weight;
  if (key.includes("nivel") || key.includes("level")) return chartColors.level;
  if (key.includes("vazao") || key.includes("flow")) return chartColors.flow;
  if (key.includes("corrente") || key.includes("current")) return chartColors.current;
  if (key.includes("setpoint")) return chartColors.setpoint;

  return "#6b7280"; // fallback gray
}

const TelemetryChart = memo(({ data, measurementKey, unit }: TelemetryChartProps) => {
  const { theme } = useTheme()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const chartColor = useMemo(() => getChartColor(measurementKey), [measurementKey])

  if (!inView) {
    return <div ref={ref} className="h-32" />
  }

  return (
    <div ref={ref} className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="timestamp" 
            tick={{ 
              fontSize: 10,
              fill: theme === 'dark' ? '#fff' : '#000'
            }} 
            interval="preserveStartEnd"
            tickFormatter={(value) => {
              const date = new Date(value)
              const today = new Date()
              const isToday = date.toDateString() === today.toDateString()
              
              if (isToday) {
                return date.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })
              }
              
              return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })
            }}
          />
          <YAxis 
            tick={{ 
              fontSize: 10,
              fill: theme === 'dark' ? '#fff' : '#000'
            }} 
            domain={unit === "bool" ? [0, 1] : ["dataMin - 5", "dataMax + 5"]}
            tickFormatter={(value) => {
              return unit === "bool" 
                ? (value === 1 ? "ON" : "OFF")
                : value.toFixed(2)
            }}
          />
          <Tooltip
            labelFormatter={(label) => {
              const date = new Date(label)
              return (
                <span style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })} {date.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                  })}
                </span>
              )
            }}
            formatter={(value: any) => [
              unit === "bool" 
                ? (value === 1 ? "ON" : "OFF")
                : `${value.toFixed(2)} ${unit}`,
              measurementKey.replace(/_/g, " "),
            ]}
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              padding: '4px 8px',
              fontSize: '12px',
              borderRadius: '4px'
            }}
            wrapperStyle={{
              outline: 'none'
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
})

TelemetryChart.displayName = 'TelemetryChart'

export default TelemetryChart 