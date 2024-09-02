import { useEffect, useMemo, useRef } from 'react'

import { COOKIE_CONSENT_CONFIG, DEFAULT_LANG } from '@/constants'

import { useSetting } from './stores/useSetting'

import type { Language } from '@/enums'
import type { CookieConsent } from '@/types/cookie-consent'

import '@/libs/cookieconsent/index.cjs'
import '@/libs/cookieconsent/styles.css'

const useCookieConsent = () => {
  const { lang } = useSetting()
  const cookieConsentRef = useRef<CookieConsent>()
  const firstLangRef = useRef<Language | null>(lang)

  // _Memo
  const language = useMemo(() => {
    if (!lang) return DEFAULT_LANG.split('_')[0]
    return lang.split('_')[0]
  }, [lang])

  // _Effect

  useEffect(() => {
    if (!!cookieConsentRef.current) return
    document.getElementById('cc_div')?.remove()
    document.body.classList.add('theme_turquoise')
    const cookieConsent = window.initCookieConsent()
    cookieConsent.run({
      ...COOKIE_CONSENT_CONFIG,
      current_lang: language,
    })
    cookieConsentRef.current = cookieConsent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!firstLangRef.current?.includes(language)) {
      cookieConsentRef.current.updateLanguage(language, true)
      firstLangRef.current = null
    }
  }, [language])

  return null
}

export default useCookieConsent
