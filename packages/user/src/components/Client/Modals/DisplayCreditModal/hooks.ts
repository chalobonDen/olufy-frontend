import { create } from 'zustand'

interface IState {
  visible: boolean
  amount: number
  baseUrl: string | null
}

interface IActions {
  show: (amount: number, baseUrl: string) => void
  close: VoidFunction
}

export const useClientDisplayCreditModal = create<IState & IActions>((set) => ({
  visible: false,
  amount: 0,
  baseUrl: null,
  show: (amount: number, baseUrl: string) => {
    set((state) => ({
      ...state,
      visible: true,
      amount,
      baseUrl,
    }))
  },
  close: () => {
    set((state) => ({
      ...state,
      visible: false,
      amount: 0,
      baseUrl: null,
    }))
  },
}))
