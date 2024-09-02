import { Fragment } from 'react'

import UserFeatureSection from '@/components/User/Sections/FeatureSection'
import UserDedicatedServerCoverSection from '@/components/User/Sections/DedicatedServer/CoverSection'
import UserDedicatedServerTableSection from '@/components/User/Sections/DedicatedServer/TableSection'
import type { DocumentProps } from '@/renderer/types'

export const Page = () => {
  return (
    <Fragment>
      <UserDedicatedServerCoverSection />
      <UserDedicatedServerTableSection />
      <UserFeatureSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Dedicated Server',
}
