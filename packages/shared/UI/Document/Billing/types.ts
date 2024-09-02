export interface IBillingContactAddress {
  id: number
  name: string
  taxId: string
  tel: string
  address: string
  district: string
  subDistrict: string
  province: string
  zipCode: string
  branch: string
}

export interface IBillingInfo {
  documentNo: string
  startDate: Date | number | string
  endDate: Date | number | string
  sale: string
}

export interface IBillingOrderItems {
  key: number
  name: string
  amount: number
  discount: number
  price: number
}

export interface IBillingFinancialInfo {
  price: number
  subVat: number
  vat: number
  taxWithheldPercent: number
  taxWithheld: number
  total: number
}

export interface ISimpleBillingOrderItems
  extends Pick<IBillingOrderItems, 'key' | 'amount' | 'discount' | 'name' | 'price'> {}

export interface IBillingData {
  // Like API Get Billing or Other of Document
  companyAddress: IBillingContactAddress
  info: IBillingInfo
  customer: IBillingContactAddress
  orderItems: IBillingOrderItems[]
  financialInfo: IBillingFinancialInfo
  // Custom
  title?: string
  subTitle?: 'main' | 'copy'
}
