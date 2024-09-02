import Cookies from 'js-cookie'
import { createCookieStorage } from '@olufy-frontend/shared/utils'

import { DEFAULT_THEME, STORE_KEY } from '@/constants'

import { useSettingStore } from '.'
import type { Theme } from '@/enums'

interface ISettingStorage {
  theme: Theme
}

const KEY = STORE_KEY.setting.key

export const storage = createCookieStorage({
  storage: Cookies,
})

export const getSetting = storage.get<ISettingStorage>(KEY, {
  theme: DEFAULT_THEME,
})

export const updateSetting = () => {
  storage.set<ISettingStorage>(KEY, {
    theme: useSettingStore.getState().theme,
  })
}
