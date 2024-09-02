import type { FC } from 'react'
import { Fragment, useMemo, useState } from 'react'

import { Button, Card, ConfirmModal, Divider, Empty, Input, PreviewImage, SvgIcon } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Lightbox from '@olufy-frontend/shared/UI/Lightbox'
import { usePreviewImage } from '@olufy-frontend/shared/hooks'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import ChangeMemberLevelModal from '@/components/Modals/ChangeMemberLevel'
import MemberShipCard from '@/components/Cards/MemberShipCard'
import { MemberService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { IMember } from '@/types/modules/member'
import { AccountVerityStatus } from '@/enums'

interface IMemberInfoSectionProps {
  member: IMember
  onUpdated?: (payload?: IMember) => void
}

// const socialList = [
//   {
//     iconName: 'social-facebook',
//     label: 'Facebook',
//     providerId: '',
//   },
//   {
//     iconName: 'social-google',
//     label: 'Google',
//     providerId: 'google.com',
//   },
//   {
//     iconName: 'social-github',
//     label: 'GitHub',
//     providerId: '',
//   },
// ]

const VerifySuccess = ({ text }: { text: string }) => {
  return (
    <Button
      variant="success"
      isInvert
      size="small"
      className={clsx(`no-hover pointer-events-none w-full justify-between space-x-2 !px-3`, `sm:!px-2 sm:py-1`)}
    >
      <span className={clsx(`flex-1 text-left text-base`, `sm:text-body-14`)}>{text}</span>
      <SvgIcon name="verified" className={clsx(`square-6`, `sm:square-4`)} />
    </Button>
  )
}

const ConfirmButton = ({ text }: { text: string }) => {
  return (
    <Button
      variant="danger"
      isInvert
      size="small"
      className={clsx(`no-hover pointer-events-none w-full justify-between space-x-2 !px-3`, `sm:!px-2 sm:py-1`)}
    >
      <span className={clsx(`flex-1 text-left text-base`, `sm:text-body-14`)}>{text}</span>
      <SvgIcon name="info-circle" className={clsx(`square-6`, `sm:square-4`)} />
    </Button>
  )
}

const PendingButton = ({ text }: { text: string }) => {
  return (
    <Button
      variant="warning"
      isInvert
      size="small"
      className={clsx(`no-hover pointer-events-none w-full justify-between space-x-2 !px-3`, `sm:!px-2 sm:py-1`)}
    >
      <span className={clsx(`flex-1 text-left text-base`, `sm:text-body-14`)}>{text}</span>
      <SvgIcon name="info-circle" className={clsx(`square-6`, `sm:square-4`)} />
    </Button>
  )
}

const MemberInfoSection: FC<IMemberInfoSectionProps> = ({ member, onUpdated }) => {
  const { i18n } = useLingui()
  const { currentPreviewIndex, previewImages, handleClosePreviewImages, handleShowPreviewImages } = usePreviewImage()

  // _State
  const [visibleChangeLevelModal, setVisibleChangeLevelModal] = useState<boolean>(false)
  const [visibleConfirmRejectModal, setVisibleConfirmRejectModal] = useState<boolean>(false)
  const [visibleConfirmApproveModal, setVisibleConfirmApproveModal] = useState<boolean>(false)

  // _Memo
  const accountMembership = useMemo(() => member.membership, [member.membership])
  const accountInformation = useMemo(() => member, [member])
  const accountAddress = useMemo(() => member.accountAddress, [member.accountAddress])
  const taxInvoiceAddress = useMemo(() => member.taxInvoiceAddresses, [member.taxInvoiceAddresses])
  const accountVerification = useMemo(() => member.accountVerification, [member.accountVerification])

  // _Mutation
  const { mutate: updateIdentityStatus, isLoading: isIndentityStatusLoading } = useMutation(
    (flag: AccountVerityStatus) => MemberService.updateIdentity(member.id, flag),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: (res) => {
        setVisibleConfirmRejectModal(false)
        setVisibleConfirmApproveModal(false)

        toast.success(`ทำรายการสำเร็จ`)
        onUpdated?.(res)
      },
    },
  )

  const { mutate: updateMembership, isLoading: isUpdateMembership } = useMutation(
    (membershipId: number) => MemberService.updateMembership(member.id, membershipId),
    {
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
      },
      onSuccess: (res) => {
        setVisibleChangeLevelModal(false)

        toast.success(`ทำรายการสำเร็จ`)
        onUpdated?.(res)
      },
    },
  )

  return (
    <Fragment>
      {/* ระดับสมาชิก */}
      <Card
        title={i18n._(t`ระดับสมาชิก`)}
        headerRight={
          <Button variant="warning" size="small" buttonType="icon" onClick={() => setVisibleChangeLevelModal(true)}>
            <SvgIcon name="edit" />
          </Button>
        }
      >
        <MemberShipCard
          color={accountMembership.color}
          title={accountMembership.name}
          amount={accountMembership.orderAmount}
          maxAmount={accountMembership.maxOrderAmount}
        />
      </Card>

      {/* ข้อมูลเกี่ยวกับบัญชี */}
      <Card title={i18n._(t`ข้อมูลเกี่ยวกับบัญชี`)} className={clsx(`mt-4 space-y-4`)}>
        <div>
          <label>{i18n._(t`ชื่อ - นามสกุล ภาษาไทย (TH)`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.nameTh} disabled />
        </div>
        <div>
          <label>{i18n._(t`ชื่อ - นามสกุล ภาษาอังกฤษ (EN)`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.nameEn} disabled />
        </div>
        <div>
          <label>{i18n._(t`เบอร์โทรศัพท์มือถือ`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.tel} disabled />
        </div>
        <div>
          <label>{i18n._(t`อีเมล`)}</label>
          <Input className={clsx(`mt-2`)} value={accountInformation?.email} disabled />
        </div>
      </Card>

      {/* ที่อยู่ */}
      <Card title={i18n._(t`ที่อยู่`)} className={clsx(`mt-4 space-y-4`)}>
        <div>
          <label>{i18n._(t`ที่อยู่`)}</label>
          <Input className={clsx(`mt-2`)} value={accountAddress?.address} disabled />
        </div>

        <div className={clsx(`grid grid-cols-2 gap-4`, `md:grid-cols-1`)}>
          <div>
            <label>{i18n._(t`ตำบล/แขวง`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.subDistrict} disabled />
          </div>
          <div>
            <label>{i18n._(t`เขต/อำเภอ`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.district} disabled />
          </div>
          <div>
            <label>{i18n._(t`จังหวัด`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.province} disabled />
          </div>
          <div>
            <label>{i18n._(t`รหัสไปรษณีย์`)}</label>
            <Input className={clsx(`mt-2`)} value={accountAddress?.zipCode} disabled />
          </div>
        </div>
      </Card>

      {/* ยืนยันตัวตน */}
      <Card title={i18n._(t`ยืนยันตัวตน`)} className={clsx(`mt-4`)}>
        <div className={clsx(`grid gap-3 pt-4`)}>
          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`min-w-[170px]`)}>{i18n._(t`ยืนยันอีเมล`)}</div>
            <div className={clsx(`ml-auto`)}>
              {accountVerification?.email ? (
                <VerifySuccess text={i18n._(t`ยืนยันอีเมลแล้ว`)} />
              ) : (
                <ConfirmButton text={i18n._(t`รอการยืนยันอีเมล`)} />
              )}
            </div>
          </div>

          <Divider />

          <div className={clsx(`flex items-center`)}>
            <div className={clsx(`min-w-[170px]`)}>{i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือ`)}</div>
            <div className={clsx(`ml-auto`)}>
              {accountVerification?.mobile ? (
                <VerifySuccess text={i18n._(t`ยืนยันเบอร์โทรศัพท์มือถือแล้ว`)} />
              ) : (
                <ConfirmButton text={i18n._(t`รอการยืนยันเบอร์โทรศัพท์มือถือ`)} />
              )}
            </div>
          </div>

          <Divider />

          <div>
            <div className={clsx(`flex items-center`)}>
              <div className={clsx(`min-w-[170px]`)}>{i18n._(t`ยืนยันบัตรประชาชน`)}</div>
              <div className={clsx(`ml-auto`)}>
                {!accountVerification?.identityCardFlag ? (
                  <Fragment>
                    {accountVerification?.identityCard ? (
                      <VerifySuccess text={i18n._(t`ยืนยันบัตรประชาชนแล้ว`)} />
                    ) : (
                      <ConfirmButton text={i18n._(t`รอการยืนยันบัตรประชาชน`)} />
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    {accountVerification?.identityCardFlag === AccountVerityStatus.DONE && (
                      <VerifySuccess text={i18n._(t`ยืนยันบัตรประชาชนแล้ว`)} />
                    )}
                    {accountVerification?.identityCardFlag === AccountVerityStatus.PENDING && (
                      <PendingButton text={i18n._(t`กรุณาตรวจสอบ`)} />
                    )}
                    {accountVerification?.identityCardFlag === AccountVerityStatus.REJECT && (
                      <ConfirmButton text={i18n._(t`รอการยืนยันอีกครั้ง`)} />
                    )}
                  </Fragment>
                )}
              </div>
            </div>

            <div
              className={clsx(
                `relative mt-4 max-w-[547px] space-y-4 overflow-hidden rounded-lg border border-white-300 p-4`,
                `dark:border-dark-300`,
              )}
            >
              <div>
                <label>{i18n._(t`เลขบัตรประชาชน 13 หลัก`)}</label>
                <Input value={member?.userIdentity?.idCardNo || ''} disabled className={clsx(`mt-2`)} />
              </div>
              <div>
                <label>{i18n._(t`รูปภาพ`)}</label>
                <PreviewImage
                  className={clsx(`mt-2 aspect-video rounded-lg`, {
                    'pointer-events-none': !member?.userIdentity?.idCardImage,
                  })}
                  img={member?.userIdentity?.idCardImage}
                  onClick={() => handleShowPreviewImages([member?.userIdentity?.idCardImage], 0)}
                />
              </div>

              {!accountVerification?.identityCard &&
                accountVerification?.identityCardFlag === AccountVerityStatus.PENDING && (
                  <div className={clsx(`flex space-x-4`, `sm:space-x-2`)}>
                    <Button
                      variant="danger"
                      size="medium"
                      className={clsx(`flex-1`)}
                      onClick={() => setVisibleConfirmRejectModal(true)}
                    >
                      <span>{i18n._(t`ปฏิเสธ`)}</span>
                    </Button>
                    <Button
                      variant="success"
                      size="medium"
                      className={clsx(`flex-1`)}
                      onClick={() => setVisibleConfirmApproveModal(true)}
                    >
                      <span>{i18n._(t`ยืนยัน`)}</span>
                    </Button>
                  </div>
                )}

              {/* Overlay */}
              {(!accountVerification?.identityCard ||
                accountVerification?.identityCardFlag === AccountVerityStatus.REJECT) &&
                accountVerification?.identityCardFlag !== AccountVerityStatus.PENDING && (
                  <div
                    className={clsx(
                      `absolute inset-0 z-10 !mt-0 flex items-center justify-center bg-dark-500/80 text-center`,
                    )}
                  >
                    <span className={clsx(`text-white-900`)}>
                      {accountVerification?.identityCardFlag === AccountVerityStatus.REJECT
                        ? i18n._(t`รอการยืนยันอีกครั้ง`)
                        : i18n._(t`รอการยืนยัน`)}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Card>

      {/* ใบกำกับภาษี */}
      <Card title={i18n._(t`ใบกำกับภาษี`)} className={clsx(`mt-4 space-y-3`)}>
        {taxInvoiceAddress?.length > 0 ? (
          <Fragment>
            {taxInvoiceAddress.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={clsx([
                  `rounded-lg border border-white-800 p-4`,
                  `flex space-x-3`,
                  `dark:border-dark-300`,
                  `lg:flex-col lg:space-x-0`,
                ])}
              >
                <div className={clsx(`order-2 w-[200px]`)}>
                  <div className={clsx(`truncate`)}>{item.name}</div>
                  {!!item.branch && <div>{item.branch}</div>}
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
            ))}
          </Fragment>
        ) : (
          <Empty
            className={clsx(`rounded-lg border border-white-800 py-8`, `dark:border-dark-300`)}
            content={i18n._(t`ยังไม่มีข้อมูล`)}
          />
        )}
      </Card>

      {/* เข้าสู่ระบบผ่านโซเซียล */}
      {/* <Card title={i18n._(t`เข้าสู่ระบบผ่านโซเซียล`)} className={clsx(`mt-4 space-y-4`)}>
        {socialList.map((item, itemIdx) => (
          <div key={itemIdx} className={clsx(`flex items-center`)}>
            <div className={clsx(`flex flex-1 items-center space-x-2`)}>
              <SvgIcon name={item.iconName} className={clsx(`square-[30px]`)} />
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </Card> */}

      {/* Lightbox */}
      <Lightbox
        visible={previewImages.length > 0}
        closeModal={handleClosePreviewImages}
        images={previewImages}
        currentIndex={currentPreviewIndex}
      />

      {/* Modals */}
      <ChangeMemberLevelModal
        visible={visibleChangeLevelModal}
        currentId={member.membership.id}
        closeModal={() => setVisibleChangeLevelModal(false)}
        onSubmit={updateMembership}
        isLoading={isUpdateMembership}
      />

      <ConfirmModal
        visible={!!visibleConfirmRejectModal}
        title={i18n._(t`ยืนยันการปฏิเสธ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ปฏิเสธ`)}
        onConfirm={() => updateIdentityStatus(AccountVerityStatus.REJECT)}
        onCancel={() => setVisibleConfirmRejectModal(false)}
        closeModal={() => setVisibleConfirmRejectModal(false)}
        isLoading={isIndentityStatusLoading}
      >
        <p>{i18n._(t`คุณต้องการปฏิเสธการยืนยันบัตรประชาชน หรือไม่?`)}</p>
      </ConfirmModal>

      <ConfirmModal
        visible={!!visibleConfirmApproveModal}
        title={i18n._(t`ยืนยันการตรวจสอบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ยืนยัน`)}
        onConfirm={() => updateIdentityStatus(AccountVerityStatus.DONE)}
        onCancel={() => setVisibleConfirmApproveModal(false)}
        closeModal={() => setVisibleConfirmApproveModal(false)}
        isLoading={isIndentityStatusLoading}
      >
        <p>{i18n._(t`คุณต้องการอนุมัติการยืนยันตัวตนด้วยบัตรประชาชน หรือไม่?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export default MemberInfoSection
