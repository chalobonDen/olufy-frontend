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
import ManageDataCenterForm from '@/components/Forms/DataCenter'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { DataCenterService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IDataCenter } from '@/types/modules/data-center'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _Mutation
  const { mutate } = useMutation((payload: IDataCenter) => DataCenterService.create(payload), {
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
      toast.success(i18n._(t`เพิ่ม Data Center สำเร็จ`))
      navigate(`/app/data-center/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`เพิ่ม Data Center`)} className={clsx(`mt-6`)} hasDivider>
        <ManageDataCenterForm
          onSubmit={(data) => {
            mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ Data Center`,
}
