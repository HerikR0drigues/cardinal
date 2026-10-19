import { useEffect } from 'react'
import { isThemePreference } from '@/lib/validators'
import type { Theme } from '@/types'
import { useLocalStorage } from './useLocalStorage'
import { useMediaQuery } from './useMediaQuery'

export function useTheme() {
  const [preference, setPreference] = useLocalStorage<Theme | null>(
    'cardinal.theme',
    null,
    isThemePreference,
  )
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const theme: Theme = preference ?? (systemPrefersDark ? 'dark' : 'light')

  useEffect(() => {
    if (preference === null) {
      delete document.documentElement.dataset.theme
      return
    }
    document.documentElement.dataset.theme = preference
  }, [preference])

  const toggleTheme = () => setPreference(theme === 'dark' ? 'light' : 'dark')

  return { theme, toggleTheme }
}
