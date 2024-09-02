import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    return {
      pageContext: {
        pageProps: {
          data: {
            domain: '.com',
            price: 3500,
            taxRate: 1,
            taxAmount: 10,
          },
        },
      },
    }
  } catch (err) {
    return {
      pageContext: {
        redirectTo: '/app/domain',
      },
    }
  }
}
