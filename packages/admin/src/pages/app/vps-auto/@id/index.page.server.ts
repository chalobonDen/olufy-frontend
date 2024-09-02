import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }

  try {
    return {
      pageContext: {
        pageProps: {
          data: {
            name: 'SSD Junior (SSD01)',
            os: 'Linux',
            cpu: '2',
            ram: '4',
            storage: 'SSD',
            disk: '1 TB',
            networkShare: '1 IP',
            bandwidth: 'Unlimited',
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
        redirectTo: '/app/vps-auto',
      },
    }
  }
}
