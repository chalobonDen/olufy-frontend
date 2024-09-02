import { useState, Fragment, useMemo } from 'react'

import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { Card, Divider, SvgIcon } from '@olufy-frontend/shared/UI'
import Lightbox from '@olufy-frontend/shared/UI/Lightbox'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import { formatDate } from '@/utils'
import { useIsMounted } from '@/hooks/useIsMounted'
import SendContactAdminForm from '@/components/Client/Forms/ContactAdmin/SendForm'
import { TicketService } from '@/services'
import Button from '@/components/Button'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { ITicket } from '@/types/modules/ticket'
import { TicketStatus } from '@/enums/ticket'

interface IPageProps {
  id: string
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

  // _Events
  const handleShowPreviewImages = (images: string[], idx: number) => {
    setPreviewImages(images)
    setCurrentPreviewIndex(idx)
  }

  const handleClosePreviewImages = () => {
    setPreviewImages([])
    setCurrentPreviewIndex(0)
  }

  return (
    <Fragment>
      <BackButton as="a" href="/app/contact-admin" />

      <h1 className={clsx(`mt-4 text-header-3`)}>
        #{ticketData.id} : {ticketData.title}
      </h1>

      <div className={clsx(`mt-6 space-y-4`)}>
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

            {item.messageUrl?.length > 0 && (
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
              variant="primary-solid"
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
          <SendContactAdminForm
            ticketId={ticketData.id}
            onSubmit={replyMessage}
            onCancel={() => setShowSendForm(false)}
          />
        )}
      </div>

      <Lightbox
        visible={previewImages.length > 0}
        closeModal={handleClosePreviewImages}
        images={previewImages}
        currentIndex={currentPreviewIndex}
      />
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Contact Admin`,
}
