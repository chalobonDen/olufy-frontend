import { Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, Card, Input, Tag } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { formatDate } from '@olufy-frontend/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import { ContactService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { IContact } from '@/types/modules/contact'
import { UserContactStatus } from '@/enums'

interface IPageProps {
  data: IContact
  id: string
}

export const Page = ({ id, data }: IPageProps) => {
  const { i18n } = useLingui()
  const { scrollToTop } = useBackofficeLayout()

  // _Mutation
  const {
    mutate,
    isLoading,
    data: updateData,
  } = useMutation((payload: Pick<IContact, 'status'>) => ContactService.update(id, payload), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      scrollToTop
      toast.success(i18n._(t`บันทึกสำเร็จ`))
    },
  })

  // _Memo
  const newData = useMemo(() => updateData ?? data, [updateData, data])

  const renderTagStatus = useMemo(() => {
    if (newData.status === UserContactStatus.PENDING)
      return (
        <Tag variant="danger" isSolid className={clsx(`px-2`, `sm:mb-2`)}>
          {i18n._(t`ยังไม่ได้ตรวจสอบ`)}
        </Tag>
      )

    return (
      <Tag variant="success" isSolid className={clsx(`px-2`, `sm:mb-2`)}>
        {i18n._(t`ตรวจสอบแล้ว`)}
      </Tag>
    )
  }, [newData, i18n])

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card
        title={i18n._(t`วันที่และเวลาที่ได้รับ : ${formatDate(new Date(newData.createdAt))}`)}
        className={clsx(`mt-6`)}
        headerClassName={clsx(`sm:flex-col-reverse sm:!items-end`)}
        headerRight={renderTagStatus}
        hasDivider
      >
        <h4 className={clsx(`text-header-4`)}>{i18n._(t`รายละเอียดข้อความ`)}</h4>

        <div className={clsx(`grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label>{i18n._(t`ชื่อ - นามสกุล`)}</label>
            <Input className={clsx(`mt-2`)} value={newData.name} disabled />
          </div>

          <div>
            <label>{i18n._(t`อีเมล`)}</label>
            <Input className={clsx(`mt-2`)} value={newData.email} disabled />
          </div>

          <div>
            <label>{i18n._(t`เบอร์โทรศัพท์มือถือ`)}</label>
            <Input className={clsx(`mt-2`)} value={newData.tel} disabled />
          </div>

          <div>
            <label>{i18n._(t`หัวเรื่อง`)}</label>
            <Input className={clsx(`mt-2`)} value={newData.title} disabled />
          </div>
        </div>

        <div>
          <label>{i18n._(t`ข้อความ`)}</label>
          <Input.TextArea className={clsx(`mt-2`)} disabled value={newData.message} />
        </div>

        {newData.status === UserContactStatus.PENDING && (
          <Button
            variant="success"
            size="medium"
            className={clsx(`mt-8 w-full`)}
            loading={isLoading}
            onClick={() =>
              mutate({
                status: UserContactStatus.SUCCESS,
              })
            }
          >
            {i18n._(t`ตรวจสอบแล้ว`)}
          </Button>
        )}
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`ข้อความจากเว็บไซต์`,
}
