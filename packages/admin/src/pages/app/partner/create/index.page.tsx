import { Fragment } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import BackButton from '@/components/Buttons/BackButton'
import ManagePartnerForm from '@/components/Forms/Partner'
import { PartnerService } from '@/services'
import type { DocumentProps } from '@/renderer/types'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible } = useBackofficeLayout()

  // _Mutation
  const { mutate } = useMutation((payload: FormData) => PartnerService.create(payload), {
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
      toast.success(i18n._(t`เพิ่มพาร์ทเนอร์สำเร็จ`))
      navigate(`/app/partner/${id}`)
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`เพิ่มพาร์ทเนอร์`)} className={clsx(`mt-6`)} hasDivider>
        <ManagePartnerForm
          onSubmit={(data) => {
            mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการพาร์ทเนอร์`,
}
