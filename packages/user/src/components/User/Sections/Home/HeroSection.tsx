import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import UserContainer from '@/components/UI/User/Container'

import HeroImage from '@/assets/images/pages/home/hero-image.png'

const UserHomeHeroSection = () => {
  const { i18n } = useLingui()

  return (
    <section className={clsx(`py-14`, `sm:py-12`)}>
      <UserContainer
        className={clsx([
          `flex items-center justify-center space-x-20`,
          `xl:space-x-5`,
          `sm:flex-col sm:space-x-0 sm:space-y-5 sm:text-center`,
        ])}
      >
        <div className={clsx(`flex-1 space-y-2`)}>
          <h1 className={clsx(`text-header-1`, `xl:text-header-2`, `lg:text-3xl`)}>
            {i18n._(t`ทุกสิ่งที่คุณต้องการอยู่ที่นี่`)}
          </h1>
          <p className={clsx([`max-w-[497px] text-body-20 font-light`, `xl:text-body-16 xl:font-light`])}>
            {i18n._(
              t`เราคือผู้ให้บริการที่มีประสบการณ์ด้านเซิร์ฟเวอร์และเทคโนโลยีทุกสิ่งที่เราให้บริการถูกคัดสรรอย่างดีที่สุด`,
            )}
          </p>
        </div>

        <img
          src={HeroImage}
          alt="hero section image"
          className={clsx(`pointer-events-none w-[547px]`, `xl:w-1/2`, `sm:w-full`)}
        />
      </UserContainer>
    </section>
  )
}

export default UserHomeHeroSection
