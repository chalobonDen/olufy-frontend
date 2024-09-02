import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t, Trans } from '@lingui/macro'
import { Menu } from '@headlessui/react'
import { ConfirmModal, SvgIcon } from '@olufy-frontend/shared/UI'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { DataCenterService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import MoreDropdown from '../Dropdowns/MoreDropdown'

import type { IDataCenter } from '@/types/modules/data-center'

interface IDataCenterTableActionProps {
  data: IDataCenter
  onRefetch?: VoidFunction
}

const DataCenterTableAction: FC<IDataCenterTableActionProps> = ({ data, onRefetch }) => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Mutation
  const { mutate: deleteDataCenter, isLoading: isDeleteDataCenterLoading } = useMutation(
    (id: number) => DataCenterService.delete(id),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`ทำรายการสำเร็จ`))
        setDeleteId?.(null)
        onRefetch?.()
      },
    },
  )

  return (
    <Fragment>
      <MoreDropdown
        items={
          <Fragment>
            <Menu.Item>
              <a
                href={`/app/data-center/${data?.id}`}
                className={clsx(`dropdown-dialog-item !min-h-0 !w-full min-w-[140px]`)}
              >
                <SvgIcon name="edit" className={clsx(`square-6`)} />
                <span>{i18n._(t`แก้ไข`)}</span>
              </a>
            </Menu.Item>
            <Menu.Item>
              <button className={clsx(`dropdown-dialog-item !min-h-0 !w-full`)} onClick={() => setDeleteId(data?.id)}>
                <SvgIcon name="delete" className={clsx(`square-6`)} />
                <span>{i18n._(t`ลบ`)}</span>
              </button>
            </Menu.Item>
          </Fragment>
        }
      />

      {/* Confirm Delete */}
      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          deleteDataCenter(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteDataCenterLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export default DataCenterTableAction
