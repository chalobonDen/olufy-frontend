import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import UserCover from '@/components/UI/User/Cover'
import UserContainer from '@/components/UI/User/Container'

const UserContactCoverSection = () => {
  const { i18n } = useLingui()

  return (
    <UserCover title={i18n._(t`Contact`)} description={i18n._(t`อย่าลังเลที่จะติดต่อเรา`)}>
      <UserContainer
        className={clsx(
          `pointer-events-none absolute inset-0`,
          `lg:inset-auto lg:left-1/2 lg:top-0 lg:h-full lg:w-[1280px] lg:max-w-[1280px] lg:-translate-x-1/2`,
          `sm:hidden`,
        )}
      >
        <img src="/images/clouds/cloud-10.svg" className={clsx(`absolute right-[150px] top-0 w-[353px]`)} />
        <img src="/images/clouds/cloud-09.svg" className={clsx(`absolute left-[250px] top-[50px]  w-[195px]`)} />
        <img src="/images/clouds/cloud-05.svg" className={clsx(`absolute bottom-[-160px] left-[-180px] w-[732px]`)} />
        <img src="/images/clouds/cloud-06.svg" className={clsx(`absolute bottom-[-130px] right-[-320px] w-[740px]`)} />
      </UserContainer>
    </UserCover>
  )
}

export default UserContactCoverSection
