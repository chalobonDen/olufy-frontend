import { Fragment, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import BackButton from '@/components/Buttons/BackButton'
import type { DocumentProps } from '@/renderer/types'
import ManageAdminForm from '@/components/Forms/Admin'
import { UserService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IManageUser } from '@/types/modules/user'

interface IPageProps {
  data: IManageUser
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { scrollToTop, setSimplePageLoadingVisible } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IManageUser | null>(null)

  // _Mutation
  const { mutate } = useMutation((payload: IManageUser) => UserService.update(payload), {
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
      toast.success(i18n._(t`บันทึกสำเร็จ`))
      scrollToTop()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: IManageUser): IManageUser => {
    return {
      id: e.id,
      name: e.name,
      email: e.email.split('@')[0],
      permissionId: String(e.role.id),
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไขข้อมูลแอดมิน`)} className={clsx(`mt-6`)} hasDivider>
        <ManageAdminForm
          data={transformData(updatedData ?? data)}
          onSubmit={(values) => {
            mutate(values)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการแอดมิน`,
}
