import type { PropsWithChildren } from 'react'
import React, { useEffect } from 'react'

import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { navigate } from 'vite-plugin-ssr/client/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { PageLoader } from '@olufy-frontend/shared/UI'

import { useSetting } from '@/hooks/stores/useSetting'
import { useUserStore } from '@/stores/user'
import { initializeFirebase } from '@/libs/firebase'
import { useAuthentication } from '@/hooks/stores/useAuthentication'
import { useSettingStore } from '@/stores/setting'
import { RETURN_PAGE_SEARCH_KEY } from '@/constants'

import type { PageContext } from './types'
import { getGuestOnly, getIsBackoffice, getPageDocument, getRequireAuth } from './utils'

import { extractLocale, useLinguiInit } from '@/i18n'

export const Context = React.createContext<Partial<PageContext>>({})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 3_000,
    },
  },
})

initializeFirebase()

const PageLoaderMotion = motion(PageLoader)

const Provider = ({
  pageContext,
  children,
}: PropsWithChildren & {
  pageContext: PageContext
}) => {
  const { lang, theme } = useSetting()
  const { isAuth } = useAuthentication()
  const requireAuth = getRequireAuth(pageContext)
  const guestOnly = getGuestOnly(pageContext)
  const { profile } = useUserStore()
  const pathname = pageContext.urlPathname
  const { urlParsed } = pageContext
  const isBackoffice = getIsBackoffice(pageContext)
  const { setLang } = useSettingStore()

  const clientI18n = useLinguiInit()

  // _Events
  const checkViewport = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // - Set theme
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    } else {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    }
  }, [theme])

  // - Set theme
  useEffect(() => {
    const root = document.documentElement
    if (isBackoffice) {
      root.setAttribute('data-layout', 'backoffice')
    } else {
      root.setAttribute('data-layout', 'user')
    }
  }, [theme, isBackoffice])

  // - Set view port for calculation
  useEffect(() => {
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => {
      window.removeEventListener('resize', checkViewport)
    }
  }, [])

  // - Protect page for authentication only
  useEffect(() => {
    if (!isAuth && requireAuth) {
      navigate(`/${lang}/login` + `?${RETURN_PAGE_SEARCH_KEY}=${urlParsed.pathname}`)
    }
  }, [isAuth, lang, requireAuth, urlParsed.pathname])

  // - Protect page for guest only
  useEffect(() => {
    if (isAuth && guestOnly) {
      const returnUrl = urlParsed.search?.[RETURN_PAGE_SEARCH_KEY]
      if (returnUrl) navigate(returnUrl)
      else navigate(`/${lang}/app/`)
    }
  }, [isAuth, guestOnly, lang, urlParsed.search])

  // - Protect /app
  useEffect(() => {
    if (pathname === `/${lang}/app`) navigate(`/${lang}/app/`)
  }, [lang, pathname])

  // - xxxxxx
  useEffect(() => {
    const { locale } = extractLocale(pathname)
    if (locale) setLang(locale, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!!isAuth && !!profile) {
      if (profile.isNewUser && (pathname === `/${lang}/` || isBackoffice)) {
        navigate(`/${lang}/setup-profile`)
      }
      if (!profile.isNewUser && pathname === `/${lang}/setup-profile`) {
        navigate(`/${lang}/app`)
      }
    }
  }, [isAuth, isBackoffice, lang, pathname, profile])

  useEffect(() => {
    const { title } = getPageDocument(pageContext, clientI18n.messages)
    document.title = title
  }, [clientI18n, pageContext])

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider i18n={i18n}>
        {children}

        <AnimatePresence initial={false}>
          {isAuth && !profile && (
            <PageLoaderMotion
              key="page-loader"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  ease: 'linear',
                  duration: 0,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  ease: 'easeInOut',
                  delay: 0.6,
                },
              }}
            />
          )}
        </AnimatePresence>

        <Toaster
          toastOptions={{
            duration: 5000,
          }}
        />
      </I18nProvider>
    </QueryClientProvider>
  )
}

export const PageContextProvider = ({
  pageContext,
  children,
}: {
  pageContext: PageContext
  children: React.ReactNode
}) => {
  return (
    <Context.Provider
      value={{
        ...pageContext,
      }}
    >
      <Provider pageContext={pageContext}>{children}</Provider>
    </Context.Provider>
  )
}
