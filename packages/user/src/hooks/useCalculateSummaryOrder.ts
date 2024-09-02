import type { ICalculateSummaryOrderResponse } from '@/types/base'

const useCalculateSummaryOrder = ({
  price,
  withholdTax = 0,
}: {
  price: number
  withholdTax?: number
}): ICalculateSummaryOrderResponse => {
  const vat = 7
  const priceBeforeVat = price * (100 / (vat + 100))
  const vatAmount = price - priceBeforeVat

  let withholdTaxAmount = 0
  let totalAmount = price

  if (withholdTax > 0) {
    withholdTaxAmount = priceBeforeVat * (withholdTax / 100)
    totalAmount = price - withholdTaxAmount
  }

  return {
    price,
    priceBeforeVat,
    vat,
    vatAmount,
    withholdTax,
    withholdTaxAmount,
    netPrice: price,
    totalAmount,
  }
}

export default useCalculateSummaryOrder
