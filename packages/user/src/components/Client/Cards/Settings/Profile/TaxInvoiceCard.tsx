import type { FC } from 'react'
import { useState, Fragment } from 'react'

import { Card, ConfirmModal, Empty, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { omit } from 'lodash-es'

import { useClientSettingProfileTaxInvoiceModal } from '@/components/Client/Modals/Settings/Profile/ManageTaxInvoiceModal/hooks'
import ClientSettingProfileTaxInvoiceModal from '@/components/Client/Modals/Settings/Profile/ManageTaxInvoiceModal'
import { UserService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'

import type { IUserSettingProfile, IUserTaxInvoice } from '@/types/modules/user'

interface IClientSettingProfileTaxInvoiceCardProps {
  data?: IUserSettingProfile
  refetch?: VoidFunction
}

const ClientSettingProfileTaxInvoiceCard: FC<IClientSettingProfileTaxInvoiceCardProps> = ({ data, refetch }) => {
  const { i18n } = useLingui()
  const { show, close, data: initData } = useClientSettingProfileTaxInvoiceModal()
  const taxInvoiceAddress = data?.taxInvoiceAddress ?? []

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Mutation
  const { mutate: create, isLoading: isCreateLoading } = useMutation(
    (payload: IUserTaxInvoice) => UserService.createTaxInvoice(omit(payload, 'type')),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        close()
        toast.success(i18n._(t`เพิ่มที่อยู่ใบกำกับภาษีสำเร็จ`))
        refetch?.()
      },
    },
  )

  const { mutate: update, isLoading: isUpdateLoading } = useMutation(
    (payload: IUserTaxInvoice) => UserService.updateTaxInvoice(omit(payload, 'type')),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        close()
        toast.success(i18n._(t`แก้ไขที่อยู่ใบกำกับภาษีสำเร็จ`))
        refetch?.()
      },
    },
  )

  const { mutate: deleteTaxInvoice, isLoading: isDeleteLoading } = useMutation(
    (id: number) => UserService.deleteTaxInvoice(id),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        setDeleteId(null)
        toast.success(i18n._(t`ลบที่อยู่ใบกำกับภาษีสำเร็จ`))
        refetch?.()
      },
    },
  )

  return (
    <Fragment>
      <Card
        title={i18n._(t`ใบกำกับภาษี`)}
        headerRight={
          <Button variant="info" size="small" buttonType="icon-text" className={clsx(`!px-2`)} onClick={() => show()}>
            <SvgIcon name="edit" />
            <span>{i18n._(t`เพิ่มใบกำกับภาษี`)}</span>
          </Button>
        }
        className={clsx(`space-y-3`)}
      >
        {taxInvoiceAddress?.length > 0 ? (
          <Fragment>
            {taxInvoiceAddress.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={clsx([
                  `rounded-lg border border-white-800 p-4`,
                  `flex space-x-3`,
                  `dark:border-dark-300`,
                  `lg:flex-col sm:space-x-0`,
                ])}
              >
                <div className={clsx(`order-2 w-[200px]`)}>
                  <div className={clsx(`truncate`)}>{item.name}</div>
                  {!!item.branch && <div>{item.branch}</div>}
                  <div>{item.taxId}</div>
                  <div>{item.tel}</div>
                </div>

                <div className={clsx(`order-3 flex-1`, `lg:mt-3`)}>
                  <p>
                    {item.address} {item.subDistrict} {item.district} {item.province} {item.zipCode}
                  </p>
                  <div>({!item.branch ? i18n._(t`บุคคลธรรมดา`) : i18n._(t`นิติบุคคล`)})</div>
                </div>

                <div className={clsx(`order-4 flex items-center space-x-4`, `lg:order-1 lg:self-end`)}>
                  <Button variant="warning" buttonType="icon" size="small" onClick={() => show(item)}>
                    <SvgIcon name="edit" />
                  </Button>
                  <Button variant="danger" buttonType="icon" size="small" onClick={() => setDeleteId(item.id)}>
                    <SvgIcon name="delete" />
                  </Button>
                </div>
              </div>
            ))}
          </Fragment>
        ) : (
          <Empty
            className={clsx(`rounded-lg border border-white-800 py-8`, `dark:border-dark-300`)}
            content={i18n._(t`ยังไม่มีข้อมูล`)}
          />
        )}
      </Card>

      <ClientSettingProfileTaxInvoiceModal
        isLoading={isCreateLoading || isUpdateLoading}
        onSubmit={(values) => {
          if (!initData) create(values)
          else
            update({
              ...values,
              id: initData.id,
            })
        }}
      />

      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          deleteTaxInvoice(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export default ClientSettingProfileTaxInvoiceCard
