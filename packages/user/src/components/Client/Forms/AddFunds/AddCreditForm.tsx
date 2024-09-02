import type { FC } from 'react'
import { useState } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { Button, Checkbox, Divider, Input } from '@olufy-frontend/shared/UI'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import NumberButton from '@/components/Client/Buttons/AddFund/NumberButton'
import PaymentChanelCard from '@/components/Client/Cards/Payment/PaymentChanelCard'
import { DepositService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'

import { PaymentChannel } from '@/enums'
import type { IManageDeposit } from '@/types/modules/deposit'

interface IAddCreditAddFundsFormProps {
  baseUrl: string
  urlCallbackSuccess?: string
}

const MOCK_SUGGESSION_AMOUNT = [100, 1000, 10000]
const MIN_AMOUNT = 100
const MAX_AMOUNT = 100000

const AddCreditAddFundsForm: FC<IAddCreditAddFundsFormProps> = ({ baseUrl, urlCallbackSuccess }) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible } = useBackofficeLayout()

  // _Validation_Schema
  const validationSchema = yup.object().shape({
    amount: yup
      .number()
      .min(MIN_AMOUNT, t`กรุณากรอกจำนวนขั้นต่ำ 100`)
      .max(MAX_AMOUNT, t`กรุณากรอกจำนวนสูงสุดไม่เกิน 100,000`)
      .required(t`กรุณากรอกจำนวน`),
  })

  // _State
  const [isAgree, setIsAgree] = useState<boolean>(false)

  // _Query
  const { data } = useQuery(['get-ksher-configs'], ({ signal }) => DepositService.configs({ signal }))

  // _Mutation
  const { mutate: handleAddCredit } = useMutation(
    (payload: IManageDeposit) =>
      DepositService.createOrder({
        ...payload,
        urlCallbackError: `${baseUrl}/app/add-funds/error`,
        urlCallbackSuccess: urlCallbackSuccess ?? `${baseUrl}/app/add-funds/success`,
      }),
    {
      onMutate: () => {
        setSimplePageLoadingVisible(true)
      },
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
        setSimplePageLoadingVisible(false)
      },
      onSuccess: (res) => {
        window.location.replace(res.link)
        setSimplePageLoadingVisible(false)
      },
    },
  )

  // _Formik
  const formik = useFormik<IManageDeposit>({
    initialValues: {
      amount: 0,
      paymentChannel: PaymentChannel.PROMPTPAY,
    },
    validationSchema,
    onSubmit: (values) => {
      if (!isAgree) return
      handleAddCredit(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className={clsx(`mt-2 font-light`, `sm:text-body-14`)}>
        <span>{i18n._(t`จำนวนที่ต้องการเติมเงิน`)}</span>
        <span className={clsx(`ml-1 text-body-12 text-error`)}>{i18n._(t`ขั้นต่ำ 100 THB สูงสุด 100,000 THB`)}</span>
      </p>

      <div className={clsx(`mt-4 flex items-start`, `sm:flex-col sm:items-stretch`)}>
        <div className={clsx(`flex items-start`, `sm:flex-col sm:space-y-2`)}>
          {MOCK_SUGGESSION_AMOUNT.map((item, idx) => (
            <NumberButton
              key={idx}
              className={clsx(`mr-3`, `sm:w-full`)}
              amount={item}
              selected={Number(formik.values.amount)}
              onSelect={(e) => {
                formik.setFieldValue('amount', e)
              }}
            />
          ))}
        </div>

        <div className={clsx(`ml-3`, `sm:ml-0 sm:mt-2 sm:w-full`)}>
          <Input.Numeric
            id="amount"
            name="amount"
            className={clsx(`min-w-[256px]`)}
            placeholder={i18n._(t`กรอกจำนวนเงิน`)}
            onChange={(e) => {
              formik.setFieldValue('amount', Number(e))
            }}
            value={String(formik.values.amount) === '0' ? '' : String(formik.values.amount)}
            error={getErrorWithTouched(formik, 'amount')}
          />
        </div>
      </div>

      <h3 className={clsx(`mt-6 text-header-4`, `sm:text-header-5`)}>{i18n._(t`เลือกวิธีการเติมเครดิต`)}</h3>
      <Divider className={clsx(`mt-2`)} />
      <div className={clsx(`grid grid-cols-4 gap-4 p-4`, `2xl:grid-cols-3`, `lg:grid-cols-2`, `px-0 sm:grid-cols-1`)}>
        {data?.payments?.map((item, itemIdx) => (
          <PaymentChanelCard
            key={`payment-channel-${itemIdx}`}
            data={item}
            isSelected={formik.values.paymentChannel === item.key}
            onSelected={(e) => formik.setFieldValue('paymentChannel', e)}
          />
        ))}
      </div>

      <div className={clsx(`flex justify-center`)}>
        <Checkbox
          className={clsx(`mt-6 self-center`, `sm:text-sm`)}
          checked={isAgree}
          onChange={() => {
            setIsAgree((e) => !e)
          }}
        >
          <div>
            <span>{i18n._(t`ฉันยอมรับการเติมเครดิต`)}</span>
            <span className={clsx(`!m-0 text-primary-500`)}>{i18n._(t`ไม่สามารถขอคืนเงินได้ทุกกรณี`)}</span>
          </div>
        </Checkbox>
      </div>

      <div className={clsx(`mt-8 flex justify-center`)}>
        <Button
          variant="primary"
          size="medium"
          type="submit"
          className={clsx(`w-[24rem] min-w-[10rem]`)}
          disabled={!isAgree}
        >
          <span>{i18n._(t`เติมเครดิต`)}</span>
        </Button>
      </div>
    </form>
  )
}

export default AddCreditAddFundsForm
