import { Fragment } from 'react'

import type { DocumentProps } from '@/renderer/types'
import UserColocationCoverSection from '@/components/User/Sections/CoLocation/CoverSection'
import UserColocationPricingSection from '@/components/User/Sections/CoLocation/PricingSection'
import { UserColocationFeatureSection } from '@/components/User/Sections/CoLocation/FeatureSection'

export const Page = () => {
  return (
    <Fragment>
      <UserColocationCoverSection />
      <UserColocationPricingSection />
      <UserColocationFeatureSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Co-location',
}
