import type { StateCreator } from 'zustand'

import { DEFAULT_THEME } from '@/constants'

import type { IThemeSlice } from './types'
import { getSetting, updateSetting } from '../storage'

import { Theme } from '@/enums'

export const createThemeSlice: StateCreator<IThemeSlice> = (set) => ({
  theme: getSetting.theme ?? DEFAULT_THEME,
  toggleTheme: () => {
    set((state) => ({
      ...state,
      theme: state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    }))
    updateSetting()
  },
})
