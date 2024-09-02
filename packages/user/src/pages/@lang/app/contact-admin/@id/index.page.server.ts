import type { PageContext } from '@/renderer/types'
import { TicketService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await TicketService.byIdSsr(pageContext, id)

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
        redirectTo: `app/contact-admin`,
      },
    }
  }
}
