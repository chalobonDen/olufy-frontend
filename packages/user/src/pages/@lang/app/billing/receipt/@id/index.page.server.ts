import type { PageContext } from '@/renderer/types'
import { ReceiptService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    const data = await ReceiptService.byIdSsr(pageContext, id)

    if (!data?.companyAddress) throw Error()

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
        redirectTo: 'app/billing/receipt',
      },
    }
  }
}
