import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { Period } from '@/enums'

export type IVpsNetworkType = 'shared' | 'dedicated'

export interface IVpsServer {
  id: number
  name: string
  diskType: string
  diskCapacity: {
    amount: number
    unit: string
  }
  cpu: number
  ram: {
    amount: number
    unit: string
  }
  networkType: IVpsNetworkType
  bandwidth: string
  taxWithheld: number
  status: boolean
  vmTemplate: { id: number; name: string }[]
  price: { type: Period; price: number }[]
}

export interface ISimpleVpsServer extends Omit<IVpsServer, 'price' | 'vmTemplate'> {
  price: number
}

export interface ICreateOrderVpsServer {
  addressId?: number
  period: Period
  orderItems: { packageId: number; config: { vmTemplateId: number; hostname: string; password: string } }[]
}

export interface IVpsServerQueryParams extends IPaginationQuery<ISimpleVpsServer> {
  search?: string
}

export interface IVpsServerPaginationResponse extends IPaginatedResponse<ISimpleVpsServer> {}

export interface IOrderVpsServer {
  createdAt: Date
  disk: string
  flag: 'active' | 'inactive'
  id: number
  ip: string
  name: string
  //
  endDate: Date
  startDate: Date
  hostname: string
  name: string
  nameserver1: string
  nameserver2: string
  nameserver3: string
  nameserver4: string
  firstPay: {
    period: Period
    price: number
  }
  nextPay: {
    period: Period
    price: number
  }
  server: {
    bandwidth: string
    bandwidthUse: string
    booted: string
    built: string
    cpu: number
    createdAt: Date
    disk: { amount: number; unit: string }
    domain: string
    ip: string[]
    memory: { amount: number; unit: string }
    password: string
    recoveryMode: string
    template: string
    updatedAt: Date
  }
}

export interface ISimpleOrderVpsServer
  extends Pick<IOrderVpsServer, 'id' | 'ip' | 'name' | 'flag' | 'disk' | 'createdAt'> {}

export interface IOrderVpsServerQueryParams extends IPaginationQuery<ISimpleOrderVpsServer> {
  search?: string
}

export interface IOrderVpsServerPaginationResponse extends IPaginatedResponse<ISimpleOrderVpsServer> {}

export interface IOrderLogsVpsServer {
  action: string
  date: Date
  status: string
}

export interface IOrderLogsVpsServerQueryParams extends IPaginationQuery {
  search?: string
}

export interface IOrderLogsVpsServerPaginationResponse extends IPaginatedResponse<IOrderLogsVpsServer> {}
