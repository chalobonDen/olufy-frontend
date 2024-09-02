import { useEffect, useMemo, useState } from 'react'

import { useSettingStore } from '@/stores/setting'
import { DEFAULT_THEME } from '@/constants'

export const useSetting = () => {
  const { theme: _theme } = useSettingStore()

  // _State
  const [theme, setTheme] = useState(DEFAULT_THEME)

  // _Effect
  useEffect(() => setTheme(_theme), [_theme])

  return useMemo(
    () => ({
      theme,
    }),
    [theme],
  )
}
