import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async (_pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  return {
    pageContext: {
      redirectTo: `/`,
    },
  }
}
