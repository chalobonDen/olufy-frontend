import { Fragment, useState } from 'react'

import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import { IpService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'
import ManageInternetProtocolForm from '@/components/Forms/Ip'

import type { IInternetProtocol } from '@/types/modules/ip'

interface IPageProps {
  id: string
  data: IInternetProtocol
}

export const Page = ({ data, id }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IInternetProtocol | null>(null)

  // _Events
  const transformData = (e: IInternetProtocol) => {
    return {
      id: e.id,
      dataCenterId: e.dataCenter.id,
      rackId: e.rack.id,
      ipv4: e.ipv4,
      subnet: e.subnet,
      subnetMask: e.subnetMask,
      gateway: e.gateway,
      dns1: e.dns1,
      dns2: e.dns2,
      rankId: e.membership.id,
      flag: e.flag,
    }
  }

  // _Mutation
  const { mutate } = useMutation(
    (payload: IInternetProtocol) => IpService.update(id, payload, { ignoreSnakeKeys: ['ipv4', 'dns1', 'dns2'] }),
    {
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
        toast.success(i18n._(t`แก้ไข IP สำเร็จ`))
        scrollToTop()

        // Set update data
        setUpdatedData(res)
      },
    },
  )

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไข IP`)} className={clsx(`mt-6`)} hasDivider>
        <ManageInternetProtocolForm
          data={transformData(updatedData ?? data)}
          onSubmit={(data) => {
            mutate({ ...data, rankId: Number(data.rankId), rackId: Number(data.rackId) })
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`แก้ไข IP`,
}
