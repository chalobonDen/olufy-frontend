import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import UserContainer from '@/components/UI/User/Container'
import UserCover from '@/components/UI/User/Cover'

const UserCdnCoverSection = () => {
  const { i18n } = useLingui()
  return (
    <UserCover title={i18n._(t`CDN`)} description="Content delivery network">
      <UserContainer
        className={clsx(
          `pointer-events-none absolute inset-0`,
          `lg:inset-auto lg:left-1/2 lg:top-0 lg:h-full lg:w-[1280px] lg:max-w-[1280px] lg:-translate-x-1/2`,
          `sm:hidden`,
        )}
      >
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute bottom-[140px] left-[-20px] w-[119px]`)} />
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute bottom-[140px] right-[-20px] w-[119px]`)} />
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute bottom-[120px] left-[280px] w-[97px]`)} />
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute bottom-[120px] right-[280px] w-[97px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] left-[-275px] w-[547px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] right-[570px] w-[547px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] right-[128px] w-[547px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] right-[-342px] w-[547px]`)} />
      </UserContainer>
    </UserCover>
  )
}

export default UserCdnCoverSection
