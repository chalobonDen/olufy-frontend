import { create } from 'zustand'

import type { IUserActions, IUserState } from './types'

export const useUserStore = create<IUserState & IUserActions>((set) => ({
  profile: null,
  firebase: {
    providerData: null,
  },
  setSetupNewUser: (payload) => {
    set((state) => ({
      ...state,
      profile: {
        ...state.profile,
        ...payload,
      },
    }))
  },
  setProfile: (profile) => {
    set((state) => ({
      ...state,
      profile: {
        ...state.profile,
        ...profile,
      },
    }))
  },
  clear: () => {
    set((state) => ({
      ...state,
      profile: null,
      firebase: {
        providerData: null,
      },
    }))
  },
  setFirebaseProviderData: (payload) => {
    set((state) => ({
      ...state,
      firebase: {
        providerData: payload,
      },
    }))
  },
}))
