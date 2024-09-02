import type { Language } from '@/enums'

export interface ILanguageState {
  lang: Language
  isLangLoading: boolean
}

export interface ILanguageActions {
  setLang: (lang: Language) => void
  setIsLangLoading: (val: boolean) => void
}

export interface ILanguageSlice extends ILanguageState, ILanguageActions {}
