import type { PageContext } from '@/renderer/types'
import { VpsServerService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await VpsServerService.byIdSsr(pageContext, id)

    // if (!data.status) throw 'Not available'

    return {
      pageContext: {
        pageProps: {
          data,
          id,
        },
      },
    }
  } catch (err: any) {
    return {
      pageContext: {
        redirectTo: `app/vps-server/packages`,
      },
    }
  }
}
