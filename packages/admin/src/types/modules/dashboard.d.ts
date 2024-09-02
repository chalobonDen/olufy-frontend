import type { IContact } from './contact'
import type { ITicket } from './ticket'

import type { UserContactStatus, UserTicketStatus } from '@/enums'

export interface ICountProductOrder {
  name: string
  countOrder: number
}

export interface IProduct {
  name: string
  countAll: number
  countActive: number
  countSuspend: number
}

export interface IDashboard {
  countNewOrder: number
  countProductOrder: ICountProductOrder[]
  countUser: {
    countAllUser: number
    countOrganizationUser: number
    countNormalUser: number
  }
  totalSales: number
  countOrder: number
  totalSalesYear: {
    year: number
    month: {
      [key: number]: number
    }
  }
  countContact: number
  countTicket: number
  contacts: Pick<IContact, 'id' | 'title' | 'name' | 'status'>[]
  tickets: Pick<ITicket, 'id' | 'title' | 'name' | 'status'>[]
  products: IProduct[]
}

export interface IDashboardQueryParams {
  year?: number | string
}
