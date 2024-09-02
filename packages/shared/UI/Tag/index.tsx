import type { FC, HTMLAttributes } from 'react'

import clsx from 'clsx'

import './styles.scss'

export type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'danger' | 'dark'

interface ITagProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TagVariant
  isSolid?: boolean
}

const Tag: FC<ITagProps> = ({ variant, isSolid, children, className }) => {
  return (
    <div
      className={clsx(
        `tag`,
        [
          `${variant}`,
          {
            'is-solid': isSolid,
          },
        ],
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Tag
