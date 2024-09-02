import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'

import { getAuthenticationSsr } from '@/stores/auth/utils'
import { getSettingSsr } from '@/stores/setting/utils'
import { IS_PRODUCTION } from '@/constants'
import { GET_BASE_USER_NAVBAR_CONFIG } from '@/constants/user/navbar'

import { getGuestOnly, getIsBackoffice, getIsPublicPath, getPageDocument, getRequireAuth } from './utils'
import { PageShell } from './PageShell'
import type { PageContextServer } from './types'

import { extractLocale, getInitMessagesI18n } from '@/i18n'
import { Language } from '@/enums'

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = [
  'pageProps',
  'redirectTo',
  'documentProps',
  'cookie',
  'requireAuth',
  'layout',
  'layoutProps',
  'guestOnly',
  'initMessagesI18n',
  'routeParams',
  'locale',
]

export const render = async (pageContext: PageContextServer) => {
  const { Page, pageProps, redirectTo, cookie, urlOriginal, locale: langContext, urlPathname, urlParsed } = pageContext
  const { isAuth } = getAuthenticationSsr(cookie)
  const requireAuth = getRequireAuth(pageContext)
  const guestOnly = getGuestOnly(pageContext)
  const { theme, lang: langCookie } = getSettingSsr(cookie)

  const lang = langCookie ?? langContext
  const initMessagesI18n = await getInitMessagesI18n(lang)

  // Handle check first path not match lang
  const { urlWithoutLocale, locale } = extractLocale(urlPathname)
  if (!locale && !getIsPublicPath(urlPathname)) {
    return {
      documentHtml: null,
      pageContext: {
        redirectTo: '/' + lang,
        initMessagesI18n,
      },
    }
  } else if (!Object.values(Language).includes(lang) && !getIsPublicPath(urlPathname)) {
    return {
      documentHtml: null,
      pageContext: {
        redirectTo: '/' + lang + urlWithoutLocale,
        initMessagesI18n,
      },
    }
  }

  // TODO:
  // Stupid condition for handle production
  if (IS_PRODUCTION) {
    const userBlacklistUrl = GET_BASE_USER_NAVBAR_CONFIG()
      .map((e) => e.items)
      .flat()
      .filter((e) => !e.isAvailable)
      .map((e) => e.path)
    const customBlacklist = []
    if ([...userBlacklistUrl, ...customBlacklist].includes(urlWithoutLocale)) {
      return {
        documentHtml: null,
        pageContext: {
          redirectTo: `/${lang}`,
          initMessagesI18n,
        },
      }
    }
  }
  // END condition TODO:

  if (urlPathname === `/${lang}/app`)
    return {
      documentHtml: null,
      pageContext: {
        redirectTo: `/${lang}/app/`,
        initMessagesI18n,
      },
    }

  // Check page has redirectTo
  if (!!redirectTo) {
    return {
      documentHtml: null,
      pageContext: {
        redirectTo: `/${lang}/${redirectTo.replace(/^\//gm, '')}`,
        initMessagesI18n,
      },
    }
  }

  // Protect page by requireAuth
  if (!isAuth && requireAuth) {
    return {
      documentHtml: null,
      pageContext: {
        redirectTo: `/${lang}/login${urlParsed.searchOriginal ?? ''}`,
        initMessagesI18n,
      },
    }
  }

  // Protect page by guestOnly
  if (isAuth && guestOnly) {
    return {
      documentHtml: null,
      pageContext: {
        redirectTo: `/${lang}/app/`,
        initMessagesI18n,
      },
    }
  }

  const pageHtml = !Page
    ? ''
    : ReactDOMServer.renderToString(
        <PageShell
          pageContext={{
            ...pageContext,
            initMessagesI18n,
          }}
        >
          <Page {...pageProps} />
        </PageShell>,
      )

  // See https://vite-plugin-ssr.com/head
  const { title, description, image } = getPageDocument(pageContext, initMessagesI18n)
  const imageUrl =
    image && !!urlOriginal
      ? new URL(image, urlOriginal).toString()
      : image && !urlOriginal
      ? image
      : !!urlOriginal
      ? new URL(image, urlOriginal).toString()
      : image

  const isBackoffice = getIsBackoffice(pageContext)
  const roleLayout: 'user' | 'client' = isBackoffice ? 'client' : 'user'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en" class="${theme}" data-theme="${theme}" data-layout="${roleLayout}">
      <head>
        <meta charSet="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">

        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
        <link rel="manifest" href="/manifest.webmanifest">
        <meta name="msapplication-TileColor" content="#603cba">
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">

        <title>${title}</title>

        <meta name="title" content="${title}">
        <meta name="description" content="${description}">

        <meta property="og:type" content="website">
        <meta property="og:url" content="${urlOriginal}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${imageUrl}">

        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${urlOriginal}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${imageUrl}">
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
      initMessagesI18n,
    },
  }
}
