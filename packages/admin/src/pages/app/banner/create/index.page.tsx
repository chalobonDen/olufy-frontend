import { Fragment, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { navigate } from 'vite-plugin-ssr/client/router'

import BackButton from '@/components/Buttons/BackButton'
import LanguageSelect from '@/components/Selects/LanguageSelect'
import ManageBannerForm from '@/components/Forms/Banner'
import { DEFAULT_LANG } from '@/constants'
import type { DocumentProps } from '@/renderer/types'
import { BannerService } from '@/services'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { Language } from '@/enums'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [language, setLanguage] = useState<Language>(DEFAULT_LANG)

  // _Mutation
  const { mutate } = useMutation((payload: FormData) => BannerService.create(payload), {
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
      toast.success(i18n._(t`เพิ่มแบนเนอร์สำเร็จ`))
      navigate(`/app/banner/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card
        title={i18n._(t`เพิ่มแบนเนอร์`)}
        className={clsx(`mt-6`)}
        headerRight={
          <LanguageSelect
            value={language}
            getDefaultValue={(e) => {
              setLanguage(e as Language)
            }}
            onChange={(e) => {
              setLanguage(e.target.value as Language)
            }}
          />
        }
        hasDivider
      >
        <ManageBannerForm
          currentLang={language}
          onSubmit={(data) => {
            mutate(data)
          }}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการแบนเนอร์`,
}
