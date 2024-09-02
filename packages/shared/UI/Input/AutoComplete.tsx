import { forwardRef, Fragment, useState } from 'react'

import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { Float } from '@headlessui-float/react'

import { useIsMounted } from '../../hooks'
import type { InputProps } from './Input'
import Input from './Input'

export interface IAutoCompleteItem<T = any> {
  data: T
  label: string
  value: string
}

interface IAutoCompleteProps extends InputProps {
  items: IAutoCompleteItem[]
  emptyMsg?: string
  onSelected?: (e: any) => void
}

const AutoComplete = forwardRef<HTMLInputElement, IAutoCompleteProps>(
  ({ items, onChange, onSelected, emptyMsg = 'Nothing found.', ...props }, ref) => {
    const [selected, setSelected] = useState(null)
    const { isMounted } = useIsMounted()

    return (
      <Fragment>
        {!isMounted ? (
          <div className={clsx(`input`)}>
            <input disabled />
          </div>
        ) : (
          <Combobox
            value={selected}
            onChange={(e) => {
              setSelected(e)
              onSelected?.(e)
            }}
          >
            {() => {
              return (
                <Fragment>
                  <Float
                    placement={'bottom'}
                    offset={3}
                    shift={5}
                    flip={5}
                    enter="dropdown-transition-enter"
                    enterFrom="dropdown-transition-enter-from"
                    enterTo="dropdown-transition-enter-to"
                    leave="dropdown-transition-leave"
                    leaveFrom="dropdown-transition-leave-from"
                    leaveTo="dropdown-transition-leave-to"
                    tailwindcssOriginClass
                    className={clsx(`autocomplete-wrapper`)}
                  >
                    <Combobox.Input
                      ref={ref}
                      as={Input}
                      onChange={(event) => {
                        onChange?.(event)
                      }}
                      {...props}
                    />
                    <Combobox.Options>
                      {items.length === 0 ? (
                        <div className="">{emptyMsg}</div>
                      ) : (
                        items.map((item, itemIdx) => (
                          <Combobox.Option
                            key={itemIdx}
                            value={item}
                            className={({ active }) =>
                              clsx({
                                active,
                              })
                            }
                          >
                            {item.label}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Float>
                </Fragment>
              )
            }}
          </Combobox>
        )}
      </Fragment>
    )
  },
)
AutoComplete.displayName = 'AutoCompleteInput'

export default AutoComplete
