import { Fragment } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import BackButton from '@/components/Buttons/BackButton'
import type { DocumentProps } from '@/renderer/types'
import ManageAdminForm from '@/components/Forms/Admin'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IManageUser } from '@/types/modules/user'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _Mutation
  const { mutate } = useMutation((payload: IManageUser) => UserService.create(payload), {
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
      toast.success(i18n._(t`เพิ่มแอดมินสำเร็จ`))
      navigate(`/app/admin/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`เพิ่มแอดมิน`)} className={clsx(`mt-6`)} hasDivider>
        <ManageAdminForm
          onSubmit={(values) => {
            mutate(values)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการแอดมิน`,
}
