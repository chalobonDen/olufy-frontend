import type {
  PageContextBuiltIn,
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from 'vite-plugin-ssr/types'

import type { Layout } from '@/enums'

export type PageProps = {}

export type DocumentProps = {
  title?: string
  description?: string
  image?: string
}

type Page = (pageProps: PageProps) => React.ReactElement

type PageContextCustom = {
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  exports: {
    documentProps?: DocumentProps
    requireAuth?: boolean
    guestOnly?: boolean
    layout?: Layout
    layoutProps?: Object
  }
  documentProps?: DocumentProps
  redirectTo?: string
  cookie?: string
  requireAuth?: boolean
  guestOnly?: boolean
  layout?: Layout
  layoutProps?: Object
  //
  headings?: { text: string; link: string }[]
}

export type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
export type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

export type PageContext = PageContextClient | PageContextServer
