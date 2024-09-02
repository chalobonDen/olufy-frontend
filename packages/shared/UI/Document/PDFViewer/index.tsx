import type { FC, JSXElementConstructor, ReactElement } from 'react'
import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { Document, Page as DocumentPage, pdfjs } from 'react-pdf'
import type ReactPDF from '@react-pdf/renderer'
import { pdf } from '@react-pdf/renderer'
import { useQuery } from '@tanstack/react-query'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import './styles.scss'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

interface IPDFViewerProps {
  document: ReactElement<ReactPDF.DocumentProps, string | JSXElementConstructor<any>>
  queryKey?: any[]
}

const PDFViewer: FC<IPDFViewerProps> = ({ document, queryKey = ['pdf-viewer-mock-template'] }) => {
  // _State
  const [previousRenderValue, setPreviousRenderValue] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [numPages, setNumPages] = useState(null)
  const [scaleFactor, setScaleFactor] = useState(1)

  // _Query
  const { data, isLoading } = useQuery(queryKey, async () => {
    if (!document) return undefined
    const blob = await pdf(document).toBlob()
    const url = URL.createObjectURL(blob)
    return url
  })

  // _Events
  const onPreviousPage = () => {
    if (currentPage === 1) return
    setCurrentPage((prev) => prev - 1)
  }
  const onNextPage = () => {
    if (currentPage >= numPages) return
    setCurrentPage((prev) => prev + 1)
  }
  const onDocumentLoad = (d) => {
    setNumPages(d.numPages)
    setCurrentPage((prev) => Math.min(prev, d.numPages))
  }

  const handleResize = () => {
    const logicalWidth = 920
    const logicalHeight = 1301

    const scale = Math.min((window.innerWidth - 16 * 2) / logicalWidth, window.innerHeight / logicalHeight)

    setScaleFactor(scale)
  }

  // _Effect
  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize, false)
    return () => window.removeEventListener('resize', handleResize, false)
  }, [])

  // _Variable_Rendering
  const isFirstRendering = !previousRenderValue

  const isLatestValueRendered = previousRenderValue === data
  const isBusy = isLoading || !isLatestValueRendered

  // const shouldShowTextLoader = isFirstRendering && isBusy
  const shouldShowPreviousDocument = !isFirstRendering && isBusy

  return (
    <div className={clsx(`document-wrapper`)}>
      {shouldShowPreviousDocument && previousRenderValue ? (
        <Document
          key={previousRenderValue}
          className={clsx(`previous-document`)}
          file={previousRenderValue}
          loading={null}
        >
          <DocumentPage key={currentPage} pageNumber={currentPage} width={920} scale={scaleFactor} />
        </Document>
      ) : null}

      {data && (
        <Document
          key={data}
          className={shouldShowPreviousDocument ? 'rendering-document' : null}
          file={data}
          loading={null}
          onLoadSuccess={onDocumentLoad}
        >
          <DocumentPage
            key={currentPage}
            pageNumber={currentPage}
            onRenderSuccess={() => setPreviousRenderValue(data)}
            width={920}
            scale={scaleFactor}
          />
        </Document>
      )}

      <div className={clsx(`no-print document-navigation`)}>
        <button className={clsx(`document-navigation-prev`)} onClick={onPreviousPage} disabled={currentPage === 1}>
          <IoChevronBack />
        </button>
        <p>
          {currentPage} / {numPages}
        </p>
        <button className={clsx(`document-navigation-next`)} onClick={onNextPage} disabled={currentPage >= numPages}>
          <IoChevronForward />
        </button>
      </div>
    </div>
  )
}

export default PDFViewer
