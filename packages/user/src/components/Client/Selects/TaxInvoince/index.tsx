import type { FC } from 'react'
import { useMemo, useEffect, Fragment, useState } from 'react'

import { Checkbox, Empty, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useMutation, useQuery } from '@tanstack/react-query'
import { omit } from 'lodash-es'
import { toast } from 'react-hot-toast'

import { UserService } from '@/services'
import { useUserStore } from '@/stores/user'
import { handleAxiosErrorMsg } from '@/libs/axios'
import Button from '@/components/Button'

import ClientSettingProfileTaxInvoiceModal from '../../Modals/Settings/Profile/ManageTaxInvoiceModal'
import { useClientSettingProfileTaxInvoiceModal } from '../../Modals/Settings/Profile/ManageTaxInvoiceModal/hooks'

import type { IUserTaxInvoice } from '@/types/modules/user'

interface ISelectTaxInvoinceProps {
  isInvoice?: boolean
  toggleIsInvoice?: (val: boolean) => void
  onSelect?: (data: IUserTaxInvoice | null) => void
}

const SelectTaxInvoince: FC<ISelectTaxInvoinceProps> = ({ onSelect, isInvoice = false, toggleIsInvoice }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()
  const { show: showCreateInvoice, close: closeCreateInvoice } = useClientSettingProfileTaxInvoiceModal()

  // _State
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isChangeInvoice, setIsChangeInvoice] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // _Query
  const { data: profileSetting, refetch: profileSettingRefetch } = useQuery(
    ['get-setting-profile'],
    () => UserService.settingProfile(),
    {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!profile,
      onSuccess: (res) => {
        if (res.taxInvoiceAddress?.length > 0 && !isFetched) {
          handleSelectId(res.taxInvoiceAddress[0].id)
          setIsFetched(true)
        }
      },
    },
  )

  // _Mutation
  const { mutate: create, isLoading: isCreateLoading } = useMutation(
    (payload: IUserTaxInvoice) => UserService.createTaxInvoice(omit(payload, 'type')),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: (res) => {
        setIsChangeInvoice(false)
        handleSelectId(res.id)
        closeCreateInvoice()
        toast.success(i18n._(t`เพิ่มที่อยู่ใบกำกับภาษีสำเร็จ`))
        profileSettingRefetch?.()
      },
    },
  )

  // _Memo
  const isEmpty = useMemo(
    () => !profileSetting?.taxInvoiceAddress || profileSetting?.taxInvoiceAddress.length === 0,
    [profileSetting?.taxInvoiceAddress],
  )

  // _Events
  const handleSelectId = (id: number) => {
    const taxInvoiceAddress = profileSetting?.taxInvoiceAddress ?? []
    onSelect?.(taxInvoiceAddress.find((e) => e.id === id))
    setSelectedId(id)
  }

  // _Effect
  useEffect(() => {
    if (!isInvoice) {
      onSelect?.(null)
      setIsChangeInvoice(false)
    } else if (profileSetting?.taxInvoiceAddress?.length > 0) {
      if (!selectedId) handleSelectId(profileSetting?.taxInvoiceAddress[0]?.id)
      else handleSelectId(selectedId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched, isInvoice, onSelect, profileSetting?.taxInvoiceAddress, selectedId])

  return (
    <Fragment>
      <div className={clsx(`px-4 py-2`)}>
        <div className={clsx(`flex h-8 items-center justify-between`)}>
          <Checkbox className={clsx(`self-center`)} checked={isInvoice} onChange={() => toggleIsInvoice?.(!isInvoice)}>
            <span className={clsx(`text-body-16 font-light`)}>{i18n._(t`ขอใบเสร็จรับเงิน/ใบกำกับภาษี`)}</span>
          </Checkbox>

          {isInvoice && (
            <Button
              variant="default"
              size="small"
              className={clsx(`bg-info/10 text-info`)}
              onClick={() => {
                if (isEmpty) showCreateInvoice()
                else setIsChangeInvoice(!isChangeInvoice)
              }}
            >
              <span className={clsx(`text-body-16`, `sm:text-body-14`)}>
                {isEmpty ? i18n._(t`เพิ่มใบกำกับภาษี`) : isChangeInvoice ? i18n._(t`ปิด`) : i18n._(t`เปลี่ยน`)}
              </span>
            </Button>
          )}
        </div>

        {isInvoice && (
          <div className={clsx(`divide-y`)}>
            {profileSetting?.taxInvoiceAddress
              .filter((e) => (e.id === selectedId && !isChangeInvoice) || isChangeInvoice)
              .map((item, itemIdx) => (
                <div
                  key={`select-invoice-${itemIdx}`}
                  className={clsx([
                    `flex space-x-2 py-2`,
                    {
                      'pl-6': !isChangeInvoice,
                      'cursor-pointer': isChangeInvoice,
                    },
                    `sm:space-x-0`,
                  ])}
                  onClick={() => {
                    if (!isChangeInvoice) return
                    handleSelectId(item.id)
                    setIsChangeInvoice((e) => !e)
                  }}
                >
                  {isChangeInvoice && (
                    <div className={clsx(`flex pt-1`)}>
                      {item.id === selectedId ? (
                        <SvgIcon name="check-round" className={clsx(`text-primary-500 square-4`)} />
                      ) : (
                        <div className={clsx(`h-4 w-4 rounded-full border border-white-800`)} />
                      )}
                    </div>
                  )}

                  <div
                    className={clsx([
                      `flex`,
                      `sm:flex-col`,
                      {
                        'sm:pl-2': isChangeInvoice,
                      },
                    ])}
                  >
                    <div className={clsx(`order-2 w-[200px]`, `sm:w-full`)}>
                      <div className={clsx(`truncate`)}>{item.name}</div>
                      {!!item.branch && <div className={clsx(`truncate`)}>{item.branch}</div>}
                      <div>{item.taxId}</div>
                      <div>{item.tel}</div>
                    </div>

                    <div className={clsx(`order-3 flex-1`, `lg:mt-3`)}>
                      <p>
                        {item.address} {item.subDistrict} {item.district} {item.province} {item.zipCode}
                      </p>
                      <div>({!item.branch ? i18n._(t`บุคคลธรรมดา`) : i18n._(t`นิติบุคคล`)})</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {isInvoice && !isEmpty && (
          <div className={clsx(`mt-2 border-t py-3 text-center`)}>
            <Button
              variant="info"
              isInvert
              size="small"
              onClick={() => showCreateInvoice()}
            >{t`เพิ่มใบกำกับภาษี`}</Button>
          </div>
        )}

        {isInvoice && isEmpty && <Empty content={i18n._(t`ยังไม่มีข้อมูล`)} />}
      </div>

      <ClientSettingProfileTaxInvoiceModal
        isLoading={isCreateLoading}
        onSubmit={(values) => {
          create(values)
        }}
      />
    </Fragment>
  )
}

export default SelectTaxInvoince
