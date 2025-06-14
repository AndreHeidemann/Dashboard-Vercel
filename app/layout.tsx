import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: 'Dashboard Plant Monitor',
  description: 'Dashboard Plant Monitor',
  generator: 'Plant Monitor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
