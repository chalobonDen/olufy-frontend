import { Fragment } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageInternetProtocolMultipleForm from '@/components/Forms/MultipleIp'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { IpService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IInternetProtocolMultiple } from '@/types/modules/ip'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _Mutation
  const { mutate } = useMutation(
    (payload: IInternetProtocolMultiple) => IpService.create(payload, { ignoreSnakeKeys: ['ipv4', 'dns1', 'dns2'] }),
    {
      onMutate: () => {
        setSimplePageLoadingVisible(true)
      },
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
        setSimplePageLoadingVisible(false)
      },
      onSuccess: () => {
        setSimplePageLoadingVisible(false)
        toast.success(i18n._(t`เพิ่ม IP สำเร็จ`))
        navigate(`/app/manage-ip`)
        scrollToTop()
      },
    },
  )

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`เพิ่ม Multi IP`)} className={clsx(`mt-6 px-6`)} hasDivider>
        <ManageInternetProtocolMultipleForm
          onSubmit={(data) => {
            mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`เพิ่ม IP`,
}
