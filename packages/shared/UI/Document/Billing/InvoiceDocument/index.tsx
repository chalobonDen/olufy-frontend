import { useMemo, type FC } from 'react'

import type { IBillingDocumentProps } from '..'
import BillingDocument from '..'
import { formatDate } from '../../../../utils'

interface IInvoiceDocumentProps extends Pick<IBillingDocumentProps, 'data' | 'headerSubTitle'> {}

const InvoiceDocument: FC<IInvoiceDocumentProps> = ({ ...props }) => {
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
        title: 'ครบกำหนด',
        description: formatDate(new Date(data.info.endDate), 'dd/MM/yyyy'),
      },
      {
        title: 'ผู้ขาย',
        description: data.info.sale,
      },
    ] as {
      description: string
      title: string
    }[]
  }, [data])

  return (
    <BillingDocument
      headerTitle={`ใบเสร็จรับเงิน/ใบกำกับภาษี`}
      color={'#744595'}
      {...props}
      information={information}
    />
  )
}

export default InvoiceDocument
