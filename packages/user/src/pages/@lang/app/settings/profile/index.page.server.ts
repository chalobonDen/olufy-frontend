import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const urlOrigin = pageContext?.urlParsed?.origin

  return {
    pageContext: {
      pageProps: {
        urlOrigin,
      },
    },
  }
}
