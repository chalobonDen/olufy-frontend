import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  return {
    pageContext: {
      pageProps: {
        baseUrl: pageContext.urlParsed.origin + '/' + pageContext.locale,
      },
    },
  }
}
