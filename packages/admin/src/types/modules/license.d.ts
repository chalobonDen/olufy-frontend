import type { IPaginatedResponse, IPaginationQuery } from '../pagination'

export interface ILicense {
  id?: number
  name: string
  price: number | string
  paymentType: number | string
  status: boolean
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface ILicenseForm {
  id?: number
  name: string
  price: number | string
  paymentType: number | string
  taxWithheld: number | string
  taxRate?: number | string
  taxAmount?: number | string
}

export interface ILicenses {
  licenses: ILicense[]
}

export interface ISimpleLicense extends Pick<ILicense, 'id' | 'name' | 'price' | 'status'> {}

export interface ILicenseQueryParams extends IPaginationQuery {
  search?: string
}

export interface ILicensePaginationResponse extends IPaginatedResponse<ISimpleLicense> {}
