import type { PageContext } from '@/renderer/types'
import { PartnerService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await PartnerService.byIdSsr(pageContext, id)

    return {
      pageContext: {
        pageProps: {
          data,
        },
      },
    }
  } catch (err) {
    return {
      pageContext: {
        redirectTo: '/app/partner',
      },
    }
  }
}
