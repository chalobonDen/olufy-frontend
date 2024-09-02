import type { IBaseOptionItem } from '../base'
import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

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
}

export interface ISimpleTicket extends Pick<ITicket, 'id' | 'status' | 'title'> {
  createdAt: Date | number | string
  nameEn: string
  nameTh: string
  permission: string
}

export interface IManageTicket {
  title: string
  permissionId: number
  productId: number
  message: string
  files: string[]
}

export interface ITicketInformation {
  product: IBaseOptionItem[]
  permission: IBaseOptionItem[]
}

export interface ITicketQueryParams extends IPaginationQuery {
  search?: string
}

export interface ITicketPaginationResponse extends IPaginatedResponse<ISimpleTicket> {}

export interface ITicketReplyMessage {
  ticketId: number
  message: string
  files: File[]
}
