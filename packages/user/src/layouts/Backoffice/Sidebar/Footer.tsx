import { Fragment } from 'react'

import { Dropdown, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { Menu } from '@headlessui/react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { AnimatePresence, motion } from 'framer-motion'

import { useSetting } from '@/hooks/stores/useSetting'
import { useSettingStore } from '@/stores/setting'
import { LOCALES } from '@/constants'

import type { Language } from '@/enums'

const BackofficeLayoutSidebarFooter = () => {
  const { i18n } = useLingui()
  const { lang, theme } = useSetting()
  const { setLang, toggleTheme } = useSettingStore()

  return (
    <Fragment>
      <Dropdown
        button={
          <div className={clsx(`desc flex w-full items-center justify-start space-x-2 text-white-900`)}>
            <SvgIcon name="world" className={clsx(`square-8`)} />
            <span>
              {i18n._(t`ภาษา :`)} {LOCALES[lang]}
            </span>
          </div>
        }
        buttonProps={{
          className: clsx(`w-full border border-dark-200 !px-3`),
        }}
        className={clsx(`w-full`)}
        items={
          <Fragment>
            {Object.entries(LOCALES).map(([key, value], itemIdx) => (
              <Menu.Item key={`${itemIdx}-${key}`}>
                {() => (
                  <button
                    className={clsx(`dropdown-dialog-item !min-h-[0px] !w-[100px]`, { active: key === lang })}
                    onClick={() => setLang(key as Language)}
                  >
                    <span>{value}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </Fragment>
        }
      />

      <div className={clsx(`relative mt-2 flex h-12 items-center overflow-hidden rounded-lg border border-dark-200`)}>
        <AnimatePresence>
          <motion.div
            animate={theme}
            variants={{
              light: { x: 0 },
              dark: { x: '100%' },
            }}
            transition={{ duration: 0.3 }}
            className={clsx(`absolute z-0 !ml-0 h-12 w-[calc(50%)] self-start bg-dark-200`)}
          ></motion.div>
        </AnimatePresence>
        <div
          className={clsx(`z-10 flex flex-1 cursor-pointer items-center space-x-2 px-3 text-white-900`)}
          onClick={() => (theme === 'dark' ? toggleTheme() : null)}
        >
          <SvgIcon name="theme-sun" className={clsx(`square-8`)} />
          <span>{i18n._(t`Light`)}</span>
        </div>
        <div
          className={clsx(`z-10 flex flex-1 cursor-pointer items-center space-x-2 px-3 text-white-900`)}
          onClick={() => (theme === 'light' ? toggleTheme() : null)}
        >
          <SvgIcon name="theme-moon" className={clsx(`square-8`)} />
          <span>{i18n._(t`Dark`)}</span>
        </div>
      </div>
    </Fragment>
  )
}

export default BackofficeLayoutSidebarFooter
