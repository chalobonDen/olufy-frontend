import type { PageContext } from '@/renderer/types'
import { VpsServerService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await VpsServerService.orderByIdSsr(pageContext, id)

    return {
      pageContext: {
        pageProps: {
          data,
          id,
        },
      },
    }
  } catch (err) {
    return {
      pageContext: {
        redirectTo: '/app/vps-server',
      },
    }
  }
}
