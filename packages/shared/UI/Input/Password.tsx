import type { ReactNode } from 'react'
import { useState, forwardRef, useMemo } from 'react'

import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

import type { InputRef, InputProps } from './Input'
import Input from './Input'

type PasswordInputProps = Omit<InputProps, 'suffix'> & {
  iconRender?: (visible: boolean) => ReactNode
}

const defaultIconRender = (visible: boolean): React.ReactNode => (visible ? <IoEyeOutline /> : <IoEyeOffOutline />)

const PasswordInput = forwardRef<InputRef, PasswordInputProps>(({ iconRender, ...props }, ref) => {
  // _State
  const [visible, setVisible] = useState<boolean>(false)

  // _Memo
  const renderIcon = useMemo(() => {
    return (
      <span className="cursor-pointer" onClick={() => setVisible((e) => !e)}>
        {!!iconRender ? iconRender(visible) : defaultIconRender(visible)}
      </span>
    )
  }, [iconRender, visible])

  return <Input ref={ref} {...props} type={visible ? 'text' : 'password'} suffix={renderIcon} />
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
