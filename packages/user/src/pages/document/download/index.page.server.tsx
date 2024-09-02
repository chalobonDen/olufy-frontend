import type { PageContext } from '@/renderer/types'
import ISampleDocument from '@/components/Documents/SampleDocument'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  console.log(`pageContext receive body: `, pageContext.body)

  return {
    pageContext: {
      pdfViwer: <ISampleDocument />,
    },
  }
}
