import type { FC } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { Logo } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'

import UserContainer from '@/components/UI/User/Container'
import { APP_NAME } from '@/constants'
import { useSetting } from '@/hooks/stores/useSetting'
import { USER_FOOTER_SOCIAL } from '@/constants/user/footer'
import { GET_USER_NAVBAR_CONFIG } from '@/constants/user/navbar'
import Link from '@/components/Link'

interface IFooterProps {
  isTopFooter?: boolean
}

const paymentImages = ['visa', 'mastercard', 'paypal']

const Footer: FC<IFooterProps> = ({ isTopFooter }) => {
  const { i18n } = useLingui()
  const { theme } = useSetting()

  return (
    <footer className={clsx(`bg-white-900`, `dark:bg-dark-400`)}>
      {/* Top Footer */}
      {isTopFooter && (
        <div className={clsx(`main-space-x`)}>
          <UserContainer className={clsx(`flex space-x-8 pb-10 pt-12`, `lg:flex-col lg:space-x-0 lg:space-y-8`)}>
            {/* Contact */}
            <div className={clsx(`flex-1`)}>
              <Link href="/">
                <Logo />
              </Link>

              <p className={clsx(`mt-6 max-w-[310px]`)}>
                {i18n._(
                  t`เราคือผู้ให้บริการที่มีประสบการณ์ด้านเซิร์ฟเวอร์และเทคโนโลยีทุกสิ่งที่เราให้บริการถูกคัดสรรอย่างดีที่สุด`,
                )}
              </p>

              <div className={clsx(`mt-8 text-header-3`)}>{i18n._(t`ติดตามเราได้ที่`)}</div>
              <div className={clsx(`mt-4 flex space-x-2`)}>
                {USER_FOOTER_SOCIAL.map((link, linkIdx) => {
                  const Icon = link.icon

                  return (
                    <Link
                      key={`social-link-${linkIdx}`}
                      href={link.path}
                      title={link.label}
                      className={clsx(
                        `inline-flex items-center justify-center rounded-full bg-white-900 shadow-01 square-8`,
                        `dark:bg-dark-200`,
                      )}
                    >
                      <Icon className={clsx(`text-primary-500 square-4`, `dark:text-white-900`)} />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div className={clsx(`w-1/3`, `lg:w-2/3`, `md:w-full`)}>
              <div className={clsx(`text-header-3`)}>{i18n._(t`บริการของเรา`)}</div>
              <div className={clsx(`mt-4 grid grid-cols-2 gap-4`)}>
                {GET_USER_NAVBAR_CONFIG().map((menu) =>
                  menu.items.map((item, itemIdx) => (
                    <Link href={item.path} key={`service-${itemIdx}`} className={clsx(`font-light`)}>
                      {item.label}
                    </Link>
                  )),
                )}
              </div>
            </div>

            {/* Payment */}
            <div>
              <div className={clsx(`text-header-3`)}>{i18n._(t`การชำระเงิน`)}</div>
              <div className={clsx(`mt-4 flex items-center space-x-3`)}>
                {paymentImages.map((img) => (
                  <img
                    key={img}
                    src={`/images/payment/${theme}/${img}.png`}
                    alt={`payment ${img} image`}
                    className={clsx(`overflow-hidden rounded-lg shadow-01`)}
                  />
                ))}
              </div>
            </div>
          </UserContainer>
        </div>
      )}

      {/* Copyright */}
      <div className={clsx(`main-space-x bg-primary-500 text-white-900`, `dark:bg-dark-200`)}>
        <UserContainer
          className={clsx(`flex items-center justify-between py-4 font-light`, `md:flex-col-reverse md:text-center`)}
        >
          <span className={clsx(`md:mt-2`, `sm:text-body-14`)}>
            Copyright {new Date().getFullYear()} {APP_NAME}. All Rights Reserved
          </span>
          <div className={clsx(`flex items-center space-x-6`)}>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </UserContainer>
      </div>
    </footer>
  )
}

export default Footer
