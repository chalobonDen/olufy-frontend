import type { FC } from 'react'

import type { IBillingDocumentProps } from '@olufy-frontend/shared/UI/Document/Billing'
import BillingDocument from '@olufy-frontend/shared/UI/Document/Billing'
import type { IBillingData } from '@olufy-frontend/shared/UI/Document/Billing/types'
import { camelizeKeys, formatDate } from '@olufy-frontend/shared/utils'
import { range } from 'lodash-es'

const MOCK = camelizeKeys({
  company_address: {
    id: 3,
    name: 'test',
    tax_id: '123',
    tel: '080000000',
    address: 'a',
    district: 'www',
    sub_district: 'www',
    province: 'b',
    zip_code: 'cc',
    branch: 'www',
  },
  info: {
    document_no: 'TAX202308000007',
    start_date: '2023-08-24T06:38:34.794Z',
    end_date: '2023-09-24T06:38:34.794Z',
    sale: 'admin admin2',
  },
  customer: {
    id: 75,
    name: 'test',
    tax_id: '15099012711111',
    tel: '0874587456',
    address: '201',
    district: 'เมืองเชียงใหม่',
    sub_district: 'พระสิงห์',
    province: 'เชียงใหม่',
    zip_code: '50200',
    branch: 'test',
  },
  order_items: range(0, 5).map((n) => ({
    key: n + 1,
    name: 'Size L',
    amount: 1,
    discount: 0,
    price: 9000,
  })),
  financial_info: {
    price: 9000,
    sub_vat: 8411.21,
    vat: 588.79,
    tax_withheld_percent: 3,
    tax_withheld: 252.34,
    total: 8747.66,
  },
}) as IBillingData

const MOCK_INFO = [
  {
    title: 'เลขที่',
    description: MOCK.info.documentNo,
  },
  {
    title: 'วันที่',
    description: formatDate(new Date(MOCK.info.startDate), 'dd/MM/yyyy'),
  },
  {
    title: 'ผู้ขาย',
    description: MOCK.info.sale,
  },
  {
    title: 'วันที่ดาวน์โหลด',
    description: formatDate(new Date(MOCK.info.endDate), 'dd/MM/yyyy'),
  },
]

interface IISampleDocumentProps {}

const ISampleDocument: FC<IISampleDocumentProps> = () => {
  return <BillingDocument data={MOCK} headerTitle={`ใบเสร็จรับเงิน/ใบกำกับภาษี`} information={MOCK_INFO} />
}

export default ISampleDocument
