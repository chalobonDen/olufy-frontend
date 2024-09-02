import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { t } from '@lingui/macro'
import { Menu } from '@headlessui/react'
import { ConfirmModal, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'

import { handleAxiosErrorMsg } from '@/libs/axios'

import MoreDropdown from '../Dropdowns/MoreDropdown'

import type { ISimpleAddon } from '@/types/modules/addon'

interface IAddonTableActionProps {
  data: ISimpleAddon
  onRefetch?: VoidFunction
}

const AddonTableAction: FC<IAddonTableActionProps> = ({ data, onRefetch }) => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Mutation
  const { mutate: deleteAddon, isLoading: isDeleteAddonLoading } = useMutation(
    (id: number) => {
      return new Promise((reslove) =>
        setTimeout(() => {
          reslove({})
        }, 500),
      )
    },
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
                href={`/app/addon/${data?.id}/view`}
                className={clsx(`dropdown-dialog-item !min-h-0 !w-full min-w-[140px]`)}
              >
                <SvgIcon name="search" className={clsx(`square-6`)} />
                <span>{i18n._(t`ดูรายละเอียด`)}</span>
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href={`/app/addon/${data?.id}`}
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
          deleteAddon(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteAddonLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export default AddonTableAction
