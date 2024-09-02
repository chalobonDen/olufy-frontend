import { Fragment, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { navigate } from 'vite-plugin-ssr/client/router'
import { toast } from 'react-hot-toast'

import BackButton from '@/components/Buttons/BackButton'
import LanguageSelect from '@/components/Selects/LanguageSelect'
import { DEFAULT_LANG } from '@/constants'
import ManageNewsForm from '@/components/Forms/News'
import type { DocumentProps } from '@/renderer/types'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { handleAxiosErrorMsg } from '@/libs/axios'
import { NewsService } from '@/services'

import type { Language } from '@/enums'

export const Page = () => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()

  // _State
  const [language, setLanguage] = useState<Language>(DEFAULT_LANG)

  // _Mutation
  const { mutate } = useMutation((payload: FormData) => NewsService.create(payload), {
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
      toast.success(i18n._(t`เพิ่มข่าวสารสำเร็จ`))
      navigate(`/app/news/${id}`)
      scrollToTop()
    },
  })

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card
        title={i18n._(t`เพิ่มข่าวสาร`)}
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
        <ManageNewsForm
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
  title: t`จัดการข่าวสาร`,
}
