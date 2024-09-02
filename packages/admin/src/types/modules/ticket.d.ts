import type { IPaginatedResponse, IPaginationQuery } from '../pagination'
import type { IUser } from './user'

import type { TicketStatus } from '@/enums/ticket'

export interface ITicketMessage {
  user: {
    nameEn: string
    nameTh: string
    permission: 'USER' | 'ADMIN'
    createdAt: Date | number | string
  }
  message: string
  messageUrl: string[]
}

export interface ITicket {
  id: number
  title: string
  ticketMessage: ITicketMessage[]
  status: TicketStatus
  product: string
  permission: string
  user: Pick<IUser, 'nameEn' | 'nameTh' | 'email'>
}

export interface ISimpleTicket extends Pick<ITicket, 'id' | 'status' | 'title'> {
  createdAt: Date | number | string
  nameEn: string
  nameTh: string
  permission: string
}

export interface ITicketQueryParams extends IPaginationQuery<ISimpleTicket> {
  search?: string
  status?: TicketStatus
}

export interface ITicketPaginationResponse extends IPaginatedResponse<ISimpleTicket> {}

export interface ITicketReplyMessage {
  ticketId: number
  message: string
  files: File[]
}
