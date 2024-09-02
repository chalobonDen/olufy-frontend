import type { FC } from 'react'
import { useMemo } from 'react'

import clsx from 'clsx'
import { IoMoon, IoSunny } from 'react-icons/io5'

import { useSettingStore } from '@/stores/setting'
import { useSetting } from '@/hooks/stores/useSetting'

import { Theme } from '@/enums'

interface IThemeToggleButtonProps {
  className?: string
}

const ThemeToggleButton: FC<IThemeToggleButtonProps> = ({ className }) => {
  const { theme } = useSetting()
  const { toggleTheme } = useSettingStore()

  // _Memo
  const isDark = useMemo(() => theme === Theme.DARK, [theme])

  return (
    <div className={clsx([className, `cursor-pointer rounded-full`, `relative`])} onClick={() => toggleTheme()}>
      {isDark ? <IoMoon className={clsx(`square-6`)} /> : <IoSunny className={clsx(`square-6`)} />}
    </div>
  )
}

export default ThemeToggleButton
