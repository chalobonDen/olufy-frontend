import clsx from 'clsx'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import UserContainer from '@/components/UI/User/Container'
import UserCover from '@/components/UI/User/Cover'

const UserNewsCoverSection = () => {
  const { i18n } = useLingui()
  return (
    <UserCover title={i18n._(t`ข่าวสาร`)}>
      <UserContainer
        className={clsx(
          `pointer-events-none absolute inset-0`,
          `lg:inset-auto lg:left-1/2 lg:top-0 lg:h-full lg:w-[1280px] lg:max-w-[1280px] lg:-translate-x-1/2`,
          `sm:hidden`,
        )}
      >
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute bottom-[140px] left-[180px] w-[181px]`)} />
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute right-[360px] top-[10px] w-[222px]`)} />
        <img src="/images/clouds/cloud-08.svg" className={clsx(`absolute left-[120px] top-[40px] w-[130px]`)} />
        <img
          src="/images/clouds/cloud-rocket-03.svg"
          className={clsx(`absolute right-[-34px] top-[120px] w-[617px]`)}
        />

        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] left-[-275px] w-[547px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] right-[570px] w-[547px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] right-[128px] w-[547px]`)} />
        <img src="/images/clouds/cloud-02.svg" className={clsx(`absolute bottom-[-70px] right-[-342px] w-[547px]`)} />
      </UserContainer>
    </UserCover>
  )
}

export default UserNewsCoverSection
