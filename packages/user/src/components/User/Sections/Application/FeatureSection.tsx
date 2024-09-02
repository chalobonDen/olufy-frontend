import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserContainer from '@/components/UI/User/Container'
import UserCard from '@/components/UI/User/Card'
import Button from '@/components/Button'

const GET_LIST_TEXT = () => [
  t`PHP, MySQL, MSSQL, Access`,
  t`พัฒนาระบบได้ทุกต้องการ`,
  t`NodeJS, jQuery, Ajax, JavaScript`,
  t`ระบบร้านค้า, ระบบจองโรงแรม`,
  t`HTML5, CSS3, Canvas`,
  t`ระบบการเงินออนไลน์ (บัตรเครดิต)`,
  t`Front-end, Backend System`,
  t`ระบบร้านอาหาร, ระบบพิเศษใช้ในองค์กร`,
  t`ออกแบบได้ทุกรูปแบบที่ต้องการ`,
]

const UserApplicationFeatureSection = () => {
  const { i18n } = useLingui()

  return (
    <section className={clsx(`pb-20 pt-14`)}>
      <UserContainer>
        <div className={clsx(`grid grid-cols-2 gap-x-20 gap-y-6`, `md:grid-cols-1`, `lg:gap-x-4`)}>
          <div>
            <h3 className={clsx(`text-[40px] text-header-1 text-primary-500`, `lg:text-header-2`)}>
              {i18n._(t`เริ่มต้นสร้างเว็บไซต์`)}
            </h3>
            <p className={clsx(`desc mt-4 text-body-16`)}>{i18n._(t`ในราคาที่คุณกำหนดได้`)}</p>

            <div className={clsx(`mt-8 grid grid-cols-2 gap-4`, `lg:grid-cols-1`)}>
              {GET_LIST_TEXT().map((item, itemIdx) => (
                <div key={`app-${itemIdx}`} className={clsx(`space-y-4`)}>
                  <div className={clsx(`flex items-center space-x-2`)}>
                    <SvgIcon name="check" className={clsx(`text-success square-6`)} />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={clsx(`flex items-start justify-center`)}>
            <UserCard className={clsx(`w-[460px] max-w-full`)}>
              <h4 className={clsx(`text-center text-header-3`)}>{i18n._(t`อย่าลังเลที่จะติดต่อเรา !`)}</h4>
              <h3 className={clsx(`mt-2 text-center text-[40px] text-header-1 text-primary-500`, `lg:text-header-2`)}>
                {i18n._(t`เริ่มต้น 65,000฿`)}
              </h3>
              <p className={clsx(`desc text-center`)}>{i18n._(t`ปรึกษาไอเดียและโปรเจ็คของคุณได้ฟรี !`)}</p>

              <Button as="a" href={`/contact`} variant="primary" className={clsx(`mt-4 w-full`)}>
                <span>{i18n._(t`ติดต่อเรา`)}</span>
              </Button>
            </UserCard>
          </div>
        </div>
      </UserContainer>
    </section>
  )
}

export default UserApplicationFeatureSection
