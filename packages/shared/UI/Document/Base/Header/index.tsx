import type { FC } from 'react'

import { Text, View, Image } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'

import type { IBillingContactAddress, IBillingData } from '../../Billing/types'
import Logo from '../../../../assets/logo.png'
import LogoText from '../../../../assets/logo-text.png'
import { getStyles } from './styles'
import { renderText } from '../utils'
import DocumentDivider from '../Divider'
import { formatDate } from '../../../../utils'
import { baseStyles } from '../styles'

interface IDocumentHeaderProps extends Pick<IBillingData, 'companyAddress' | 'customer' | 'title' | 'subTitle'> {
  color: string
  fixed?: boolean
  information: { description: string; title: string }[]
}

interface IDocumentHeaderAddressProps {
  data: IBillingContactAddress
  color: string
  style?: Style | Style[]
}

interface IDocumentHeaderLabelContentProps {
  description: string
  title: string
  color: string
  style?: Style | Style[]
}

const DocumentHeaderAddress: FC<IDocumentHeaderAddressProps> = ({ color, data, style }) => {
  const styles = getStyles(color)

  return (
    <View style={style}>
      <Text>{renderText(data.name)}</Text>
      <View style={styles.address}>
        <Text style={styles.addressInfo}>{renderText(`${data.address}`)}</Text>
        <Text style={styles.addressInfo}>{renderText(`ตำบล${data.subDistrict}`)}</Text>
        <Text style={styles.addressInfo}>{renderText(`อำเภอ${data.district}`)}</Text>
        <Text style={styles.addressInfo}>{renderText(`จังหวัด${data.province}`)}</Text>
        <Text style={styles.addressInfo}>{renderText(`รหัสไปรษณีย์${data.zipCode}`)}</Text>
      </View>
      {data.taxId && <Text>{renderText(`เลขประจำตัวผู้เสียภาษี ${data.taxId}`)}</Text>}
      {data.tel && <Text>{`เบอร์มือถือ ${data.tel}`}</Text>}
    </View>
  )
}

const DocumentHeaderLabelContent: FC<IDocumentHeaderLabelContentProps> = ({ color, description, style, title }) => {
  const styles = getStyles(color)

  return (
    <View style={{ ...styles.contentLabel, ...style }}>
      <Text style={styles.label}>{renderText(title)}</Text>
      <Text>{renderText(description)}</Text>
    </View>
  )
}

const DocumentHeader: FC<IDocumentHeaderProps> = ({
  companyAddress,
  information,
  customer,
  color,
  fixed = false,
  title = 'Title',
  subTitle = 'main',
}) => {
  const styles = getStyles(color)

  return (
    <View style={{ flexDirection: 'row' }} fixed={fixed}>
      {/* left */}
      <View style={{ flex: 1 }}>
        {/* Owner */}
        <View style={styles.contentLogo}>
          <Image src={Logo} style={styles.logo} />
          <Image src={LogoText} style={styles.logoText} />
        </View>
        <DocumentHeaderAddress data={companyAddress} color={color} style={baseStyles['mt-md']} />

        {/* Customer */}
        <Text style={styles.customerLable}>ลูกค้า</Text>
        <DocumentHeaderAddress data={customer} color={color} />
      </View>

      {/* right */}
      <View style={{ width: 190 }}>
        <Text style={styles.title}>{renderText(title)}</Text>
        <Text style={styles.subTitle}>
          {subTitle === 'main' ? 'ต้นฉบับ' : subTitle === 'copy' ? renderText('สำเนา') : ''}
        </Text>

        <DocumentDivider />

        {information.map((info, index) => {
          return (
            <DocumentHeaderLabelContent key={index} title={info.title} description={info.description} color={color} />
          )
        })}

        <DocumentDivider />
      </View>
    </View>
  )
}

export default DocumentHeader
