import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageDataCenterForm from '@/components/Forms/DataCenter'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { DataCenterService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IDataCenter } from '@/types/modules/data-center'

interface IPageProps {
  id: string
  data: IDataCenter
}

export const Page = ({ data, id }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IDataCenter | null>(null)

  // _Mutation
  const { mutate } = useMutation((payload: IDataCenter) => DataCenterService.update(id, payload), {
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
      toast.success(i18n._(t`แก้ไข Data Center สำเร็จ`))
      scrollToTop()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: IDataCenter): IDataCenter => {
    return {
      id: e.id,
      name: e.name,
      tel: e.tel,
      email: e.email,
      address: e.address,
      detail: e.detail,
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไข Data Center`)} className={clsx(`mt-6`)} hasDivider>
        <ManageDataCenterForm
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
  title: t`จัดการ Data Center`,
}
