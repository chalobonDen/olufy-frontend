import { Fragment, useRef, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import BackButton from '@/components/Buttons/BackButton'
import ManagePartnerForm from '@/components/Forms/Partner'
import type { DocumentProps } from '@/renderer/types'
import { PartnerService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { IPartner } from '@/types/modules/partner'

interface IPageProps {
  data: IPartner
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()
  const clearFilesRef = useRef<VoidFunction[]>([])
  const formRef = useRef<any>()

  // _State
  const [updatedData, setUpdatedData] = useState<IPartner | null>(null)

  // _Mutation
  const { mutate } = useMutation((formData: FormData) => PartnerService.update(data.id, formData), {
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

      // Clear files on updated!!
      if (clearFilesRef.current) clearFilesRef.current.forEach((e) => e?.())
      if (formRef.current) formRef.current.resetForm()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: IPartner) => {
    return {
      name: e.name,
      endDate: new Date(e.endDate),
      fileDark: e.fileDark,
      fileLight: e.fileLight,
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card title={i18n._(t`แก้ไขพาร์ทเนอร์`)} className={clsx(`mt-6`)} hasDivider>
        <ManagePartnerForm
          data={transformData(updatedData ?? data)}
          onSubmit={(formData) => {
            mutate(formData)
          }}
          getClearFiles={(e) => (clearFilesRef.current = e)}
          getForm={(e) => (formRef.current = e)}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการพาร์ทเนอร์`,
}
