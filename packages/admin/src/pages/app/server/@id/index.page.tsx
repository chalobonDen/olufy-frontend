import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageServerForm from '@/components/Forms/Server'
import { ServerService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IServer } from '@/types/modules/server'

interface IPageProps {
  id: string
  data: IServer
}

export const Page = ({ data, id }: IPageProps) => {
  const { i18n } = useLingui()

  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IServer | null>(null)

  // _Events
  const transformData = (e: IServer): IServer => {
    return {
      id: e.id,
      dataCenterId: e.dataCenterId,
      rackId: e.rackId,
      name: e.name,
      cpuName: e.cpuName,
      cpuCore: e.cpuCore,
      cpuThreads: e.cpuThreads,
      ram: e.ram,
      ramType: e.ramType,
      apiUrl: e.apiUrl,
      credentials: e.credentials,
      size: e.size,
      userId: e.userId,
      productId: e.productId,
      slotNo: e.slotNo,
      detail: e.detail,
      serverDisks: e.serverDisks,
      nodeId: e.nodeId,
      vmServerId: e.vmServerId,
    }
  }

  // _Mutation
  const { mutate } = useMutation((payload: IServer) => ServerService.update(id, payload), {
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
      toast.success(i18n._(t`แก้ไข Server สำเร็จ`))
      scrollToTop()

      // Set update data
      setUpdatedData(res)
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไข Server`)} className={clsx(`mt-6`)} hasDivider>
        <ManageServerForm
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
  title: t`จัดการ Server List`,
}
