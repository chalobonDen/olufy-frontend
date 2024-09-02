import type { Theme } from '@/enums'

export interface IThemeState {
  theme: Theme
}

export interface IThemeActions {
  toggleTheme: () => void
}

export interface IThemeSlice extends IThemeState, IThemeActions {}
