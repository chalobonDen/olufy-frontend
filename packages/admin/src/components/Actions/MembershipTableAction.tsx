import type { FC } from 'react'
import { useState, Fragment } from 'react'

import clsx from 'clsx'
import { Menu } from '@headlessui/react'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { ConfirmModal, SvgIcon } from '@olufy-frontend/shared/UI'
import { DropdownDivider } from '@olufy-frontend/shared/UI/Dropdown'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { handleAxiosErrorMsg } from '@/libs/axios'
import { MembershipService } from '@/services'

import MoreDropdown from '../Dropdowns/MoreDropdown'

import type { ISimpleMembership } from '@/types/modules/membership'

interface IMembershipTableActionProps {
  data: ISimpleMembership
  onRefetch?: VoidFunction
}

const MembershipTableAction: FC<IMembershipTableActionProps> = ({ data: { id, name }, onRefetch }) => {
  const { i18n } = useLingui()

  // _State
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // _Mutation
  const { mutate: onDelete, isLoading: isDeleteLoading } = useMutation((id: number) => MembershipService.delete(id), {
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
    },
    onSuccess: () => {
      toast.success(i18n._(t`ทำรายการสำเร็จ`))
      setDeleteId?.(null)
      onRefetch?.()
    },
  })

  return (
    <Fragment>
      <MoreDropdown
        items={
          <Fragment>
            <Menu.Item>
              <a href={`/app/membership/${id}`} className={clsx(`dropdown-dialog-item !min-h-0 !w-full`)}>
                <SvgIcon name="edit" className={clsx(`square-6`)} />
                <span>{i18n._(t`แก้ไข`)}</span>
              </a>
            </Menu.Item>
            <DropdownDivider />
            <Menu.Item>
              <button className={clsx(`dropdown-dialog-item !min-h-0 !w-full`)} onClick={() => setDeleteId(id)}>
                <SvgIcon name="delete" className={clsx(`square-6`)} />
                <span>{i18n._(t`ลบ`)}</span>
              </button>
            </Menu.Item>
          </Fragment>
        }
      />

      {/* Modals */}
      <ConfirmModal
        visible={!!deleteId}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          onDelete(deleteId)
        }}
        onCancel={() => {
          setDeleteId(null)
        }}
        closeModal={() => {
          setDeleteId(null)
        }}
        isLoading={isDeleteLoading}
      >
        <p>
          <Trans>
            คุณต้องการลบ <strong className={clsx(`underline`)}>{name}</strong> ?
          </Trans>
        </p>
      </ConfirmModal>
    </Fragment>
  )
}

export default MembershipTableAction
