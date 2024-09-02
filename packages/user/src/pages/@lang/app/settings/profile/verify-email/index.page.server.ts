import type { PageContext } from '@/renderer/types'
import { UserService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { urlParsed } = pageContext
  const token = urlParsed.search?.token

  if (token) {
    try {
      await UserService.confirmVerifyEmailSsr(pageContext, token)

      return {
        pageContext: {
          redirectTo: `app/settings/profile`,
        },
      }
    } catch (err) {
      return {
        pageContext: {
          redirectTo: `app/settings/profile`,
        },
      }
    }
  } else {
    return {
      pageContext: {
        redirectTo: `app/settingss/profile`,
      },
    }
  }
}
