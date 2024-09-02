import type { FC, HTMLAttributes } from 'react'
import { useRef, useState, Fragment } from 'react'

import type { Placement } from '@floating-ui/react'
import { Float } from '@headlessui-float/react'
import clsx from 'clsx'

import './styles.scss'

interface ITooltipProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  placement?: Placement
  offset?: number
}

const useHoverMenu = (delay = 150) => {
  const [show, setShow] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function open() {
    if (timer.current !== null) {
      clearTimeout(timer.current)
      timer.current = null
    }
    setShow(true)
  }

  function close() {
    setShow(false)
  }

  function delayClose() {
    timer.current = setTimeout(() => {
      setShow(false)
    }, delay)
  }

  return { show, setShow, timer, open, close, delayClose }
}

const Tooltip: FC<ITooltipProps> = ({ children, title, className, placement = 'top', offset = 5, onClick }) => {
  const { show, open, delayClose } = useHoverMenu()

  return (
    <Fragment>
      <Float as={Fragment} show={show} portal placement={placement} offset={offset}>
        <div onMouseEnter={open} onMouseLeave={delayClose} className={className} onClick={onClick}>
          {children}
        </div>
        <div className={clsx(`tooltip`)}>
          <span>{title}</span>
        </div>
      </Float>
    </Fragment>
  )
}

export default Tooltip
