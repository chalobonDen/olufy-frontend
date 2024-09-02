import type { FC, SelectHTMLAttributes } from 'react'
import { useEffect } from 'react'

import { Input } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import { DEFAULT_LANG, LOCALES } from '@/constants'

interface ILanguageSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  getDefaultValue?: (value: string) => void
}

const LanguageSelect: FC<ILanguageSelectProps> = ({ className, getDefaultValue, ...props }) => {
  const { i18n } = useLingui()

  // _Effect
  useEffect(() => {
    getDefaultValue?.(DEFAULT_LANG)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={clsx(className || `flex items-center space-x-2`)}>
      <span>{i18n._(t`ภาษา`)} :</span>
      <Input.Select {...props}>
        {Object.entries(LOCALES).map(([key, value], itemIdx) => (
          <option key={`${itemIdx}-${key}`} value={key}>
            {value}
          </option>
        ))}
      </Input.Select>
    </div>
  )
}

export default LanguageSelect
