import { useState } from 'react'

import { Button, Checkbox, Input } from '@olufy-frontend/shared/UI'
import type { ButtonRounder, ButtonSize, ButtonVariant } from '@olufy-frontend/shared/UI/Button/types'

const varaints: ButtonVariant[] = [
  'default',
  'primary',
  'success',
  'error',
  'info',
  'warning',
  'primary-solid',
  'danger',
  'purple',
]

const rounders: ButtonRounder[] = ['default', 'full', 'none', 'sm', 'lg', 'xl', '2xl', '3xl']

const sizes: ButtonSize[] = ['default', 'medium', 'small']

const ButtonTypeDefault = () => {
  // _State
  const [varaint, setVaraint] = useState<ButtonVariant>('primary')
  const [rounder, setRounder] = useState<ButtonRounder>('lg')
  const [size, setSize] = useState<ButtonSize>('default')
  const [isOutline, setIsOutline] = useState<boolean>(false)
  const [isInvert, setIsInvert] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-1 flex-col items-center self-stretch">
      <div className="w-full p-2">
        <div className="flex flex-wrap gap-2 rounded-md bg-white-600 p-2 dark:bg-dark-400">
          <div>
            <div className="text-body-14">variant</div>
            <Input.Select
              value={varaint}
              onChange={(e) => {
                const value = e.target.value as ButtonVariant
                setVaraint(value)
              }}
            >
              {varaints.map((item, itemIdx) => (
                <option key={`varaint-${itemIdx}`}>{item}</option>
              ))}
            </Input.Select>
          </div>
          <div>
            <div className="text-body-14">isOutline</div>
            <Checkbox
              checked={isOutline}
              onChange={() => {
                setIsOutline((e) => !e)
                setIsInvert(false)
              }}
            />
          </div>
          <div>
            <div className="text-body-14">isInvert</div>
            <Checkbox
              checked={isInvert}
              onChange={() => {
                setIsInvert((e) => !e)
                setIsOutline(false)
              }}
            />
          </div>
          <div>
            <div className="text-body-14">rounder</div>
            <Input.Select
              value={rounder}
              onChange={(e) => {
                const value = e.target.value as ButtonRounder
                setRounder(value)
              }}
            >
              {rounders.map((item, itemIdx) => (
                <option key={`rounder-${itemIdx}`}>{item}</option>
              ))}
            </Input.Select>
          </div>
          <div>
            <div className="text-body-14">size</div>
            <Input.Select
              value={size}
              onChange={(e) => {
                const value = e.target.value as ButtonSize
                setSize(value)
              }}
            >
              {sizes.map((item, itemIdx) => (
                <option key={`size-${itemIdx}`}>{item}</option>
              ))}
            </Input.Select>
          </div>
          <div>
            <div className="text-body-14">disabled</div>
            <Checkbox
              checked={disabled}
              onChange={() => {
                setDisabled((e) => !e)
              }}
            />
          </div>
          <div>
            <div className="text-body-14">loading</div>
            <Checkbox
              checked={isLoading}
              onChange={() => {
                setIsLoading((e) => !e)
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Button
          variant={varaint}
          isOutline={isOutline}
          isInvert={isInvert}
          rounder={rounder}
          size={size}
          disabled={disabled}
          loading={isLoading}
        >
          Button
        </Button>
      </div>
    </div>
  )
}

export default ButtonTypeDefault
