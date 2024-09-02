import { useState, Fragment, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { Button, Card, ConfirmModal, Divider, Input, SvgIcon, Tag } from '@olufy-frontend/shared/UI'
import { formatDate } from '@olufy-frontend/shared/utils'
import Lightbox from '@olufy-frontend/shared/UI/Lightbox'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Buttons/BackButton'
import { useIsMounted } from '@/hooks/useIsMounted'
import SendTicketForm from '@/components/Forms/Ticket/SendForm'
import { TicketService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'

import type { ITicket } from '@/types/modules/ticket'
import { TicketStatus } from '@/enums'

interface IPageProps {
  data: ITicket
}

export const Page = ({ data }: IPageProps) => {
  const { i18n } = useLingui()
  const { isMounted } = useIsMounted()
  const { setSimplePageLoadingVisible } = useBackofficeLayout()

  // _State
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number | null>(null)
  const [showSendForm, setShowSendForm] = useState<boolean>(false)
  const [visibleConfirmEnded, setVisibleConfirmEnded] = useState<boolean>(false)

  // _Query
  const { data: _ticketData, refetch: refetchTicket } = useQuery({
    queryKey: ['get-ticket-by-id', data.id],
    queryFn: ({ signal }) => TicketService.byId(data.id, { signal }),
    initialData: data,
  })

  const ticketData = useMemo(() => _ticketData ?? data, [_ticketData, data])

  // _Mutation
  const { mutate: replyMessage, isLoading: replyMessageLoading } = useMutation(
    (payload: FormData) => TicketService.reply(payload),
    {
      onMutate: () => {
        setSimplePageLoadingVisible(true)
      },
      onError: (err) => {
        const msg = handleAxiosErrorMsg(err)
        toast.error(msg)
        setSimplePageLoadingVisible(false)
      },
      onSuccess: () => {
        refetchTicket()
        setSimplePageLoadingVisible(false)
        setShowSendForm(false)

        toast.success(i18n._(t`ตอบกลับแล้ว`))
      },
    },
  )

  const { mutate: closeTicket } = useMutation(() => TicketService.close(data.id), {
    onMutate: () => {
      setSimplePageLoadingVisible(true)
    },
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
      setSimplePageLoadingVisible(false)
    },
    onSuccess: () => {
      refetchTicket()
      setSimplePageLoadingVisible(false)
      setVisibleConfirmEnded(false)

      toast.success(i18n._(t`จบการสนทนาแล้ว`))
    },
  })

  // _Events
  const handleShowPreviewImages = (images: string[], idx: number) => {
    setPreviewImages(images)
    setCurrentPreviewIndex(idx)
  }

  const handleClosePreviewImages = () => {
    setPreviewImages([])
    setCurrentPreviewIndex(0)
  }

  // _Memo
  const renderTag = useMemo(() => {
    switch (ticketData.status) {
      case TicketStatus.PENDING:
        return (
          <Tag variant="warning" className={clsx(`h-10 px-6`, `sm:h-8 sm:self-end sm:px-4`)}>
            {i18n._(t`รอตรวจสอบ`)}
          </Tag>
        )

      case TicketStatus.ADMIN_REPLY:
        return (
          <Tag variant="info" className={clsx(`h-10 px-6`, `sm:h-8 sm:self-end sm:px-4`)}>
            {i18n._(t`ตอบกลับแล้ว`)}
          </Tag>
        )

      case TicketStatus.CUSTOMER_REPLY:
        return (
          <Tag variant="danger" className={clsx(`h-10 px-6`, `sm:h-8 sm:self-end sm:px-4`)}>
            {i18n._(t`ลูกค้าตอบกลับ`)}
          </Tag>
        )

      default:
        return (
          <Tag variant="success" className={clsx(`h-10 px-6`, `sm:h-8 sm:self-end sm:px-4`)}>
            {i18n._(t`สิ้นสุด`)}
          </Tag>
        )
    }
  }, [ticketData.status, i18n])

  return (
    <Fragment>
      <BackButton as="a" href="/app/ticket" />

      <div className={clsx(`mt-6 space-y-4`)}>
        <Card
          title={i18n._(t`ติดต่อเรื่อง : `) + ` #${ticketData.id} : ${ticketData.title}`}
          headerRight={renderTag}
          hasDivider
          headerClassName={clsx(`sm:flex-col-reverse sm:!items-start`)}
          titleClassName={clsx(`sm:mt-3`)}
        >
          <div className={clsx(`grid grid-cols-2 gap-4 pt-4`, `sm:grid-cols-1`)}>
            <div>
              <label>{i18n._(t`ชื่อ - นามสกุล`)}</label>
              <Input className={clsx(`mt-2`)} value={ticketData.user.nameEn} disabled />
            </div>
            <div>
              <label>{i18n._(t`อีเมล`)}</label>
              <Input className={clsx(`mt-2`)} value={ticketData.user.email} disabled />
            </div>
          </div>

          <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
            <div>
              <label>{i18n._(t`แผนกที่ต้องการติดต่อ`)}</label>
              <Input className={clsx(`mt-2`)} value={ticketData.permission} disabled />
            </div>

            <div>
              <label>{i18n._(t`บริการที่ติดต่อ`)}</label>
              <Input className={clsx(`mt-2`)} value={ticketData.product} disabled />
            </div>
          </div>
        </Card>

        {ticketData.ticketMessage.map((item, itemIdx) => (
          <Card key={`message-${itemIdx}`} className={clsx(`space-y-4`)}>
            <div className={clsx(`flex`)}>
              <div className={clsx(`flex items-center space-x-3`)}>
                <div
                  className={clsx(`flex items-center justify-center rounded-full square-12`, {
                    'bg-primary-500': item.user.permission === 'USER',
                    'bg-error': item.user.permission === 'ADMIN',
                  })}
                >
                  {item.user.permission === 'USER' && (
                    <SvgIcon name="quote-mask" className={clsx(`text-white-900 square-6`)} />
                  )}
                  {item.user.permission === 'ADMIN' && (
                    <SvgIcon name="wechat" className={clsx(`text-white-900 square-6`)} />
                  )}
                </div>
                <div>
                  <div className={clsx(`font-medium`)}>{item.user.nameEn}</div>
                  <div className={clsx(`desc`)}>
                    {item.user.permission === 'ADMIN' ? i18n._(t`แอดมิน`) : i18n._(t`ลูกค้า`)}
                  </div>
                </div>
              </div>
              <div className={clsx(`ml-auto font-light`)}>{isMounted && formatDate(new Date(item.user.createdAt))}</div>
            </div>

            <Divider />

            <div className={clsx(`ProseMirror`)} dangerouslySetInnerHTML={{ __html: item.message }}></div>

            {isMounted && item.messageUrl?.length > 0 && (
              <div>
                <div className={clsx(`-ml-2 -mt-2 flex flex-wrap space-x-2 space-y-2`)}>
                  {item.messageUrl.map((image, imageIdx) => (
                    <div
                      key={`image-preview-${imageIdx}`}
                      className={clsx(`group relative overflow-hidden rounded-lg square-44`, {
                        'ml-2 mt-2': imageIdx === 0,
                      })}
                    >
                      <img src={image} alt="" className={clsx(`h-full w-full object-cover`)} />

                      <div
                        className={clsx(
                          `pointer-events-none absolute inset-0 flex cursor-pointer items-center justify-center bg-dark-500/60 opacity-0`,
                          `transition-opacity group-hover:pointer-events-auto group-hover:opacity-100`,
                        )}
                        onClick={() => handleShowPreviewImages(item.messageUrl, imageIdx)}
                      >
                        <SvgIcon name="search" className={clsx(`text-white-900 square-6`)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}

        {!showSendForm && ticketData.status !== TicketStatus.CLOSED && !replyMessageLoading && (
          <div className={clsx(`flex items-center space-x-3`)}>
            <Button
              variant="danger"
              buttonType="icon-text"
              className={clsx(`flex-1`)}
              size="medium"
              onClick={() => setVisibleConfirmEnded(true)}
            >
              <SvgIcon name="check-circle-outline" />
              <span>{i18n._(t`จบการสนทนา`)}</span>
            </Button>
            <Button
              variant="success"
              buttonType="icon-text"
              className={clsx(`flex-1`)}
              size="medium"
              onClick={() => setShowSendForm(true)}
            >
              <SvgIcon name="chat" />
              <span>{i18n._(t`ตอบกลับ`)}</span>
            </Button>
          </div>
        )}

        {showSendForm && (
          <SendTicketForm ticketId={ticketData.id} onSubmit={replyMessage} onCancel={() => setShowSendForm(false)} />
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        visible={previewImages.length > 0}
        closeModal={handleClosePreviewImages}
        images={previewImages}
        currentIndex={currentPreviewIndex}
      />

      {/* Modals */}
      <ConfirmModal
        visible={visibleConfirmEnded}
        title={i18n._(t`ยืนยันจบการสนทนา`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ใช่`)}
        onCancel={() => setVisibleConfirmEnded(false)}
        closeModal={() => setVisibleConfirmEnded(false)}
        onConfirm={closeTicket}
      >
        <p>{i18n._(t`คุณต้องการจบการสนทนา ใช่หรือไม่?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`ข้อความจากผู้ใช้งาน`,
}
