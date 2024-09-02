import { Fragment, useRef, useState } from 'react'

import { Button, Card, ConfirmModal, Divider, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import BackButton from '@/components/Buttons/BackButton'
import ManageDomainForm from '@/components/Forms/Domain'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { IDomain } from '@/types/modules/domain'

interface IPageProps {
  data: IDomain
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [updatedData, setUpdatedData] = useState<IDomain | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Events
  const transformData = (e: IDomain) => {
    return {
      domain: e.domain,
      price: e.price,
      taxRate: e.taxRate,
      taxAmount: e.taxAmount,
    }
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/domain" />

      <Card className={clsx(`mt-6`)}>
        <div className={clsx(`flex justify-between`, `sm:flex-col sm:space-y-2`)}>
          <h3 className={clsx(`text-header-3`)}>{i18n._(t`โดเมน`)}</h3>
          <div className={clsx(`flex space-x-4`, `sm:justify-end sm:space-x-2`)}>
            <Button
              as="a"
              href={`/app/domain/${data?.id}`}
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

        <ManageDomainForm
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
          // deleteDomain(deleteId)
          toast.success(i18n._(t`ทำรายการสำเร็จ`))
          setDeleteId(null)
          navigate(`/app/domain`)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        // isLoading={isDeleteDomainLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}
