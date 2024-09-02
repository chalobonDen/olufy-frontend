import { parse } from 'cookie'
import { decryptAESDeserialize } from '@olufy-frontend/shared/utils'

import { DEFAULT_LANG, DEFAULT_STORAGE_PREFIX, DEFAULT_THEME, STORE_KEY } from '@/constants'
import type { IThemeState } from '@/stores/setting/theme/types'
import type { ILanguageState } from '@/stores/setting/language/types'

import type { Language } from '@/enums'
import { LanguageFull } from '@/enums'

type ReturnSettingData = Omit<IThemeState & ILanguageState, 'isLangLoading'>

const DEFAULT_SETTING = {
  lang: DEFAULT_LANG,
  theme: DEFAULT_THEME,
}

export const deserializeSettingSsr = (cookie: string): ReturnSettingData => {
  const value = parse(cookie)[`${DEFAULT_STORAGE_PREFIX}.${STORE_KEY.setting.key}`]
  const data = decryptAESDeserialize({
    value,
  })
  return data
}

export const getSettingSsr = (cookie: string) => {
  if (!cookie) return DEFAULT_SETTING
  const data = deserializeSettingSsr(cookie)
  return {
    theme: data?.theme ?? DEFAULT_SETTING.theme,
    lang: data?.lang ?? DEFAULT_SETTING.lang,
  }
}

export const getLanguageFull = (locale: Language) => {
  const fullLocale = Object.values(LanguageFull).find((e) => e.includes(locale))
  return fullLocale
}
