import type React from 'react'

import { ActiveSectionProvider } from './ActiveSection'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <ActiveSectionProvider>{children}</ActiveSectionProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
