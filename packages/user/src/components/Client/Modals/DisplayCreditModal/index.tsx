import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { Modal, SvgIcon } from '@olufy-frontend/shared/UI'
import type { IModalProps } from '@olufy-frontend/shared/UI/Modal/types'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { formatPrice } from '@olufy-frontend/shared/utils'
import { IoChevronBackOutline } from 'react-icons/io5'

import Button from '@/components/Button'
import { useUserStore } from '@/stores/user'
import { usePageContext } from '@/hooks/usePageContext'

import { useClientDisplayCreditModal } from './hooks'
import AddCreditAddFundsForm from '../../Forms/AddFunds/AddCreditForm'

interface IClientDisplayCreditModalProps extends IModalProps {}

const ClientDisplayCreditModal: FC<IClientDisplayCreditModalProps> = ({ ...props }) => {
  const { i18n } = useLingui()
  const { visible, amount, close, baseUrl } = useClientDisplayCreditModal()
  const { profile } = useUserStore()
  const { urlParsed, routeParams } = usePageContext()

  // _State
  const [isAddCredit, setIsAddCredit] = useState<boolean>(false)

  // _Events
  const onCloseModal = () => {
    close()
    setIsAddCredit(false)
  }

  return (
    <Modal
      visible={visible && !!baseUrl}
      title={
        <Fragment>
          {isAddCredit && (
            <IoChevronBackOutline className={clsx(`cursor-pointer square-6`)} onClick={() => setIsAddCredit(false)} />
          )}
          <span>{isAddCredit ? i18n._(t`เติมเงินเข้าระบบเครดิต`) : i18n._(t`ยอดคงเหลือไม่เพียงพอ`)}</span>
        </Fragment>
      }
      titleClassName={clsx(`flex items-center space-x-2`)}
      closeModal={onCloseModal}
      size={isAddCredit ? 'big' : 'small'}
      isCloseModal={!isAddCredit}
      isMobileFullScreen={isAddCredit}
      {...props}
    >
      {isAddCredit ? (
        <AddCreditAddFundsForm
          baseUrl={baseUrl}
          urlCallbackSuccess={`${baseUrl}/app/vps-server/packages/${routeParams.id}/order${urlParsed.searchOriginal}`}
        />
      ) : (
        <div>
          <p>{i18n._(t`เครดิตคงเหลือไม่เพียงพอกรุณาเติมเครดิตของคุณให้เพียงพอกับยอดชำระ`)}</p>

          <div className={clsx(`flex space-x-2`)}>
            <div className={clsx(`flex flex-1 items-center space-x-2 rounded-lg border border-white-300 px-3 py-2`)}>
              <div className={clsx(`flex items-center justify-center rounded-full bg-primary-500 square-10`)}>
                <SvgIcon name="wallet" className={clsx(`text-white-900 square-6`)} />
              </div>

              <div className={clsx(`flex flex-col`)}>
                <span className={clsx(`text-body-14`)}>{i18n._(t`กระเป๋าเครดิต`)}</span>
                <strong className={clsx(`truncate`)}>{formatPrice(profile?.credit ?? 0)} THB</strong>
              </div>
            </div>

            <div className={clsx(`flex flex-1 items-center rounded-lg border border-white-300 px-3 py-2`)}>
              <div className={clsx(`flex flex-col`)}>
                <span className={clsx(`text-body-14`)}>{i18n._(t`เติมเงินอีกประมาณ`)}</span>
                <strong className={clsx(`truncate text-primary-500`)}>{formatPrice(amount ?? 0)} THB</strong>
              </div>
            </div>
          </div>

          <Button variant="primary" className={clsx(`mt-4 w-full`)} size="medium" onClick={() => setIsAddCredit(true)}>
            <span className={clsx(`text-body-18`)}>{i18n._(t`เติมเครดิต`)}</span>
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default ClientDisplayCreditModal
