import { Fragment, useRef, useState } from 'react'

import { Card } from '@olufy-frontend/shared/UI'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import BackButton from '@/components/Buttons/BackButton'
import LanguageSelect from '@/components/Selects/LanguageSelect'
import { DEFAULT_LANG } from '@/constants'
import ManageNewsForm from '@/components/Forms/News'
import type { DocumentProps } from '@/renderer/types'
import { useBackofficeLayout } from '@/hooks/useBackofficeLayout'
import { NewsService } from '@/services'
import { handleAxiosErrorMsg } from '@/libs/axios'

import type { Language } from '@/enums'
import type { INewsData } from '@/types/modules/news'

interface IPageProps {
  data: INewsData
  id: string
}

export const Page = ({ data, id }: IPageProps) => {
  const { i18n } = useLingui()
  const { setSimplePageLoadingVisible, scrollToTop } = useBackofficeLayout()
  const clearFilesRef = useRef<VoidFunction[]>([])
  const formRef = useRef<any>()

  // _State
  const [language, setLanguage] = useState<Language>(DEFAULT_LANG)
  const [updatedData, setUpdatedData] = useState<INewsData | null>(null)

  // _Mutation
  const { mutate } = useMutation((formData: FormData) => NewsService.update(id, formData), {
    onMutate: () => {
      setSimplePageLoadingVisible(true)
    },
    onError: (err) => {
      const msg = handleAxiosErrorMsg(err)
      toast.error(msg)
      setSimplePageLoadingVisible(false)
    },
    onSuccess: (res) => {
      setSimplePageLoadingVisible(false)
      toast.success(i18n._(t`บันทึกสำเร็จ`))
      scrollToTop()

      // Clear files on updated!!
      if (clearFilesRef.current) clearFilesRef.current.forEach((e) => e?.())
      if (formRef.current) formRef.current.resetForm()

      // Set update data
      setUpdatedData(res)
    },
  })

  // _Events
  const transformData = (e: INewsData): INewsData => {
    return {
      news: e.news.map((e) => ({
        title: e.title,
        locale: e.locale,
        id: e.id,
        image: e?.imageUrl,
        description: e.description,
        detail: e.detail,
      })),
    }
  }

  return (
    <Fragment>
      <BackButton onClick={() => history.back()} />

      <Card
        title={i18n._(t`แก้ไขข่าวสาร`)}
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
          data={transformData(updatedData ?? data)}
          onSubmit={(formData) => {
            mutate(formData)
          }}
          getClearFiles={(e) => (clearFilesRef.current = e)}
          getForm={(e) => (formRef.current = e)}
        />
      </Card>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: t`จัดการข่าวสาร`,
}
