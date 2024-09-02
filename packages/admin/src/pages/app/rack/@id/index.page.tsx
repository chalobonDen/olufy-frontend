import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageRackForm from '@/components/Forms/Rack'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { RackService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IRack } from '@/types/modules/rack'

interface IPageProps {
  id: string
  data: IRack
}

export const Page = ({ data, id }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IRack | null>(null)

  // _Mutation
  const { mutate } = useMutation((payload: IRack) => RackService.update(id, payload), {
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
      toast.success(i18n._(t`แก้ไข Rack สำเร็จ`))
      scrollToTop()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: IRack): IRack => {
    return {
      id: e.id,
      name: e.name,
      maxSlot: e.maxSlot,
      detail: e.detail,
      dataCenterId: String(e.dataCenterId),
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไข Rack`)} className={clsx(`mt-6`)} hasDivider>
        <ManageRackForm
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
  title: t`จัดการ Rack`,
}
