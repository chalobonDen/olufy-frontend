import { Fragment, type FC } from 'react'

import { View, Text, Image } from '@react-pdf/renderer'

import Logo from '../../../../assets/logo.png'
import { styles } from './styles'
import { renderText } from '../utils'
import DocumentDivider from '../Divider'

interface IDocumentFooterProps {
  companyName: string
  customerName: string
}

interface IDocumentFooterSignedProps {
  name: string
  label: string
  textAlign?: 'center' | 'left' | 'right' | 'justify'
}

const DocumentFooterSigned: FC<IDocumentFooterSignedProps> = ({ name, label, textAlign = 'left' }) => {
  return (
    <View style={{ width: '35%' }}>
      <Text style={{ textAlign: textAlign }}>{renderText(`ในนาม ${name}`)}</Text>
      <View style={styles.signContent}>
        <View style={styles.signText}>
          <DocumentDivider />
          <Text style={{ textAlign: 'center' }}>{label}</Text>
        </View>
        <View style={styles.dateText}>
          <DocumentDivider />
          <Text style={{ textAlign: 'center' }}>วันที่</Text>
        </View>
      </View>
    </View>
  )
}

const DocumentFooter: FC<IDocumentFooterProps> = ({ companyName, customerName }) => {
  return (
    <Fragment>
      <View style={{ position: 'relative', height: 100 }}></View>
      <View wrap={false} style={styles.footerContent}>
        {/* invoice footer */}
        <View style={styles.invoiceSignature}>
          {/* payor */}
          <DocumentFooterSigned name={companyName} label={`ผู้จ่ายเงิน`} />

          {/* logo */}
          <View style={{ width: '30%' }}>
            <Image src={Logo} style={styles.logo} />
          </View>

          {/* payee */}
          <DocumentFooterSigned name={customerName} label={`ผู้รับเงิน`} textAlign={`right`} />
        </View>
      </View>
    </Fragment>
  )
}

export default DocumentFooter
