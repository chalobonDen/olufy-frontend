/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ReactDOM from 'react-dom/client'

import { PageLayout } from './PageLayout'
import type { PageContextClient } from './types'

import '@/styles/global.scss'

const DEBUGGING = false

let root: ReactDOM.Root
export const render = async (pageContext: PageContextClient) => {
  const { Page, pageProps } = pageContext

  const page = (
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
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

  const title = pageContext?.exports?.documentProps?.title

  document.title = (title ? `${title} | ` : '') + `Olufy Docs`
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
