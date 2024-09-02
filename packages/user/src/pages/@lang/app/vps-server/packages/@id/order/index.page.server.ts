import { decryptAESDeserialize } from '@olufy-frontend/shared/utils'

import type { PageContext } from '@/renderer/types'
import { VpsServerService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { id } = pageContext.routeParams as { id: string }
  const orderData = decryptAESDeserialize({ value: pageContext.urlParsed.search?.u, secureKey: 'key' })

  try {
    if (!orderData) throw 'no query data'

    const data = await VpsServerService.byIdSsr(pageContext, id)

    return {
      pageContext: {
        pageProps: {
          data,
          id,
          orderData,
          baseUrl: pageContext.urlParsed.origin + '/' + pageContext.locale,
        },
      },
    }
  } catch (err) {
    return {
      pageContext: {
        redirectTo: `app/vps-server/packages`,
      },
    }
  }
}
