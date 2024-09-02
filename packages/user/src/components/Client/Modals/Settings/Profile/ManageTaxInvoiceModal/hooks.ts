import { create } from 'zustand'

import type { IUserTaxInvoice } from '@/types/modules/user'

interface IState {
  visible: boolean
  data: IUserTaxInvoice | null
}

interface IActions {
  show: (payload?: IUserTaxInvoice) => void
  close: VoidFunction
}

export const useClientSettingProfileTaxInvoiceModal = create<IState & IActions>((set) => ({
  visible: false,
  data: null,
  show: (data?: IUserTaxInvoice) => {
    set((state) => ({
      ...state,
      visible: true,
      data,
    }))
  },
  close: () => {
    set((state) => ({
      ...state,
      visible: false,
      data: null,
    }))
  },
}))
