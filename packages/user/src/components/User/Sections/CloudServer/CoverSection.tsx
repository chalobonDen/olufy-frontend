import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import UserCover from '@/components/UI/User/Cover'
import UserContainer from '@/components/UI/User/Container'

const UserCloudServerCoverSection = () => {
  const { i18n } = useLingui()

  return (
    <UserCover title={i18n._(t`Cloud Server`)}>
      <UserContainer
        className={clsx(
          `pointer-events-none absolute inset-0`,
          `lg:inset-auto lg:left-1/2 lg:top-0 lg:h-full lg:w-[1280px] lg:max-w-[1280px] lg:-translate-x-1/2`,
          `sm:hidden`,
        )}
      >
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute left-[180px] top-4 w-[222px]`)} />
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute right-[40px] top-16 w-[181px]`)} />
        <img src="/images/clouds/cloud-08.svg" className={clsx(`absolute bottom-14 left-[50px] w-[130px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-90px] right-[-125px] w-[656px]`)} />
      </UserContainer>
    </UserCover>
  )
}

export default UserCloudServerCoverSection
