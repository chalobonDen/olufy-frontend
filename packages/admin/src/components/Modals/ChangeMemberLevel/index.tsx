import type { FC } from 'react'
import { useMemo } from 'react'

import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { Button, Modal, SvgIcon } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useQuery } from '@tanstack/react-query'

import { MembershipService } from '@/services'
import { useUserStore } from '@/stores/user'

interface IChangeMemberLevelModalProps extends IModalProps {
  currentId?: number
  onSubmit?: (val: number) => void
}

const ChangeMemberLevelModal: FC<IChangeMemberLevelModalProps> = ({
  currentId,
  closeModal,
  onSubmit,
  isLoading,
  ...props
}) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _Query
  const { data, isLoading: isMembershipLoading } = useQuery(
    ['get-membership-all'],
    ({ signal }) => MembershipService.all({ signal }),
    {
      enabled: !!profile,
    },
  )

  // _Memo
  const initialValues = useMemo((): { membershipId: number | null } => {
    if (currentId) return { membershipId: currentId }
    return { membershipId: null }
  }, [currentId])

  // _Events
  const handleCloseModal = () => {
    closeModal?.()
  }

  // _Form
  const formik = useFormik({
    initialValues,
    enableReinitialize: !!currentId,
    onSubmit: (values) => onSubmit?.(values.membershipId),
  })

  return (
    <Modal
      {...props}
      title={i18n._(t`แก้ไขระดับสมาชิก`)}
      closeModal={handleCloseModal}
      isMobileFullScreen
      isLoading={isMembershipLoading || isLoading}
    >
      <form className={clsx(`space-y-4`, `sm:pb-24`)} onSubmit={formik.handleSubmit}>
        <div className={clsx(`space-y-2`)}>
          {data?.memberShips?.map((item, itemIdx) => {
            const isActive = item.id === formik.values.membershipId

            return (
              <div
                key={itemIdx}
                className={clsx(
                  `cursor-pointer rounded-lg border border-white-300 p-4`,
                  `dark:border-dark-300`,
                  `flex items-center`,
                  `sm:p-2`,
                )}
                onClick={() => {
                  formik.setFieldValue('membershipId', item.id)
                }}
              >
                <div
                  className={clsx(`flex items-center justify-center rounded-full square-12`, `sm:square-10`)}
                  style={{ backgroundColor: item.color }}
                >
                  <SvgIcon name="crown" className={clsx(`text-white-900 square-8`, `sm:square-6`)} />
                </div>

                <div className={clsx(`ml-3 text-header-4`, `sm:ml-2`)}>{item.name}</div>

                <SvgIcon
                  name={isActive ? `check-circle` : `uncheck-circle`}
                  className={clsx(`ml-auto square-8`, `sm:square-6`, {
                    'text-primary-500': isActive,
                    'text-white-500': !isActive,
                  })}
                />
              </div>
            )
          })}
        </div>

        <Modal.Footer>
          <Button type="submit" variant="primary" className={clsx(`w-full`)}>
            <span>{i18n._(t`บันทึก`)}</span>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ChangeMemberLevelModal
