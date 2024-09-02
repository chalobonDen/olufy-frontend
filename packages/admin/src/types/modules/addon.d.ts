import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface IAddon {
  id?: number
  name: string
  detail: string
  price: number | string
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface IAddons {
  addons: IAddon[]
}

export interface ISimpleAddon extends Pick<IAddon, 'id' | 'name' | 'price'> {}

export interface IAddonQueryParams extends IPaginationQuery {
  search?: string
}

export interface IAddonPaginationResponse extends IPaginatedResponse<ISimpleAddon> {}
