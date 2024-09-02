import { APP_NAME, DEFAULT_SEO_HEADER } from '@/constants'

import type { DocumentProps, PageContext } from './types'

import { Layout } from '@/enums'

export const getPageDocument = (pageContext: PageContext, message?: any): DocumentProps => {
  const { locale } = pageContext

  const image =
    (pageContext.exports.documentProps || {}).image ||
    (pageContext.documentProps || {}).image ||
    DEFAULT_SEO_HEADER[locale].image
  let title =
    (pageContext.exports.documentProps || {}).title ||
    (pageContext.documentProps || {}).title ||
    DEFAULT_SEO_HEADER[locale].title
  let description =
    (pageContext.exports.documentProps || {}).description ||
    (pageContext.documentProps || {}).description ||
    DEFAULT_SEO_HEADER[locale].description

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

/**
 * Get public path by url pathname
 * @param urlPathname // ควรจะเป็น path เฉพาะ ที่ไม่ใช่ `/app` หรืออื่นๆ
 * @returns boolean
 */
export const getIsPublicPath = (urlPathname: string): boolean => {
  const urls = ['/blank', '/document/invoice']
  let validation = 0
  urls.forEach((e) => (urlPathname.includes(e) ? (validation += 1) : (validation += 0)))
  return validation > 0
}
