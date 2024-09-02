import type { FC, HTMLAttributes } from 'react'

import clsx from 'clsx'

interface IModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

const Footer: FC<IModalFooterProps> = ({ children, className }) => {
  return <div className={clsx(`modal-footer`, className)}>{children}</div>
}

export default Footer
