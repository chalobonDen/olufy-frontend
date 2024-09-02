import { Fragment, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import BackButton from '@/components/Buttons/BackButton'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import ManageVpsServerForm from '@/components/Forms/VpsServer'
import { VpsServerService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IManageVpsServer, IVpsServer } from '@/types/modules/vps-server'

interface IPageProps {
  data: IVpsServer
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IVpsServer | null>(null)

  // _Mutation
  const { mutate } = useMutation((payload: IManageVpsServer) => VpsServerService.update(payload), {
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
      toast.success(i18n._(t`แก้ไขแพ็กเกจ VPS Server สำเร็จ`))
      scrollToTop()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: IVpsServer): IManageVpsServer => {
    return {
      name: e.name,
      bandwidth: e.bandwidth,
      cpu: e.cpu,
      price: e.price,
      diskCapacity: e.diskCapacity.amount,
      diskType: e.diskType,
      networkType: e.networkType,
      ram: e.ram.amount,
      taxWithheld: e.taxWithheld,
      planId: e.planId,
      serverId: e.serverId,
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไขแพ็กเกจ VPS Server`)} className={clsx(`mt-6`)} hasDivider>
        <ManageVpsServerForm
          data={transformData(updatedData ?? data)}
          onSubmit={(values) => {
            mutate({
              id: data.id,
              ...values,
            })
          }}
        />
      </Card>
    </Fragment>
  )
}
