import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'

import { DEFAULT_THEME } from '@/constants'

import { PageLayout } from './PageLayout'
import type { PageContextServer } from './types'
import { getHeadings } from './utils'

export const passToClient = ['pageProps', 'documentProps', 'layout', 'layoutProps', 'routeParams', 'headings']

export const render = async (pageContext: PageContextServer) => {
  const { Page } = pageContext

  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <PageLayout pageContext={pageContext}>
        <Page />
      </PageLayout>,
    ),
  )

  const title = pageContext?.exports?.documentProps?.title
  const description = pageContext?.exports?.documentProps?.description

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html data-theme="${DEFAULT_THEME}" class="${DEFAULT_THEME}">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>${(title ? `${title} | ` : '') + `Olufy Docs`}</title>
        <meta name="description" content="${description}">
      </head>

      <body>
        <div id="page-view" class="min-h-screen relative flex flex-col">${viewHtml}</div>
      </body>
    </html>`

  const headings = getHeadings(viewHtml._escaped)

  return {
    documentHtml,
    pageContext: {
      headings,
    },
  }
}
