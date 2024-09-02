import { Fragment } from 'react'

import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageTemplateForm from '@/components/Forms/Template'
import { TemplateService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { ITemplate } from '@/types/modules/template'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _Mutation
  const { mutate } = useMutation((payload: ITemplate) => TemplateService.create(payload), {
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
      toast.success(i18n._(t`เพิ่มเทมเพลตสำเร็จ`))
      navigate(`/app/template/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`เพิ่มเทมเพลต`)} className={clsx(`mt-6`)} hasDivider>
        <ManageTemplateForm
          onSubmit={(data) => {
            mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการเทมเพลต`,
}
