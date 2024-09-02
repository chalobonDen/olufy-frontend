import type { FC } from 'react'

import clsx from 'clsx'

import SvgIcon from '../SvgIcon'

import './styles.scss'

export interface ILoaderProps {
  size?: number
  className?: string
}

const Loader: FC<ILoaderProps> = ({ size = 16, className }) => {
  return (
    <div
      className={clsx(`loader`, className)}
      style={{
        fontSize: size,
      }}
    >
      <SvgIcon name="loader" className="loader-icon" />
    </div>
  )
}

export default Loader
