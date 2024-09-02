import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import { Trans, t } from '@lingui/macro'
import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserContainer from '@/components/UI/User/Container'
import { APP_NAME } from '@/constants'
import UserCard from '@/components/UI/User/Card'
import UserTitle from '@/components/UI/User/Title'

import UserHomeWhyPlatformSectionSlider from './Slider'

import type { IBanner } from '@/types/modules/home'

interface IUserHomeWhyPlatformSectionProps {
  banners: IBanner[]
}

const getWhyList = () => [
  {
    iconName: 'platform-setting',
    title: t`Easy to Customize`,
    description: t`คุณสามารถกำหนดระบบและปรับแต่งเซิร์ฟเวอร์เองได้ตามความต้องการ`,
  },
  {
    iconName: 'platform-startup',
    title: t`High performance`,
    description: t`ระบบเซิร์ฟเวอร์ที่มีประสิทธิภาพสูงด้วย Pure SSD storage`,
  },
  {
    iconName: 'platform-firewall',
    title: t`Firewall Protection`,
    description: t`ระบบป้องกันอันตรายจาก อินเตอร์เน็ตและเน็ตเวิร์คภายนอก ให้ฟรี`,
  },
]

const serviceList = [
  'Boost SEO ranking',
  'Retention',
  'Social Sharing',
  'Visual Reviews',
  'Marketing',
  'Reviews Generation',
]

const getServiceCountingList = () => [
  {
    count: `50 +`,
    label: (
      <Trans>
        วิศวะกร <br></br>และผู้พัฒนา
      </Trans>
    ),
  },
  {
    count: `35 m +`,
    label: t`โปรเจ็ค`,
  },
  {
    count: `100 k +`,
    label: t`ลูกค้า`,
  },
  {
    count: `15 m +`,
    label: t`ให้การช่วยเหลือ`,
  },
]

const UserHomeWhyPlatformSection: FC<IUserHomeWhyPlatformSectionProps> = ({ banners }) => {
  const { i18n } = useLingui()

  return (
    <section className={clsx(`py-14`, `sm:py-12`)}>
      <UserContainer>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`ทำไมคุณถึงเลือก ${APP_NAME}?`)}</UserTitle>

        <div
          className={clsx([
            `mt-10 grid grid-cols-3 gap-6`,
            `2xl:gap-4`,
            `lg:flex lg:flex-wrap lg:justify-center`,
            `md:gap-x-4`,
          ])}
        >
          {getWhyList().map((item, itemIdx) => (
            <UserCard
              key={`platform-${itemIdx}`}
              className={clsx([`flex flex-col items-center py-8 text-center`, `lg:w-2/5`, `md:w-full`])}
            >
              <SvgIcon name={item.iconName} className={clsx(`square-[100px]`)} />
              <h4 className={clsx(`mt-5 text-header-3`, `sm:text-header-4`)}>{item.title}</h4>
              <p className={clsx(`desc mt-4`)}>{item.description}</p>
            </UserCard>
          ))}
        </div>
      </UserContainer>

      <UserContainer className={clsx(`mt-20 grid grid-cols-2 gap-6`, `2xl:gap-4`, `lg:grid-cols-1`)}>
        <div className={clsx(`lg:text-center`)}>
          <h3 className={clsx([`max-w-[468px] text-[40px] text-header-2`, `lg:max-w-full`, `md:text-[26px]`])}>
            {i18n._(t`เราพร้อมที่จะดูแล และให้บริการลูกค้าของเรา`)}
          </h3>
          <p className={clsx(`desc mt-4`)}>
            {i18n._(t`เพื่อให้มั่นใจว่าลูกค้าได้รับบริการที่ครบตามความต้องการลูกค้ามากที่สุด`)}
          </p>

          <div
            className={clsx(
              `mt-16 grid grid-cols-2 gap-4`,
              `lg:mx-auto lg:mt-8 lg:w-[400px]`,
              `sm:w-full sm:gap-3`,
              `se:gap-x-0 se:gap-y-2`,
            )}
          >
            {serviceList.map((item, itemIdx) => (
              <div key={`service-${itemIdx}`} className={clsx(`flex items-center space-x-2`)}>
                <SvgIcon name="check" className={clsx(`text-success square-6`)} />
                <span className={clsx(`text-left`, `sm:text-body-14`, `se:text-body-12`)}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={clsx(`grid grid-cols-2 gap-6`, `2xl:gap-4`, `lg:mt-4`, `sm:mt-3 sm:gap-3`)}>
          {getServiceCountingList().map((item, itemIdx) => (
            <UserCard
              key={`counting-${itemIdx}`}
              className={clsx(
                `flex min-h-[182px] flex-col items-center pt-6 text-center`,
                `sm:min-h-[158px]`,
                `se:min-h-[136px] se:p-3`,
              )}
            >
              <span className={clsx(`text-gradient-primary text-[40px] text-header-2`, `sm:text-[28px]`)}>
                {item.count}
              </span>
              <span className={clsx(`text-header-3`, `sm:text-header-4`, `se:text-header-5`)}>{item.label}</span>
            </UserCard>
          ))}
        </div>
      </UserContainer>

      {banners.length > 0 && <UserHomeWhyPlatformSectionSlider className={clsx(`mt-20`)} banners={banners} />}
    </section>
  )
}

export default UserHomeWhyPlatformSection
