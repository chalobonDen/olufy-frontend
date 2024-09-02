import type { PageContext } from '@/renderer/types'
import { HomeService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  try {
    const data = await HomeService.homepageSsr(pageContext)

    return {
      pageContext: {
        pageProps: {
          data: {
            ...data,
          },
        },
      },
    }
  } catch (err) {
    return {
      pageContext: {
        pageProps: {
          data: {},
        },
      },
    }
  }
}
