export interface ICloudServerPricingData {
  name: string
  price: {
    day: number
    month: number
    year: number
  }
  cpu: string
  memory: string
  storage: string
  bandwidth: string
}
