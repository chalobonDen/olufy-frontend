import { Fragment, useMemo } from 'react'

import PDFViewer from '@olufy-frontend/shared/UI/Document/PDFViewer'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { camelizeKeys, formatDate } from '@olufy-frontend/shared/utils'
import { Button, SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import ReceiptDocument from '@olufy-frontend/shared/UI/Document/Billing/ReceiptDocument'

import { useIsMounted } from '@/hooks/useIsMounted'
import BackButton from '@/components/Buttons/BackButton'

import type { IQuotationDocument } from '@/types/modules/quotation'

interface IPageProps {
  data: IQuotationDocument
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { isMounted } = useIsMounted()

  // _Memo
  const fileName = useMemo(() => {
    return `olufy_invoice_${data?.info?.documentNo}_${formatDate(new Date(), 'dd-MM-yyyy')}.pdf`
  }, [data])

  return (
    <Fragment>
      <div className={clsx(`flex items-center justify-between space-x-3`)}>
        <BackButton onClick={() => history.back()} />

        {isMounted && (
          <PDFDownloadLink document={<ReceiptDocument data={data} />} fileName={fileName}>
            {({ loading }) => (
              <Button variant="purple" loading={loading} size="medium" buttonType="icon-text">
                <SvgIcon name="download" />
                <span>{i18n._(t`ดาวน์โหลด`)}</span>
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>
      {isMounted && <PDFViewer document={<ReceiptDocument data={data} />} />}
    </Fragment>
  )
}
