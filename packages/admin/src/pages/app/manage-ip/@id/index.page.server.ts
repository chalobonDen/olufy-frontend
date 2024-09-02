import type { PageContext } from '@/renderer/types'
import { IpService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await IpService.byIdSsr(pageContext, id)

    return {
      pageContext: {
        pageProps: {
          id,
          data,
        },
      },
    }
  } catch (err) {
    return {
      pageContext: {
        redirectTo: '/app/manage-ip',
      },
    }
  }
}