import { Fragment } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageServerForm from '@/components/Forms/Server'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { ServerService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IServer } from '@/types/modules/server'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _Mutation
  const { mutate, isLoading } = useMutation((payload: IServer) => ServerService.create(payload), {
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
      toast.success(i18n._(t`เพิ่ม Server สำเร็จ`))
      navigate(`/app/server/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`เพิ่ม Server`)} className={clsx(`mt-6`)} hasDivider>
        <ManageServerForm
          onSubmit={(data) => {
            mutate(data)
          }}
          isLoadingDisk={isLoading}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ Server List`,
}
