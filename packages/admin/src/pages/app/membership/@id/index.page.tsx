import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageMembershipForm from '@/components/Forms/Membership'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { MembershipService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IManageMembership } from '@/types/modules/membership'

interface IPageProps {
  id: string | number
  data: IManageMembership
}

export const Page = ({ data, id }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IManageMembership | null>(null)

  // _Mutation
  const { mutate } = useMutation((payload: IManageMembership) => MembershipService.update(id, payload), {
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
      toast.success(i18n._(t`แก้ไขระดับสมาชิกสำเร็จ`))
      scrollToTop()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: IManageMembership): IManageMembership => {
    return {
      id: e.id,
      name: e.name,
      color: e.color,
      minPrice: e.minPrice,
      minOrder: e.minOrder,
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไขระดับสมาชิก`)} className={clsx(`mt-6`)} hasDivider>
        <ManageMembershipForm
          data={transformData(updatedData ?? data)}
          onSubmit={(data) => {
            mutate({ ...data, minPrice: Number(data.minPrice), minOrder: Number(data.minOrder) })
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`แก้ไขระดับสมาชิก`,
}
