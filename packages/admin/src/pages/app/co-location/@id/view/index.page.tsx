import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Card, Button, ConfirmModal, Divider, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { navigate } from 'vite-plugin-ssr/client/router'
import toast from 'react-hot-toast'

import BackButton from '@/components/Buttons/BackButton'
import type { DocumentProps } from '@/renderer/types'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import ManageCoLocationForm from '@/components/Forms/CoLocation'

import type { ICoLocation, ICoLocationForm } from '@/types/modules/co-location'

interface IPageProps {
  data: ICoLocation
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<ICoLocation | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Events
  const transformData = (e: ICoLocation) => {
    return {
      name: e.name,
      sizeRack: e.sizeRack,
      dataCenter: e.dataCenter,
      os: e.os,
      networkShare: e.networkShare,
      price: e.price,
      bandwidth: e.bandwidth,
      taxWithheld: e.taxWithheld,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/co-location" />

      <Card className={clsx(`mt-6`)}>
        <div className={clsx(`flex justify-between`, `sm:flex-col sm:space-y-2`)}>
          <h3 className={clsx(`text-header-3`)}>{i18n._(t`แพ็กเกจ Co-location`)}</h3>
          <div className={clsx(`flex space-x-4`, `sm:justify-end sm:space-x-2`)}>
            <Button
              as="a"
              href={`/app/co-location/${data?.id}`}
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

        <ManageCoLocationForm
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
          // deleteCoLocation(deleteId)
          toast.success(i18n._(t`ทำรายการสำเร็จ`))
          setDeleteId(null)
          navigate(`/app/co-location`)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        // isLoading={isDeleteCoLocationLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Title`,
}
