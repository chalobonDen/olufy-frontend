import type { DocumentProps } from '@/renderer/types'

import { ENV } from './env'

import { Language, Theme } from '@/enums'

export const APP_NAME = 'Olufy'

// SEO
export const DEFAULT_SEO_HEADER: {
  [key in Language]: DocumentProps
} = {
  [Language.TH]: {
    title: APP_NAME,
    description: `เราคือผู้ให้บริการที่มีประสบการณ์ด้านเซิร์ฟเวอร์และเทคโนโลยี ทุกสิ่งที่เราให้บริการถูกคัดสรรอย่างดีที่สุด`,
    image: `/images/feature.jpg`,
  },
  [Language.EN]: {
    title: APP_NAME,
    description: `We are the most effective servant with a lot of services and technological experiences. All you need is what we can provide.`,
    image: `/images/feature.jpg`,
  },
}

// Setting
export const DEFAULT_THEME = Theme.LIGHT
export const DEFAULT_LANG = Language.TH

// Language
export const LOCALES = {
  [Language.TH]: 'ไทย',
  [Language.EN]: 'English',
}

// Verification
export const CALLBACK_URL_VERIFY_EMAIL = '/app/settings/profile/verify-email'

// Other
export const IS_PRODUCTION = ENV.VITE_PUBLIC_ENV === 'production'

export const RETURN_PAGE_SEARCH_KEY = 'callbackUrl'
