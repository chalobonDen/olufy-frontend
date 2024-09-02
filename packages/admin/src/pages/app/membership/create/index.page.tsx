import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { navigate } from 'vite-plugin-ssr/client/router'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageMembershipForm from '@/components/Forms/Membership'
import { MembershipService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IManageMembership } from '@/types/modules/membership'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _Mutation
  const { mutate } = useMutation((payload: IManageMembership) => MembershipService.create(payload), {
    onMutate: () => {
      setSimplePageLoadingVisible(true)
    },
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
      setSimplePageLoadingVisible(false)
    },
    onSuccess: ({ id }) => {
      setSimplePageLoadingVisible(false)
      toast.success(i18n._(t`เพิ่มระดับสมาชิกสำเร็จ`))
      navigate(`/app/membership/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`เพิ่มระดับสมาชิก`)} className={clsx(`mt-6`)} hasDivider>
        <ManageMembershipForm
          onSubmit={(data) => {
            mutate({ ...data, minOrder: Number(data.minOrder), minPrice: Number(data.minPrice) })
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`เพิ่มระดับสมาชิก`,
}
