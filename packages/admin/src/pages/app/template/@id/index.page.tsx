import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { Card } from '@olufy-frontend/shared/UI'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import ManageTemplateForm from '@/components/Forms/Template'
import BackButton from '@/components/Buttons/BackButton'
import { TemplateService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { ITemplate } from '@/types/modules/template'

interface IPageProps {
  id: string
  data: ITemplate
}

export const Page = ({ data, id }: IPageProps) => {
  const { i18n } = useLingui()

  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<ITemplate | null>(null)

  // _Mutation
  const { mutate } = useMutation((payload: ITemplate) => TemplateService.update(id, payload), {
    onMutate: () => {
      setSimplePageLoadingVisible(true)
    },
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
      setSimplePageLoadingVisible(false)
    },
    onSuccess: (res) => {
      setSimplePageLoadingVisible(false)
      toast.success(i18n._(t`แก้ไขเทมเพลตสำเร็จ`))
      scrollToTop()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: ITemplate): ITemplate => {
    return {
      id: e.id,
      name: e.name,
      vmid: e.vmid,
      type: e.type,
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไขเทมเพลต`)} className={clsx(`mt-6`)} hasDivider>
        <ManageTemplateForm
          data={transformData(updatedData ?? data)}
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
