import { create } from 'zustand'

import type { ILanguageSlice } from './language/types'
import type { IThemeSlice } from './theme/types'
import { createLanguageSlice } from './language'
import { createThemeSlice } from './theme'

export const useSettingStore = create<ILanguageSlice & IThemeSlice>()((...a) => ({
  ...createLanguageSlice(...a),
  ...createThemeSlice(...a),
}))
