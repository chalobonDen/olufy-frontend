import type { PageContext } from '@/renderer/types'
import { RackService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await RackService.byIdSsr(pageContext, id)

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
        redirectTo: '/app/rack',
      },
    }
  }
}
