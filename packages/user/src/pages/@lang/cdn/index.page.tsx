import { Fragment } from 'react'

import type { DocumentProps } from '@/renderer/types'
import UserCdnCoverSection from '@/components/User/Sections/Cdn/CoverSection'
import UserCdnPricingSection from '@/components/User/Sections/Cdn/PricingSection'
import UserCdnFeatureSection from '@/components/User/Sections/Cdn/FeatureSection'

export const Page = () => {
  return (
    <Fragment>
      <UserCdnCoverSection />
      <UserCdnPricingSection />
      <UserCdnFeatureSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'CDN',
}
