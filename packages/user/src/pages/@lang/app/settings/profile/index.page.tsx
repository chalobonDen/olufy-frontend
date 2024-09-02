import { Fragment } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useQuery } from '@tanstack/react-query'

import ClientSettingProfileInfoCard from '@/components/Client/Cards/Settings/Profile/InfoCard'
import ClientSettingProfileAddressCard from '@/components/Client/Cards/Settings/Profile/AddressCard'
import ClientSettingProfileTaxInvoiceCard from '@/components/Client/Cards/Settings/Profile/TaxInvoiceCard'
import ClientSettingProfileMemberCard from '@/components/Client/Cards/Settings/Profile/MemberCard'
import ClientSettingProfileVerifyCard from '@/components/Client/Cards/Settings/Profile/VerifyCard'
import ClientSettingProfileSocialAuthCard from '@/components/Client/Cards/Settings/Profile/SocialAuthCard'
import { UserService } from '@/services'
import { useUserStore } from '@/stores/user'

interface IPageProps {
  urlOrigin?: string
}

export const Page = ({ urlOrigin }: IPageProps) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _Query
  const { data, refetch } = useQuery(['get-setting-profile'], () => UserService.settingProfile(), {
    enabled: !!profile,
  })

  return (
    <Fragment>
      <h1 className={clsx(`text-header-3`)}>{i18n._(t`ตั้งค่าโปรไฟล์`)}</h1>

      <div className={clsx(`mt-6 grid grid-cols-[2fr_1fr] gap-4`, `lg:grid-cols-[1fr_370px]`, `sm:grid-cols-1`)}>
        {/* Left */}
        <div className={clsx(`space-y-4`)}>
          {/* ข้อมูลเกี่ยวกับบัญชี */}
          <ClientSettingProfileInfoCard data={data} refetch={refetch} />

          {/* ที่อยู่ */}
          <ClientSettingProfileAddressCard data={data} refetch={refetch} />

          {/* ใบกำกับภาษี */}
          <ClientSettingProfileTaxInvoiceCard data={data} refetch={refetch} />
        </div>

        {/* Right */}
        <div className={clsx(`space-y-4`)}>
          {/* ระดับสมาชิก */}
          <ClientSettingProfileMemberCard data={data} />

          {/* ยืนยันตัวตน */}
          <ClientSettingProfileVerifyCard data={data} urlOrigin={urlOrigin} refetch={refetch} />

          {/* เข้าสู่ระบบผ่านโซเซียล */}
          <ClientSettingProfileSocialAuthCard />
        </div>
      </div>
    </Fragment>
  )
}
