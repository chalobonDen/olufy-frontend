import { Fragment } from 'react'

import type { DocumentProps } from '@/renderer/types'
import UserVpsServerCoverSection from '@/components/User/Sections/VpsServer/CoverSection'
import UserVpsServerPricingSection from '@/components/User/Sections/VpsServer/PricingSection'
import UserVpsServerFeatureSection from '@/components/User/Sections/VpsServer/FeatureSection'

export const Page = () => {
  return (
    <Fragment>
      <UserVpsServerCoverSection />
      <UserVpsServerPricingSection />
      <UserVpsServerFeatureSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'VPS Server',
}
