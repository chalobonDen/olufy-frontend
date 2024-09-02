import { omit } from 'lodash-es'

import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { Language } from '@/enums'

interface ICoLocation {
  id?: number
  name: string
  sizeRack: number | string
  dataCenter: string
  os: string
  networkShare: number | string
  price: number | string
  bandwidth: string
  status: boolean
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface ICoLocationForm extends Omit<ICoLocation, 'status'> {}

export interface ISimpleCoLocation extends Omit<ICoLocation, 'bandwidth' | 'taxWithheld'> {}

export interface ICoLocationQueryParams extends IPaginationQuery {
  search?: string
}

export interface ICoLocationPaginationResponse extends IPaginatedResponse<ISimpleCoLocation> {}
