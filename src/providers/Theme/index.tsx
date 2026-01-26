'use client'

import type React from 'react'
import { createContext, use, useCallback, useEffect, useState } from 'react'
import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import type { Theme, ThemeContextType } from './types'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDOM
      ? document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light'
      : undefined,
  )
  const [autoMode, setAutoMode] = useState<boolean>(false)

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey)
      const implicitPreference = getImplicitPreference()
      document.documentElement.classList.toggle('dark', implicitPreference === 'dark')
      if (implicitPreference) setThemeState(implicitPreference)
      setAutoMode(true)
    } else {
      setThemeState(themeToSet)
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
      document.documentElement.classList.toggle('dark', themeToSet === 'dark')
      setAutoMode(false)
    }
  }, [])

  useEffect(() => {
    let themeToSet: Theme = defaultTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)

    if (themeIsValid(preference)) {
      themeToSet = preference
      setAutoMode(false)
    } else {
      const implicitPreference = getImplicitPreference()
      if (implicitPreference) {
        themeToSet = implicitPreference
      }
      setAutoMode(true)
    }

    document.documentElement.classList.toggle('dark', themeToSet === 'dark')
    setThemeState(themeToSet)
  }, [])

  // Listen for system preference changes when in auto mode
  useEffect(() => {
    if (!autoMode) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      setThemeState(newTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [autoMode])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
