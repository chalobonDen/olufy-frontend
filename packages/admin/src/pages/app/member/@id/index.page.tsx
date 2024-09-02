import { Fragment, useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { Button, Card, ConfirmModal, Divider, SvgIcon, Switch } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import MemberActivitySection from '@/components/Sections/Member/Activity'
import MemberCreditSection from '@/components/Sections/Member/Credit'
import MemberInfoSection from '@/components/Sections/Member/Info'
import { MemberService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IMember } from '@/types/modules/member'
import { UserFlag } from '@/enums'

type TabValue = 'info' | 'activity' | 'credit'

interface IPageProps {
  data: IMember
}

const getTabs = () =>
  [
    {
      key: 'info',
      label: t`ข้อมูลบัญชี`,
      icon: 'backoffice-user-info',
    },
    {
      key: 'activity',
      label: t`ข้อมูลการใช้งาน`,
      icon: 'backoffice-user-setting',
    },
    {
      key: 'credit',
      label: t`จัดการเครดิต`,
      icon: 'backoffice-user-credit',
    },
  ] as {
    key: TabValue
    label: string
    icon: string
  }[]

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()

  // _State
  const [tabSelected, setTabSelected] = useState<TabValue>('info')
  const [updateMemberData, setUpdateMemberData] = useState<IMember | null>(null)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState<boolean>(false)
  const [visibleConfirmUpdateStatus, setVisibleConfirmUpdateStatus] = useState<boolean>(false)

  // _Memo
  const member = useMemo(() => {
    if (updateMemberData) return updateMemberData
    return data
  }, [data, updateMemberData])

  const renderTabContent = useMemo(() => {
    switch (tabSelected) {
      case 'activity':
        return <MemberActivitySection member={member} />

      case 'credit':
        return <MemberCreditSection member={member} onUpdated={setUpdateMemberData} />

      default:
        return <MemberInfoSection member={member} onUpdated={setUpdateMemberData} />
    }
  }, [member, tabSelected])

  const isBanned = useMemo(() => member?.flag === UserFlag.SUSPENDED, [member])

  // _Mutation
  const { mutate: deleteMember, isLoading: isDeleteMemberLoading } = useMutation(
    () => MemberService.delete(member.id),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        setVisibleConfirmDelete(false)

        toast.success(i18n._(t`ลบผู้ใช้สำเร็จ`))
        navigate('/app/member')
      },
    },
  )

  const { mutate: updateStatus, isLoading: isUpdateStatusLoading } = useMutation(
    (flag: UserFlag) => MemberService.updateStatus(member.id, flag),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: () => {
        setVisibleConfirmUpdateStatus(false)

        toast.success(i18n._(t`ทำรายการสำเร็จ`))
        setUpdateMemberData({ ...member, flag: isBanned ? UserFlag.ACTIVE : UserFlag.SUSPENDED })
      },
    },
  )

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card className={clsx(`mt-6 p-0`)}>
        <div className={clsx(`flex items-start p-6`, `sm:flex-col-reverse`)}>
          <div className={clsx(`flex items-center space-x-6`, `sm:mt-6 sm:flex-col sm:space-x-0 sm:self-center`)}>
            <SvgIcon name="backoffice-user-avatar" className={clsx(`square-[120px]`, `2xl:square-24`)} />
            <div className={clsx(`sm:mt-3`)}>
              <div className={clsx(`text-[32px] font-medium`, `2xl:text-body-24 2xl:font-medium`)}>{member.nameTh}</div>
              <div className={clsx(`text-body-24 font-light`, `2xl:text-body-18 2xl:font-light`)}>{member.nameEn}</div>
            </div>
          </div>

          <div className={clsx(`ml-auto flex items-center space-x-4`)}>
            <Switch
              label={i18n._(t`ระงับบัญชี`)}
              containerClassName={clsx(
                `flex-row-reverse space-x-0 items-center px-2`,
                `button bg-white-300/40 button-size-medium button-rounder-lg`,
                `dark:bg-dark-200/40`,
                `focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
                {
                  'text-error': isBanned,
                },
              )}
              className={clsx(`ml-2`)}
              checked={isBanned}
              onChange={() => setVisibleConfirmUpdateStatus(true)}
            />

            <Button variant="danger" buttonType="icon" size="medium" onClick={() => setVisibleConfirmDelete(true)}>
              <SvgIcon name="delete" />
            </Button>
          </div>
        </div>

        <Divider />

        <div className={clsx(`flex items-center space-x-10 p-6`, `overflow-y-hidden`)}>
          {getTabs().map((tab, tabIdx) => {
            const tabActive = tab.key === tabSelected

            return (
              <div
                key={`tab-${tabIdx}`}
                className={clsx([
                  `flex items-center space-x-3 text-body-20`,
                  `whitespace-nowrap`,
                  `2xl:space-x-2 2xl:text-body-18`,
                  {
                    'text-primary-500': tabActive,
                    'cursor-pointer text-white-800': !tabActive,
                  },
                ])}
                onClick={() => {
                  if (!tabActive) setTabSelected(tab.key)
                }}
              >
                <SvgIcon name={tab.icon} className={clsx(`square-8`, `2xl:square-6`)} />
                <span>{tab.label}</span>
              </div>
            )
          })}
        </div>
      </Card>

      <div className={clsx(`mt-4`)}>{renderTabContent}</div>

      {/* Confirm Modals */}
      <ConfirmModal
        visible={!!visibleConfirmDelete}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ยืนยัน`)}
        onConfirm={deleteMember}
        onCancel={() => setVisibleConfirmDelete(false)}
        closeModal={() => setVisibleConfirmDelete(false)}
        isLoading={isDeleteMemberLoading}
      >
        <p>{i18n._(t`คุณต้องการลบผู้ใช้งานคนนี้หรือไม่?`)}</p>
      </ConfirmModal>

      <ConfirmModal
        visible={!!visibleConfirmUpdateStatus}
        title={isBanned ? i18n._(t`ยืนยันเปิดการใช้งาน`) : i18n._(t`ยืนยันระงับการใช้งาน`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ยืนยัน`)}
        onConfirm={() => {
          if (isBanned) {
            updateStatus(UserFlag.ACTIVE)
            return
          }

          updateStatus(UserFlag.SUSPENDED)
        }}
        onCancel={() => setVisibleConfirmUpdateStatus(false)}
        closeModal={() => setVisibleConfirmUpdateStatus(false)}
        isLoading={isUpdateStatusLoading}
      >
        <p>
          {isBanned
            ? i18n._(t`คุณต้องการเปิดการใช้งานผู้ใช้คนนี้ หรือไม่?`)
            : i18n._(t`คุณต้องการระงับการใช้งานผู้ใช้คนนี้ หรือไม่?`)}
        </p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการผู้ใช้งาน`,
}
