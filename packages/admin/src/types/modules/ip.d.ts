import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

import type { StatusIp } from '@/enums/ip-status'
import type { MemberLevel } from '@/enums'

export interface IInternetProtocol {
  id?: number
  ipv4: string
  subnet: string
  subnetMask: string
  gateway: string
  dns1: string
  dns2: string
  rankId?: number | string
  membership?: {
    id: number | string
    name: string
  }
  dataCenterId?: number | string
  dataCenter?: {
    id: number | string
    name: string
  }
  rackId: number | string
  rack?: {
    id: number | string
    name: string
  }
  flag?: StatusIp
}

export interface IInternetProtocolMultipleForm extends IInternetProtocol {
  ipStart?: number
  ipEnd?: number
}

export interface IInternetProtocolMultiple {
  ipAddress: IInternetProtocol[]
}

export interface IInternetProtocolForm extends IInternetProtocol {
  rackId?: number | string
}

export interface ISimpleInternetProtocol
  extends Pick<
    IInternetProtocol,
    | 'id'
    | 'ipv4'
    | 'subnet'
    | 'subnetMask'
    | 'gateway'
    | 'dns1'
    | 'dns2'
    | 'rack'
    | 'membership'
    | 'dataCenter'
    | 'flag'
  > {
  flag?: number | string
  dataCenterId?: number | string
  rackId?: number | string
  rankId?: number | string
}

export interface IInternetProtocolQueryParams extends IPaginationQuery<ISimpleInternetProtocol> {
  search?: string
  flag?: number | string
  dataCenterId?: number | string
  rackId?: number | string
  rankId?: number | string
}

export interface IInternetProtocolPaginationResponse extends IPaginatedResponse<ISimpleInternetProtocol> {}
