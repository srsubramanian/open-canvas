import '@fontsource/inter'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

export const metadata = {
  title: 'ChatGPT Canvas',
  description: 'A ChatGPT Canvas-like interface',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-inter">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}