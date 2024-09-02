import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { useLingui } from '@lingui/react'
import { Menu } from '@headlessui/react'
import { ConfirmModal, SvgIcon } from '@olufy-frontend/shared/UI'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { ServerService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import MoreDropdown from '../Dropdowns/MoreDropdown'

import type { ISimpleServer } from '@/types/modules/server'

interface IServerTableActionProps {
  data: ISimpleServer
  onRefetch?: VoidFunction
}

const ServerTableAction: FC<IServerTableActionProps> = ({ data, onRefetch }) => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Mutation
  const { mutate: deleteServer, isLoading: isDeleteServerLoading } = useMutation(
    (id: string | number) => ServerService.delete(id),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        toast.success(i18n._(t`ทำรายการสำเร็จ`))
        setDeleteId(null)
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
                href={`/app/server/${data?.id}`}
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
          deleteServer(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteServerLoading}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export default ServerTableAction
