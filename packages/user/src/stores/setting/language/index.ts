import type { StateCreator } from 'zustand'

import { DEFAULT_LANG } from '@/constants'

import type { ILanguageSlice } from './types'
import { getSetting, updateSetting } from '../storage'

import type { Language } from '@/enums'
import { extractLocale } from '@/i18n'

export const createLanguageSlice: StateCreator<ILanguageSlice> = (set) => ({
  lang: getSetting.lang ?? DEFAULT_LANG,
  isLangLoading: true,
  setLang: (lang: Language, reload = true) => {
    set((state) => ({
      ...state,
      lang,
    }))
    updateSetting()
    if (reload && typeof window !== 'undefined') {
      const { urlWithoutLocale } = extractLocale(window.location.pathname)
      window.location.href = `/${lang}${urlWithoutLocale}`
    }
  },
  setIsLangLoading: (val: boolean) => {
    set((state) => ({
      ...state,
      isLoading: val,
    }))
  },
})
