import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    return {
      pageContext: {
        pageProps: {
          data: {
            name: 'NAME',
            sizeRack: 'SIZE L / PACKAGE L',
            dataCenter: 'name',
            os: 'Windows',
            networkShare: 5,
            bandwidth: '1000 mbps',
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
        redirectTo: '/app/co-location',
      },
    }
  }
}
