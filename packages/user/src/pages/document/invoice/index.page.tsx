import { Fragment } from 'react'

import { PDFViewer } from '@react-pdf/renderer'

import { useIsMounted } from '@/hooks/useIsMounted'
import SampleDocument from '@/components/Documents/SampleDocument'

import { Layout } from '@/enums'

export const Page = () => {
  const { isMounted } = useIsMounted()

  return (
    <Fragment>
      {isMounted && (
        <PDFViewer
          style={{
            flex: 1,
            width: '100%',
            height: '100vh',
          }}
        >
          <SampleDocument />
        </PDFViewer>
      )}
    </Fragment>
  )
}

export const layout = Layout.BLANK
