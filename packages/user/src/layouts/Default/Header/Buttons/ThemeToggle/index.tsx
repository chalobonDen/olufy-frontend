import type { FC } from 'react'
import { useMemo } from 'react'

import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { AnimatePresence, motion } from 'framer-motion'

import { useSettingStore } from '@/stores/setting'
import { useSetting } from '@/hooks/stores/useSetting'

import { Theme } from '@/enums'

interface IThemeToggleButtonProps {
  className?: string
}

const SvgIconMotion = motion(SvgIcon)

const ThemeToggleButton: FC<IThemeToggleButtonProps> = ({ className }) => {
  const { theme } = useSetting()
  const { toggleTheme } = useSettingStore()

  // _Memo
  const isDark = useMemo(() => theme === Theme.DARK, [theme])

  return (
    <div
      className={clsx([
        className,
        `h-10 w-[75px]`,
        `cursor-pointer rounded-full`,
        `relative`,
        {
          'bg-primary-500': !isDark,
          'bg-dark-300': isDark,
        },
        `lg:h-8 lg:w-[60px]`,
        `se:w-8`,
      ])}
      onClick={() => toggleTheme()}
    >
      <AnimatePresence mode="wait">
        {isDark && (
          <SvgIconMotion
            key="theme-dark"
            name="theme-moon"
            initial={{ opacity: 0, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, x: 0, y: '-50%' }}
            exit={{ opacity: 0, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.125, ease: 'easeInOut' }}
            className={clsx(`absolute right-1 top-1/2 -translate-y-1/2 square-8`, `lg:square-6`)}
          />
        )}
        {!isDark && (
          <SvgIconMotion
            key="theme-light"
            name="theme-sun"
            initial={{ opacity: 0, x: '50%', y: '-50%' }}
            animate={{ opacity: 1, x: 0, y: '-50%' }}
            exit={{ opacity: 0, x: '50%', y: '-50%' }}
            transition={{ duration: 0.125, ease: 'easeInOut' }}
            className={clsx(`absolute left-1 top-1/2 -translate-y-1/2 square-8`, `lg:square-6`)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeToggleButton
