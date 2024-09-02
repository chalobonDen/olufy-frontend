import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Card, ConfirmModal, Divider, SvgIcon } from '@olufy-frontend/shared/UI'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import ManageAddonForm from '@/components/Forms/Addon'

import type { IAddon } from '@/types/modules/addon'

interface IPageProps {
  data: IAddon
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()

  // _State
  // _State
  const [updatedData, setUpdatedData] = useState<IAddon | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Events
  const transformData = (e: IAddon) => {
    return {
      name: e.name,
      price: e.price,
      detail: e.detail,
      taxWithheld: e.taxWithheld,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/addon" />

      <Card className={clsx(`mt-6`)}>
        <div className={clsx(`flex justify-between`, `sm:flex-col sm:space-y-2`)}>
          <h3 className={clsx(`text-header-3`)}>{i18n._(t`แพ็กเกจ Add On`)}</h3>
          <div className={clsx(`flex space-x-4`, `sm:justify-end sm:space-x-2`)}>
            <Button
              as="a"
              href={`/app/addon/${data?.id}`}
              variant="warning"
              buttonType="icon-text"
              size="medium"
              className={clsx(`min-w-[140px]`, `sm:flex-1`)}
            >
              <SvgIcon name="edit" className={clsx(`square-6`)} />
              <span>{i18n._(t`Edit`)}</span>
            </Button>
            <Button
              variant="danger"
              buttonType="icon-text"
              size="medium"
              className={clsx(`min-w-[140px]`, `sm:flex-1`)}
              onClick={() => setDeleteId(data?.id)}
            >
              <SvgIcon name="delete" className={clsx(`square-6`)} />
              <span>{i18n._(t`Delete`)}</span>
            </Button>
          </div>
        </div>
        <Divider className={clsx(`my-4`)} />

        <ManageAddonForm
          data={transformData(updatedData ?? data)}
          onSubmit={(data) => {
            // mutate(data)
          }}
          readonly
        />
      </Card>

      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          // deleteAddon(deleteId)
          toast.success(i18n._(t`ทำรายการสำเร็จ`))
          setDeleteId(null)
          navigate(`/app/addon`)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        // isLoading={isDeleteAddonLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการ Add On`,
}
