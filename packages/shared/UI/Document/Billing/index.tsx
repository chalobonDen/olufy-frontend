import { useMemo, type FC } from 'react'

import { Document, Page } from '@react-pdf/renderer'

import DocumentHeader from '../Base/Header'
import { baseStyles } from '../Base/styles'
import type { IBillingData, ISimpleBillingOrderItems } from './types'
import DocumentTriangle from '../Base/Triangle'
import { formatPrice } from '../../../utils'
import type { TableColumn } from '../Base/Table'
import DocumentTable from '../Base/Table'
import { renderText } from '../Base/utils'
import DocumentInvoiceSummary from '../Base/InvoiceSummary'
import DocumentFooter from '../Base/Footer'

const DEFAULT_COLOR = '#F44D29'

export interface IBillingDocumentProps {
  data?: IBillingData
  color?: string
  headerTitle?: string
  headerSubTitle?: 'main' | 'copy'
  headerFixed?: boolean
  information: { description: string; title: string }[]
}

const BillingDocument: FC<IBillingDocumentProps> = ({
  data,
  color = DEFAULT_COLOR,
  headerTitle = 'Title',
  headerSubTitle = 'main',
  headerFixed = true,
  information,
}) => {
  // _Memo
  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'key',
        title: renderText(`#`),
        width: '10%',
        align: 'center',
      },
      {
        dataIndex: 'name',
        title: renderText(`รายละเอียด`),
        width: '35%',
        align: 'left',
      },
      {
        dataIndex: 'amount',
        title: renderText(`จำนวน`),
        width: '13.75%',
        align: 'center',
      },
      {
        dataIndex: 'price',
        title: renderText(`ราคาต่อหน่วย`),
        width: '13.75%',
        align: 'center',
        render: (val) => `${formatPrice(val)}`,
      },
      {
        dataIndex: 'discount',
        title: renderText(`ส่วนลด`),
        width: '13.75%',
        align: 'center',
      },
      {
        dataIndex: 'value',
        title: renderText(`มูลค่า`),
        width: '13.75%',
        align: 'center',
        render: (_val, record) => `${formatPrice(record.price - record.discount)}`,
      },
    ] as TableColumn<ISimpleBillingOrderItems>[]
  }, [])

  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <DocumentTriangle color={color} />
        <DocumentHeader
          fixed={headerFixed}
          companyAddress={data.companyAddress}
          customer={data.customer}
          color={color}
          information={information}
          title={headerTitle}
          subTitle={headerSubTitle}
        />
        <DocumentTable columns={columns} dataSource={data.orderItems ?? []} />
        <DocumentInvoiceSummary data={data.financialInfo} color={color} />
        <DocumentFooter companyName={data.companyAddress.name} customerName={data.customer.name} />
      </Page>
    </Document>
  )
}

export default BillingDocument
