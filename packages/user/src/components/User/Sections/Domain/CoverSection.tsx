import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'

import UserCover from '@/components/UI/User/Cover'
import UserContainer from '@/components/UI/User/Container'

const UserDomainCoverSection = () => {
  const { i18n } = useLingui()
  return (
    <UserCover
      title={i18n._(t`Domain`)}
      description={i18n._(t`Touch the success! Domain and Secure Web Hosting from 350฿ per month.`)}
    >
      <UserContainer
        className={clsx(
          `pointer-events-none absolute inset-0`,
          `lg:inset-auto lg:left-1/2 lg:top-0 lg:h-full lg:w-[1280px] lg:max-w-[1280px] lg:-translate-x-1/2`,
          `sm:hidden`,
        )}
      >
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute left-[90px] top-[42px] w-[130px]`)} />
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute right-[365px] top-[8px] w-[222px]`)} />
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute left-[137px] top-[180px] w-[181px]`)} />

        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-68px] left-[-535px] w-[547px]`)} />
        <img
          src="/images/clouds/cloud-rocket-03.svg"
          className={clsx(`absolute bottom-[-62px] right-[-230px] w-[617px]`)}
        />
      </UserContainer>
    </UserCover>
  )
}

export default UserDomainCoverSection
