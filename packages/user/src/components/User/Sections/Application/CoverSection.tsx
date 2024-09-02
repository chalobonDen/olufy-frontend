import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import UserCover from '@/components/UI/User/Cover'
import UserContainer from '@/components/UI/User/Container'

const UserApplicationCoverSection = () => {
  const { i18n } = useLingui()
  return (
    <UserCover
      title={i18n._(t`Application`)}
      description={i18n._(
        t`เราให้บริการปรึกษาไอเดีย และโปรเจ็คเพื่อให้คุณมีมุมมองใหม่ๆ เกี่ยวกับโปรเจ็คของคุณเราคอยช่วย เหลือส่วนที่เกี่ยวข้องต่างๆ เพื่อทำให้สิ่งที่เป็นไปไม่ได้เป็นไปได้ติดต่อเราให้เราทำงานในส่วนที่คุณต้องการที่สุด`,
      )}
    >
      <UserContainer
        className={clsx(
          `pointer-events-none absolute inset-0`,
          `lg:inset-auto lg:left-1/2 lg:top-0 lg:h-full lg:w-[1280px] lg:max-w-[1280px] lg:-translate-x-1/2`,
          `sm:hidden`,
        )}
      >
        <img src="/images/clouds/cloud-01.svg" className={clsx(`absolute right-[137px] top-[42px] w-[181px]`)} />
        <img src="/images/clouds/cloud-05.svg" className={clsx(`absolute bottom-[-70px] left-[-570px] w-[732px]`)} />
        <img src="/images/clouds/cloud-11.svg" className={clsx(`absolute bottom-[-96px] right-[-620px] w-[790px]`)} />
      </UserContainer>
    </UserCover>
  )
}

export default UserApplicationCoverSection
