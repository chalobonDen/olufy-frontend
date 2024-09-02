import { Fragment } from 'react'

import UserFeatureSection from '@/components/User/Sections/FeatureSection'
import UserCloudServerPricingSection from '@/components/User/Sections/CloudServer/PricingSection'
import UserCloudServerCoverSection from '@/components/User/Sections/CloudServer/CoverSection'
import type { DocumentProps } from '@/renderer/types'

export const Page = () => {
  return (
    <Fragment>
      <UserCloudServerCoverSection />
      <UserCloudServerPricingSection />
      <UserFeatureSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Cloud Server',
}
