import { useEffect, useMemo, useState } from 'react'

import { useSettingStore } from '@/stores/setting'
import { getSettingSsr } from '@/stores/setting/utils'

import { usePageContext } from '../usePageContext'

export const useSetting = () => {
  const { cookie } = usePageContext()
  const data = getSettingSsr(cookie)
  const { theme: _theme, lang: _lang, isLangLoading: _isLangLoading } = useSettingStore()

  // _State
  const [theme, setTheme] = useState(data?.theme)
  const [lang, setLang] = useState(data?.lang)
  const [isLangLoading, setIsLandLoading] = useState(true)

  // _Effect
  useEffect(() => setLang(_lang), [_lang])
  useEffect(() => setTheme(_theme), [_theme])
  useEffect(() => setIsLandLoading(_isLangLoading), [_isLangLoading])

  return useMemo(
    () => ({
      theme,
      lang,
      isLangLoading,
    }),
    [theme, lang, isLangLoading],
  )
}
