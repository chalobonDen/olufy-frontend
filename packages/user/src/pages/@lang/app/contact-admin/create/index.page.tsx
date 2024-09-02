import { Fragment } from 'react'

import { t } from '@lingui/macro'
import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { DocumentProps } from '@/renderer/types'
import BackButton from '@/components/Client/Buttons/BackButton'
import CreateContactAdminForm from '@/components/Client/Forms/ContactAdmin/CreateForm'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'
import useRouter from '@/hooks/useRouter'
import { TicketService } from '@/services'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()
  const { push } = useRouter()

  // _Mutation
  const { mutate } = useMutation((payload: FormData) => TicketService.create(payload), {
    onMutate: () => {
      setSimplePageLoadingVisible(true)
    },
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
      setSimplePageLoadingVisible(false)
    },
    onSuccess: ({ id }) => {
      setSimplePageLoadingVisible(false)
      toast.success(i18n._(t`ติดต่อเจ้าหน้าที่เรียบร้อยแล้ว`))
      push(`/app/contact-admin/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton as="a" href="/app/contact-admin" />

      <h1 className={clsx(`mt-4 text-header-3`)}>{i18n._(t`ติดต่อเจ้าหน้าที่`)}</h1>

      <Card title={i18n._(t`ข้อความที่ต้องการฝากถึงเจ้าหน้าที่`)} className={clsx(`mt-6`)}>
        <CreateContactAdminForm
          onSubmit={(data) => {
            mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`Contact Admin`,
}
