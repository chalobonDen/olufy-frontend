import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    return {
      pageContext: {
        pageProps: {
          data: {
            id: 1,
            name: 'JUNIOR',
            domain: 3,
            storage: 30,
            bandwidth: 200,
            database: 5,
            fipAccount: 'Unlimited FTP',
            webControlPanel: 'DirectAdmin',
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
        redirectTo: '/app/hosting',
      },
    }
  }
}
