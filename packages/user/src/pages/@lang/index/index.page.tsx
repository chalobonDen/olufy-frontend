import { Fragment } from 'react'

import UserHomeHeroSection from '@/components/User/Sections/Home/HeroSection'
import UserHomeWhyPlatformSection from '@/components/User/Sections/Home/WhyPlatformSection'
import UserHomeServiceSection from '@/components/User/Sections/Home/ServiceSection'
import UserHomeStatisticSection from '@/components/User/Sections/Home/StatisticSection'
import UserHomeNewsSection from '@/components/User/Sections/Home/NewsSection'
import UserHomePartnerSection from '@/components/User/Sections/Home/PartnerSection'

import type { IHomepageResponse } from '@/types/modules/home'

interface IPageProps {
  data: IHomepageResponse
}

export const Page = ({ data }: IPageProps) => {
  return (
    <Fragment>
      <UserHomeHeroSection />
      <UserHomeWhyPlatformSection banners={data?.banners ?? []} />
      <UserHomeServiceSection />
      {data?.statistics && <UserHomeStatisticSection statistics={data?.statistics} />}
      {data?.news && data?.news?.length > 0 && <UserHomeNewsSection news={data?.news} />}
      {data?.partners && data?.partners?.length > 0 && <UserHomePartnerSection partners={data?.partners} />}
    </Fragment>
  )
}

export const guestOnly = true
