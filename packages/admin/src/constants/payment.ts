import { PaymentChannel } from '@/enums'
import type { IPaymentChannelOption } from '@/types/modules/deposit'

export const PAYMENT_CHANNEL: IPaymentChannelOption[] = [
  {
    name: 'PromptPay',
    icon: 'backoffice-payment-prompt-pay',
    value: PaymentChannel.PROMPTPAY,
  },
  {
    name: 'LINE Pay',
    icon: 'backoffice-payment-line-pay',
    value: PaymentChannel.LINEPAY,
  },
  {
    name: 'ShopeePay',
    icon: 'backoffice-payment-shoppee-pay',
    value: PaymentChannel.AIRPAY,
  },
  {
    name: 'TrueMoney',
    icon: 'backoffice-payment-truemoney-wallet',
    value: PaymentChannel.TRUEMONEY,
  },
  {
    name: 'Credit/Debit Card',
    icon: 'backoffice-payment-credit-card',
    value: PaymentChannel.CARD,
  },
  {
    name: 'KPLUS',
    icon: 'backoffice-payment-kplus',
    value: PaymentChannel.KPLUS,
  },
]
