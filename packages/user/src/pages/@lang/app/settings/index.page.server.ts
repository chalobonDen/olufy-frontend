import type { PageContext } from '@/renderer/types'

export const onBeforeRender = async ({ pageContext }): Promise<{ pageContext: Partial<PageContext> }> => {
  const locale = pageContext?.locale

  return {
    pageContext: {
      redirectTo: `/${locale}/app/settings/profile`,
    },
  }
}
