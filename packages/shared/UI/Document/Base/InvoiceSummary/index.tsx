import { Fragment, type FC } from 'react'

import { View, Text } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'

import { getStyles } from './styles'
import type { IBillingFinancialInfo } from '../../Billing/types'
import { renderText } from '../utils'
import DocumentDivider from '../Divider'
import { formatPrice, getThaiBaht } from '../../../../utils'
import { baseStyles } from '../styles'

interface IDocumentInvoiceSummaryProps {
  data: IBillingFinancialInfo
  remark?: string
  wrap?: boolean
  color: string
}

interface IDocumentInvoiceSummaryDetail {
  title: string
  data: string
  color: string
  style?: Style | Style[]
}

const DocumentInvoiceSummaryDetail: FC<IDocumentInvoiceSummaryDetail> = ({ data, title, color, style }) => {
  const styles = getStyles(color)

  return (
    <View style={{ ...styles.detailContent, ...style }}>
      <View style={styles.labelContent}>
        <Text style={styles.labelText}>{renderText(title)}</Text>
      </View>
      <Text style={styles.valueText}>{renderText(data)}</Text>
    </View>
  )
}

const DocumentInvoiceSummary: FC<IDocumentInvoiceSummaryProps> = ({ data, remark, color, wrap = false }) => {
  const styles = getStyles(color)

  return (
    <View wrap={wrap} style={baseStyles['mt-lg']}>
      {/* summary */}
      <View style={styles.summaryContent}>
        {/* text baht */}
        <View>
          <Text>({getThaiBaht(data.total)})</Text>
        </View>

        {/* summary list */}
        <View>
          {/* top */}
          <DocumentInvoiceSummaryDetail title={`ราคารวม`} data={`${formatPrice(data.price)} บาท`} color={color} />
          <DocumentInvoiceSummaryDetail title={`ราคาก่อน VAT`} data={`${formatPrice(data.subVat)} บาท`} color={color} />
          <DocumentInvoiceSummaryDetail
            title={`ภาษีมูลค่าเพิ่ม 7%`}
            data={`${formatPrice(data.vat)} บาท`}
            color={color}
          />
          <DocumentDivider />
          {/* bottom */}
          {data?.taxWithheld > 0 && (
            <Fragment>
              <DocumentInvoiceSummaryDetail
                title={`รวมราคาสุทธิ`}
                data={`${formatPrice(data.price)} บาท`}
                color={color}
              />
              <DocumentInvoiceSummaryDetail
                title={`หักภาษี ณ ที่จ่าย ${data.taxWithheldPercent}%`}
                data={`${formatPrice(data.taxWithheld)} บาท`}
                color={color}
              />
            </Fragment>
          )}
          <DocumentInvoiceSummaryDetail
            title={`จำนวนเงินรวมทั้งสิ้น`}
            data={`${formatPrice(data.total)} บาท`}
            color={color}
          />
        </View>
      </View>

      {/* remark */}
      {remark && (
        <View style={{ ...baseStyles['mt-lg'] }}>
          <Text style={{ color: color }}>หมายเหตุ</Text>
          <Text>{renderText(remark)}</Text>
        </View>
      )}
    </View>
  )
}

export default DocumentInvoiceSummary
