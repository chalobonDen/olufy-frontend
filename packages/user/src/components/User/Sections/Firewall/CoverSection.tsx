import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import UserCover from '@/components/UI/User/Cover'
import UserContainer from '@/components/UI/User/Container'

const UserFirewallCoverSection = () => {
  const { i18n } = useLingui()
  return (
    <UserCover title={i18n._(t`Firewall`)}>
      <UserContainer
        className={clsx(
          `pointer-events-none absolute inset-0`,
          `lg:inset-auto lg:left-1/2 lg:top-0 lg:h-full lg:w-[1280px] lg:max-w-[1280px] lg:-translate-x-1/2`,
          `sm:hidden`,
        )}
      >
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute right-[137px] top-[42px] w-[181px]`)} />
        <img src="/images/clouds/cloud-08.svg" className={clsx(`absolute bottom-[-32px] left-[240px] w-[130px]`)} />
        <img src="/images/clouds/cloud-03.svg" className={clsx(`absolute bottom-[42px] left-[-365px] w-[547px]`)} />
        <img src="/images/clouds/cloud-04.svg" className={clsx(`absolute bottom-[42px] right-[-550px] w-[622px]`)} />
      </UserContainer>
    </UserCover>
  )
}

export default UserFirewallCoverSection
