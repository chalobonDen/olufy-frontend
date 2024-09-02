import { create } from 'zustand'

import { getTokens, removeTokens, setTokens } from './storage'
import type { IAuthActions, IAuthState } from './types'

export const useAuthStore = create<IAuthState & IAuthActions>((set, get) => ({
  accessToken: getTokens?.accessToken || null,
  refreshToken: getTokens?.refreshToken || null,
  isAuth: () => !!get()?.accessToken,
  login: (tokens: IAuthState) => {
    setTokens(tokens)
    set((state) => ({
      ...state,
      accessToken: tokens.accessToken,
      refreshToken: tokens.accessToken,
    }))
  },
  logout: () => {
    removeTokens()
    set((state) => ({
      ...state,
      accessToken: null,
      refreshToken: null,
    }))
  },
}))
