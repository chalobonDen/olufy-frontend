import { useMemo, type FC } from 'react'

import type { IBillingDocumentProps } from '..'
import BillingDocument from '..'
import { formatDate } from '../../../../utils'

interface IReceiptDocumentProps extends Pick<IBillingDocumentProps, 'data' | 'headerSubTitle'> {}

const ReceiptDocument: FC<IReceiptDocumentProps> = ({ ...props }) => {
  const { data } = props

  // _Memo
  const information = useMemo(() => {
    return [
      {
        title: 'เลขที่',
        description: data.info.documentNo,
      },
      {
        title: 'วันที่',
        description: formatDate(new Date(data.info.startDate), 'dd/MM/yyyy'),
      },

      {
        title: 'ผู้ขาย',
        description: data.info.sale,
      },
      {
        title: 'วันที่พิมพ์',
        description: formatDate(new Date(), 'dd/MM/yyyy'),
      },
    ] as {
      description: string
      title: string
    }[]
  }, [data])

  return <BillingDocument headerTitle={`ใบเสร็จรับเงิน/ใบกำกับภาษี`} {...props} information={information} />
}

export default ReceiptDocument
