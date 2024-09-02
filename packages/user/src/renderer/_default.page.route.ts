import { DEFAULT_LANG } from '@/constants'

import type { PageContext } from './types'

import { extractLocale } from '@/i18n'

export const onBeforeRoute = async (pageContext: PageContext) => {
  const { locale } = extractLocale(pageContext.urlPathname)
  return {
    pageContext: {
      locale: locale ?? DEFAULT_LANG,
    },
  }
}
