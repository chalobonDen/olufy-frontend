import { Fragment } from 'react'

import { t } from '@lingui/macro'

import UserContactCoverSection from '@/components/User/Sections/Contact/CoverSection'
import UserContactFormSection from '@/components/User/Sections/Contact/FormSection'
import type { DocumentProps } from '@/renderer/types'

export const Page = () => {
  return (
    <Fragment>
      <UserContactCoverSection />
      <UserContactFormSection />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`ติดต่อเรา`,
}
