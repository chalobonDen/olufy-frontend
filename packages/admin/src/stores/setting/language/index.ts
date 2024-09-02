import type { StateCreator } from 'zustand'

import { DEFAULT_LANG } from '@/constants'

import type { ILanguageSlice } from './types'
import { getSetting, updateSetting } from '../storage'

import type { Language } from '@/enums'

export const createLanguageSlice: StateCreator<ILanguageSlice> = (set) => ({
  lang: getSetting.lang ?? DEFAULT_LANG,
  isLangLoading: true,
  setLang: (lang: Language) => {
    set((state) => ({
      ...state,
      lang,
    }))
    updateSetting()
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  },
  setIsLangLoading: (val: boolean) => {
    set((state) => ({
      ...state,
      isLoading: val,
    }))
  },
})
