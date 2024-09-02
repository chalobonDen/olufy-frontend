import Cookies from 'js-cookie'
import { createCookieStorage } from '@olufy-frontend/shared/utils'

import { DEFAULT_LANG, DEFAULT_THEME, STORE_KEY } from '@/constants'

import type { Language, Theme } from '@/enums'
import { useSettingStore } from '.'

interface ISettingStorage {
  lang: Language
  theme: Theme
}

const KEY = STORE_KEY.setting.key

export const storage = createCookieStorage({
  storage: Cookies,
})

export const getSetting = storage.get<ISettingStorage>(KEY, {
  lang: DEFAULT_LANG,
  theme: DEFAULT_THEME,
})

export const updateSetting = () => {
  storage.set<ISettingStorage>(KEY, {
    lang: useSettingStore.getState().lang,
    theme: useSettingStore.getState().theme,
  })
}
