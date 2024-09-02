import type { PageContext } from '@/renderer/types'
import { UserService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await UserService.byIdSsr(pageContext, id)

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
        redirectTo: '/app/admin',
      },
    }
  }
}
