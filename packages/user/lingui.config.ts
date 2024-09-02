import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  locales: ['default', 'en_US', 'th_TH'],
  sourceLocale: 'default',
  fallbackLocales: {
    default: 'th',
  },
  catalogs: [
    {
      path: 'src/locales/{locale}',
      include: ['src'],
    },
  ],
}

export default config
