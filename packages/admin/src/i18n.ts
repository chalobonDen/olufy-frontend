import { useEffect } from 'react'

import { i18n } from '@lingui/core'

import { Language } from './enums'
import { useSetting } from './hooks/stores/useSetting'
import { usePageContext } from './hooks/usePageContext'

export const getInitMessagesI18n = async (locale: string = Language.TH) => {
  const { messages } = await import(`./locales/${locale}.po`)
  return messages
}

export const useLinguiInit = () => {
  const { initMessagesI18n } = usePageContext()
  const { lang: locale } = useSetting()
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
