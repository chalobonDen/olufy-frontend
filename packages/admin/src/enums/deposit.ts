export enum DepositStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  CANCELLED = 'cancelled',
}

export enum PaymentChannel {
  PROMPTPAY = 'promptpay',
  LINEPAY = 'linepay',
  AIRPAY = 'airpay', // shoppee
  TRUEMONEY = 'truemoney',
  CARD = 'card',
  KPLUS = 'kplus',
}
