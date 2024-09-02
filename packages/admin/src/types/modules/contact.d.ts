import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { UserContactStatus } from '@/enums'

export interface IContact {
  id?: number
  name?: string
  tel: string
  email: string
  title: string
  message: string
  createdAt?: Date
  status: UserContactStatus
}

export interface IContacts {
  contacts: IContact[]
}

export interface ISimpleContact
  extends Pick<IContact, 'id' | 'name' | 'email' | 'tel' | 'title' | 'status' | 'createdAt'> {}

export interface IContactQueryParams extends IPaginationQuery<ISimpleContact> {
  search?: string
  status?: UserContactStatus
}

export interface IContactPaginationResponse extends IPaginatedResponse<ISimpleContact> {}
