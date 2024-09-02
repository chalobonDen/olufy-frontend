import { Fragment } from 'react'

import { Dropdown } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { Menu } from '@headlessui/react'

import { useSetting } from '@/hooks/stores/useSetting'
import { useSettingStore } from '@/stores/setting'
import { LOCALES } from '@/constants'

import type { Language } from '@/enums'

const ChangeLangButton = () => {
  const { lang } = useSetting()
  const { setLang } = useSettingStore()

  return (
    <Dropdown
      button={
        <div className={clsx(`min-w-[28px]`, `se:inline-block se:max-w-[38px] se:truncate`)}>{LOCALES[lang]}</div>
      }
      buttonProps={{
        size: 'small',
        className: clsx(`!px-2 bg-white-700`, `dark:bg-dark-300`),
      }}
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
  )
}

export default ChangeLangButton
