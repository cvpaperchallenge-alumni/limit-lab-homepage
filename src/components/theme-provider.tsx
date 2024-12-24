// components/theme-provider.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function MyThemeProvider({ children, ...props}: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>{children}</ThemeProvider>
  )
}
