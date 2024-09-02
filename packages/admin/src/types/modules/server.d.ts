import type { IPaginatedResponse, IPaginationQuery } from '../pagination'
import type { IDataCenter } from './data-center'
import type { IDisk } from './disk'
import type { IRack } from './rack'

export interface IServer {
  id?: number
  dataCenterId?: number | string
  dataCenter?: string
  rackId: number | string
  name: string
  cpuName: string
  cpuCore: number | string
  cpuThreads: number | string
  ram: number | string
  ramType: string
  apiUrl: string
  credentials: string
  detail: string
  size: number | string
  userId: number | string
  productId?: number | string
  slotNo: number | string
  serverDisks: IDisk[]
  nodeId: number | string
  vmServerId: number | string
}

export interface ISimpleServer extends Pick<IServer, 'id' | 'name' | 'ram' | 'detail'> {
  cpu: string
  data_center: string
  disk: string
  rack: string
}

export interface IServerQueryParams extends IPaginationQuery<ISimpleServer> {
  search?: string
  dataCenterId?: number | string
  rackId?: number | string
}

export interface IServerPaginationResponse extends IPaginatedResponse<ISimpleServer> {
  dataCenters: Pick<IDataCenter, 'id', 'name'>[]
}

export interface IServerAll extends Pick<IServer, 'id', 'name'> {
  servers: IServer[]
}
