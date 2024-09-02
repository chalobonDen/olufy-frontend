import type { FC } from 'react'
import { useState, useEffect } from 'react'

import { Button } from '@olufy-frontend/shared/UI'
import { IoCheckmark, IoCopyOutline } from 'react-icons/io5'
import { useCopyToClipboard } from 'usehooks-ts'
import clsx from 'clsx'

interface ICopyButtonProps {
  value: string
  className?: string
}

const CopyButton: FC<ICopyButtonProps> = ({ value, className }) => {
  const [, copy] = useCopyToClipboard()

  // _State
  const [hasCopied, setHasCopied] = useState(false)

  // _Effect
  useEffect(() => {
    const timeout = setTimeout(() => setHasCopied(false), 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [hasCopied])

  return (
    <Button
      buttonType="icon"
      size="small"
      className={clsx(className)}
      onClick={() => {
        if (!hasCopied) {
          copy(value)
          setHasCopied(true)
        }
      }}
    >
      {hasCopied ? (
        <IoCheckmark className={clsx(`text-white-900 !square-4`)} />
      ) : (
        <IoCopyOutline className={clsx(`text-white-900 !square-4`)} />
      )}
    </Button>
  )
}

export default CopyButton
