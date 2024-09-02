import type { FC } from 'react'

import clsx from 'clsx'

import LogoTextSvg from '../../assets/logo-text.svg'
import LogoImage from '../../assets/logo.png'

import './styles.scss'

interface ILogoProps {
  imageClassName?: string
  textClassName?: string
  className?: string
  isShowText?: boolean
}

const Logo: FC<ILogoProps> = ({ className, imageClassName, textClassName, isShowText = true }) => {
  return (
    <div className={clsx(`logo`, className)}>
      <img src={LogoImage} className={clsx(`logo-img`, imageClassName)} />
      {isShowText && <img src={LogoTextSvg} className={clsx(`logo-text`, textClassName)} />}
    </div>
  )
}

export default Logo
