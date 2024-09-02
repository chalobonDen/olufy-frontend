import { create } from 'zustand'

import type { IThemeSlice } from './theme/types'
import { createThemeSlice } from './theme'

export const useSettingStore = create<IThemeSlice>()((...a) => ({
  ...createThemeSlice(...a),
}))
