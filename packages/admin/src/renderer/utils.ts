import { APP_NAME, DEFAULT_SEO_HEADER } from '@/constants'

import type { DocumentProps, PageContext } from './types'

import { Layout } from '@/enums'

export const getPageDocument = (pageContext: PageContext, message?: any): DocumentProps => {
  const image =
    (pageContext.exports.documentProps || {}).image ||
    (pageContext.documentProps || {}).image ||
    DEFAULT_SEO_HEADER.image
  let title =
    (pageContext.exports.documentProps || {}).title ||
    (pageContext.documentProps || {}).title ||
    DEFAULT_SEO_HEADER.title
  let description =
    (pageContext.exports.documentProps || {}).description ||
    (pageContext.documentProps || {}).description ||
    DEFAULT_SEO_HEADER.description

  if (message) {
    title = typeof message?.[title] !== 'undefined' ? message?.[title] : title
    description = typeof message?.[description] !== 'undefined' ? message?.[description] : description
  }

  return {
    title: title?.includes(APP_NAME) ? title : `${title} - ${APP_NAME}`,
    description,
    image,
  }
}

export const getIsBackoffice = (pageContext: PageContext): boolean => {
  return pageContext.urlPathname.includes('/app/')
}

export const getRequireAuth = (pageContext: PageContext): boolean => {
  return pageContext.exports.requireAuth || pageContext.requireAuth || false || getIsBackoffice(pageContext)
}

export const getGuestOnly = (pageContext: PageContext): boolean => {
  return pageContext.exports.guestOnly || pageContext.guestOnly || false
}

export const getLayout = (pageContext: PageContext): Layout => {
  return pageContext.exports.layout || pageContext.layout || Layout.DEFAULT
}

export const getLayoutProps = (pageContext: PageContext): Object => {
  return pageContext.exports.layoutProps || pageContext.layoutProps || {}
}
