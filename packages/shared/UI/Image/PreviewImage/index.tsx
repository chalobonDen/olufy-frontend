import type { FC, HTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'

import './styles.scss'

interface IPreviewImageProps extends HTMLAttributes<HTMLDivElement> {
  img?: string
  hoverIcon?: ReactNode
  objectFit?: 'cover' | 'contain'
}

const PreviewImage: FC<IPreviewImageProps> = ({
  className,
  img,
  hoverIcon,
  children,
  objectFit = 'contain',
  ...props
}) => {
  return (
    <div
      className={clsx(`preview-image`, objectFit, className)}
      style={{
        backgroundImage: `url(${img})`,
      }}
      {...props}
    >
      {hoverIcon || <div className={clsx(`icon`)}></div>}
      {children}
    </div>
  )
}

export default PreviewImage
