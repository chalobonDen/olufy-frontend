/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ReactDOM from 'react-dom/client'
import { navigate } from 'vite-plugin-ssr/client/router'
import Cookies from 'js-cookie'
import { serialize } from 'cookie'

import type { PageContextClient } from './types'
import { PageShell } from './PageShell'

import 'virtual:svg-icons-register'

import '@/styles/global.scss'

const DEBUGGING = false

let root: ReactDOM.Root
export const render = async (pageContext: PageContextClient) => {
  const { Page, pageProps, redirectTo, initMessagesI18n } = pageContext
  const cookieClient = Cookies.get()
  let { cookie } = pageContext

  if (cookieClient) {
    const cookies = []
    Object.entries(cookieClient).forEach(([key, value]) => {
      cookies.push(serialize(key, value))
    })
    cookie = cookies.join('; ')
  }

  if (!!redirectTo) {
    navigate(redirectTo)
    return
  }

  const page = (
    <PageShell
      pageContext={{
        ...pageContext,
        cookie,
      }}
    >
      <Page {...pageProps} />
    </PageShell>
  )
  const container = document.getElementById('page-view')!
  if (container.innerHTML === '' || !pageContext.isHydration) {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  } else {
    root = ReactDOM.hydrateRoot(container, page)
  }

  if (import.meta.env.PROD) navigator.serviceWorker.register('/sw.js')
}

/* To enable Client-side Routing:
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
export const clientRouting = true
export const hydrationCanBeAborted = true

export const onHydrationEnd = () => {
  if (DEBUGGING) console.log('Hydration finished; page is now interactive.')
}
export const onPageTransitionStart = () => {
  if (DEBUGGING) console.log('Page transition start')
  document.querySelector('body')!.classList.add('page-is-transitioning')
}
export const onPageTransitionEnd = () => {
  if (DEBUGGING) console.log('Page transition end')
  document.querySelector('body')!.classList.remove('page-is-transitioning')
}
