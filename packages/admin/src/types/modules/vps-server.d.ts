import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

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
  price: number
  taxWithheld: number
  status?: boolean
  serverId?: number
  planId?: number
}

export interface IIVpsServers {
  domains: IVpsServer[]
}

export interface ISimpleVpsServer extends Omit<IVpsServer, 'taxWithheld'> {}

export interface IManageVpsServer extends Omit<IVpsServer, 'id' | 'diskCapacity' | 'ram'> {
  id?: number
  diskCapacity: number
  ram: number
  serverId?: number
  planId?: number
}

export interface IVpsServerQueryParams extends IPaginationQuery<ISimpleVpsServer> {
  search?: string
}

export interface IVpsServerPaginationResponse extends IPaginatedResponse<ISimpleVpsServer> {}
