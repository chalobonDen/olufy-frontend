import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    return {
      pageContext: {
        pageProps: {
          data: {
            id: id,
            name: 'AMD RYZEN™ 9 5950X 3.4 GHZ 16C | 32T',
            storageType: 'SSD',
            storageCapacity: 512,
            cpu: 'AMD RYZEN™ 9 5950X 3.4 GHZ 16C | 32T',
            ram: 128,
            os: 'Linux / Windows',
            networkShare: 1000,
            bandwidth: 'Unlimited',
            price: 10000,
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
