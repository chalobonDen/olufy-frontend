import { format } from 'date-fns'
import { th, enUS } from 'date-fns/locale'

import { useSettingStore } from '@/stores/setting'

import { Language } from '@/enums'

export const formatDate = (value: Date | number, f = 'dd/MM/yyyy HH:mm') => {
  let locale = enUS

  switch (useSettingStore.getState().lang) {
    case Language.TH:
      locale = th
      break

    default:
      locale = enUS
      break
  }

  return format(value, f, {
    locale,
  })
}
