import { useEffect } from 'react'

import { i18n } from '@lingui/core'

import { DEFAULT_LANG } from './constants'
import { Language } from './enums'
import { getLanguageFull } from './stores/setting/utils'
import { usePageContext } from './hooks/usePageContext'

export const getInitMessagesI18n = async (locale: string = Language.TH) => {
  const fullLocale = getLanguageFull(locale as Language)
  const { messages } = await import(`./locales/${fullLocale}.po`)
  return messages
}

export const extractLocale = (url: string) => {
  const urlPaths = url.split('/')

  let locale = DEFAULT_LANG
  let urlWithoutLocale = url
  const firstPath = Object.values(Language).find((e) => e.includes(urlPaths[1])) as Language

  if (
    Object.values(Language)
      // .filter((locale) => locale !== DEFAULT_LANG)
      .includes(firstPath as Language)
  ) {
    locale = firstPath
    urlWithoutLocale = '/' + urlPaths.slice(2).join('/')
  } else {
    locale = DEFAULT_LANG
    urlWithoutLocale = url
  }

  return { locale: !firstPath ? undefined : locale, urlWithoutLocale }
}

export function useLinguiInit() {
  const { locale, initMessagesI18n } = usePageContext()
  const isClient = typeof window !== 'undefined'

  if (!isClient && locale !== i18n.locale) {
    // there is single instance of i18n on the server
    // note: on the server, we could have an instance of i18n per supported locale
    // to avoid calling loadAndActivate for (worst case) each request, but right now that's what we do
    i18n.loadAndActivate({ locale, messages: initMessagesI18n })
  }
  if (isClient && i18n.locale === undefined) {
    // first client render
    i18n.loadAndActivate({ locale, messages: initMessagesI18n })
  }

  useEffect(() => {
    const localeDidChange = locale !== i18n.locale
    if (localeDidChange) {
      i18n.loadAndActivate({ locale, messages: initMessagesI18n })
    }
  }, [locale, initMessagesI18n])

  return i18n
}
