import type { DocumentProps } from '@/renderer/types'

import { ENV } from './env'

import { Language, Theme } from '@/enums'

export const APP_NAME = 'Olufy Admin'

// SEO
export const DEFAULT_SEO_HEADER: DocumentProps = {
  title: APP_NAME,
  description: `${APP_NAME}...`,
  image: `/images/feature.jpg`,
}

// Setting
export const DEFAULT_THEME = Theme.LIGHT
export const DEFAULT_LANG = Language.TH

// Language
export const LOCALES = {
  [Language.TH]: 'ไทย',
  [Language.EN]: 'English',
}

// Other
export const IS_PRODUCTION = ENV.VITE_PUBLIC_ENV === 'production'
