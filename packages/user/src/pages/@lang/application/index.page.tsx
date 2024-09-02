import { Fragment } from 'react'

import type { DocumentProps } from '@/renderer/types'
import UserApplicationCoverSection from '@/components/User/Sections/Application/CoverSection'
import UserApplicationFeatureSection from '@/components/User/Sections/Application/FeatureSection'

export const Page = () => {
  return (
    <Fragment>
      <UserApplicationCoverSection />
      <UserApplicationFeatureSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Application',
}
