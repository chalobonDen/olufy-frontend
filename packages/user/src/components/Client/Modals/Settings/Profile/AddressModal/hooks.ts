import { create } from 'zustand'

interface IState {
  visible: boolean
}

interface IActions {
  show: VoidFunction
  close: VoidFunction
}

export const useClientSettingProfileAddressModal = create<IState & IActions>((set) => ({
  visible: false,
  show: () => {
    set((state) => ({
      ...state,
      visible: true,
    }))
  },
  close: () => {
    set((state) => ({
      ...state,
      visible: false,
    }))
  },
}))
