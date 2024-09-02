import { Fragment } from 'react'

import type { DocumentProps } from '@/renderer/types'
import UserFirewallCoverSection from '@/components/User/Sections/Firewall/CoverSection'
import UserFirewallFeatureSection from '@/components/User/Sections/Firewall/FeatureSection'

export const Page = () => {
  return (
    <Fragment>
      <UserFirewallCoverSection />
      <UserFirewallFeatureSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Firewall',
}
