import { Fragment, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { Card, ConfirmModal } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { formatPrice } from '@olufy-frontend/shared/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { usePageContext } from '@/hooks/usePageContext'
import SelectTaxInvoince from '@/components/Client/Selects/TaxInvoince'
import BackButton from '@/components/Client/Buttons/BackButton'
import type { DocumentProps } from '@/renderer/types'
import Button from '@/components/Button'
import { useUserStore } from '@/stores/user'
import { useClientDisplayCreditModal } from '@/components/Client/Modals/DisplayCreditModal/hooks'
import ClientDisplayCreditModal from '@/components/Client/Modals/DisplayCreditModal'
import { UserService, VpsServerService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'
import ClientSummaryOrder from '@/components/Client/Sections/ClientSummaryOrder'
import useCalculateSummaryOrder from '@/hooks/useCalculateSummaryOrder'
import useRouter from '@/hooks/useRouter'

import type { ICreateOrderVpsServer, IVpsServer } from '@/types/modules/vps-server'
import { Period } from '@/enums'
import type { IUserTaxInvoice } from '@/types/modules/user'

interface IPageProps {
  data: IVpsServer
  orderData: ICreateOrderVpsServer
  baseUrl: string
}

export const Page = ({ data, orderData, baseUrl }: IPageProps) => {
  const { i18n } = useLingui()
  const {
    routeParams,
    urlParsed: { search },
  } = usePageContext()
  const { profile } = useUserStore()
  const { scrollToTop, setSimplePageLoadingVisible } = useBackofficeLayout()
  const { show: showDisplayCreditModal } = useClientDisplayCreditModal()
  const { replace } = useRouter()

  // _State
  const [isInvoice, setIsInvoice] = useState<boolean>(false)
  const [taxInvoiceSelected, setTaxInvoiceSelected] = useState<IUserTaxInvoice | null>(null)
  const [visibleConfirmModal, setVisibleConfirmModal] = useState<boolean>(false)

  // _Query
  const { refetch: refetchProfile } = useQuery(['me'], () => UserService.me(), {
    enabled: false,
  })

  // _Memo
  const routeBack = useMemo(() => {
    const params = new URLSearchParams()
    Object.entries(search).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    return `/app/vps-server/packages/${routeParams?.id}?${params}`
  }, [routeParams?.id, search])

  const periodSelected = useMemo(() => {
    return data.price.find((e) => e.type === orderData.period)
  }, [data.price, orderData.period])

  const templateSelected = useMemo(() => {
    return data.vmTemplate.find((e) => e.id === Number(orderData.orderItems[0].config.vmTemplateId))
  }, [data.vmTemplate, orderData.orderItems])

  const isIndividual = useMemo(() => !taxInvoiceSelected?.branch, [taxInvoiceSelected])

  // _Summary_Order
  const summary = useCalculateSummaryOrder({
    price: periodSelected.price,
    withholdTax: isIndividual ? 0 : data?.taxWithheld || 0,
  })

  // _Mutation
  const { mutate: createOrder, isLoading: isCreateOrderLoading } = useMutation(
    (payload: ICreateOrderVpsServer) => VpsServerService.createOrder(payload),
    {
      onMutate: () => {
        setSimplePageLoadingVisible(true)
      },
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
        setSimplePageLoadingVisible(false)
      },
      onSuccess: ({ id }) => {
        replace(`/app/vps-server/${id}`)
        setSimplePageLoadingVisible(false)
        toast.success(i18n._(t`สั่งซื้อสำเร็จ`))
        scrollToTop()
        refetchProfile()
      },
    },
  )

  // _Events
  const onSubmit = () => {
    if (profile?.credit < summary.totalAmount) {
      showDisplayCreditModal(Math.abs(profile?.credit - summary.totalAmount), baseUrl)
      return
    }

    setVisibleConfirmModal(true)
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />
      <h3 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`คำสั่งซื้อ`)}</h3>

      <Card className={clsx(`mt-6 p-0`, `sm:mt-4`)}>
        <h3 className={clsx(`p-4 text-header-3`, `sm:text-header-4`)}>{i18n._(t`ตรวจสอบคำสั่งซื้อ`)}</h3>

        <div className={clsx(`bg-primary-500 px-4 py-2 text-body-16 text-white-900`)}>
          {i18n._(t`รายการสินค้าและบริการที่เลือก`)}
        </div>
        <div className={clsx(`p-4`)}>
          <div className={clsx(`flex justify-between`)}>
            <div className={clsx(`flex flex-col`)}>
              <span className={clsx(`text-header-3`, `lg:text-header-5`)}>{data.name}</span>
              {/* <span className={clsx(`text-body-16`, `lg:text-body-14`)}>{templateSelected.name}</span> */}
              <span className={clsx(`desc text-body-14 font-light`)}>
                {templateSelected?.name} - {orderData.orderItems[0].config.hostname}
              </span>
            </div>

            <div className={clsx(`flex flex-col text-right`)}>
              <span className={clsx(`text-header-3`, `lg:text-header-5`)}>{formatPrice(periodSelected.price)} THB</span>
              <span className={clsx(`desc text-body-16 font-light`, `lg:text-body-14`)}>
                ({periodSelected.type === Period.MONTHLY ? '1 Month' : '1 Year'})
              </span>
            </div>
          </div>
        </div>

        <ClientSummaryOrder data={summary} />

        <SelectTaxInvoince isInvoice={isInvoice} toggleIsInvoice={setIsInvoice} onSelect={setTaxInvoiceSelected} />
      </Card>

      <div className={clsx(`mt-4 flex justify-end space-x-4`, `sm:space-x-2`)}>
        <Button variant="danger" size="medium" className={clsx(`min-w-[154px]`, `sm:flex-1`)} as="a" href={routeBack}>
          <span>{i18n._(t`ยกเลิก`)}</span>
        </Button>
        <Button
          variant="success"
          size="medium"
          className={clsx(`min-w-[154px]`, `sm:flex-1`)}
          onClick={onSubmit}
          disabled={isInvoice && !taxInvoiceSelected}
        >
          <span>{i18n._(t`ดำเนินการต่อ`)}</span>
        </Button>
      </div>

      <ClientDisplayCreditModal />

      {/* Modals */}
      <ConfirmModal
        visible={visibleConfirmModal}
        title={i18n._(t`ยืนยันคำสั่งซื้อ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ยืนยัน`)}
        onConfirm={() => {
          createOrder({
            ...orderData,
            addressId: taxInvoiceSelected?.id,
          })
        }}
        onCancel={() => setVisibleConfirmModal(false)}
        closeModal={() => setVisibleConfirmModal(false)}
        isLoading={isCreateOrderLoading}
      >
        <p>{i18n._(t`คุณต้องการทำรายการนี้ หรือไม่?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`VPS Server`,
}
