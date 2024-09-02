import type { FC } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import UserContainer from '@/components/UI/User/Container'

import DefaultLayout from '../Default'
import type { IDefaultLayoutProps } from '../Default/types'

interface ILoginLayoutProps extends IDefaultLayoutProps {}

const LoginLayout: FC<ILoginLayoutProps> = ({ children, isTopFooter, ...props }) => {
  const { i18n } = useLingui()

  return (
    <DefaultLayout isTopFooter={false} {...props}>
      <section className={clsx(`relative overflow-hidden`)}>
        <div className={clsx(`absolute inset-0 z-0`)}>
          <div className={clsx([`absolute h-full w-1/2 overflow-hidden bg-primary-500`, `lg:hidden`])}>
            <div
              className={clsx([
                `pointer-events-none absolute bottom-0 right-0 h-[480px] w-[640px]`,
                `xl:right-1/2 xl:translate-x-1/2`,
                `lg:hidden`,
              ])}
            >
              <img
                src="/images/clouds/cloud-01.svg"
                className={clsx(`pointer-events-none absolute right-[115px] top-[115px] w-[105px]`)}
              />
              <img
                src="/images/clouds/cloud-08.svg"
                className={clsx(`pointer-events-none absolute right-[193px] top-[32px] w-[100px]`)}
              />
              <img
                src="/images/clouds/cloud-rocket-02.svg"
                className={clsx(`pointer-events-none absolute bottom-[-50px] left-[-10px] w-full scale-105`)}
              />
              <img
                src="/images/clouds/cloud-01.svg"
                className={clsx(`pointer-events-none absolute left-[180px] top-[80px] w-[125px]`)}
              />
              <img
                src="/images/clouds/cloud-08.svg"
                className={clsx(`pointer-events-none absolute left-[175px] top-[230px] w-[74px]`)}
              />
            </div>
          </div>
        </div>
        <UserContainer className={clsx(`relative z-10 grid grid-cols-2`, `lg:grid-cols-1`)}>
          {/* Left */}
          <div
            className={clsx(
              `relative min-h-[87vh] px-10 pt-20 text-center text-white-900`,
              `2xl:px-4`,
              `lg:hidden lg:min-h-[auto] lg:pt-10 lg:text-dark-500`,
            )}
          >
            <h2 className={clsx(`text-header-1`, `2xl:text-header-2`, `lg:text-header-3`)}>
              {i18n._(t`Lorem ipsum dolor sit amet consectetur.`)}
            </h2>
            <p className={clsx(`mt-2`)}>
              {i18n._(
                t`Lorem ipsum dolor sit amet consectetur. Lectus id enim molestie vitae viverra. Sem enim integer mi hendrerit aliquet.`,
              )}
            </p>
          </div>

          {/* Right */}
          <div className={clsx(`flex items-center justify-center p-8`, `lg:px-0`)}>{children}</div>
        </UserContainer>
      </section>
    </DefaultLayout>
  )
}

export default LoginLayout
