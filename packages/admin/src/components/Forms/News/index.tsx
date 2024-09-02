import type { FC } from 'react'
import { useEffect, useRef, useMemo, Fragment } from 'react'

import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, Input } from '@olufy-frontend/shared/UI'
import { getErrorWithTouchedComponent, snakelizeKeys } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { Field, FieldArray, Form, Formik } from 'formik'
import * as yup from 'yup'
import type { DropFile } from '@olufy-frontend/shared/UI/Input/DropFile/types'
import { omit } from 'lodash-es'

import { LOCALES } from '@/constants'
import { validateFieldImage } from '@/utils'

import { Language } from '@/enums'
import type { INewsData } from '@/types/modules/news'

interface IManageNewsFormProps {
  currentLang: Language
  data?: INewsData
  onSubmit?: (payload: FormData) => void
  getClearFiles?: (e: VoidFunction[]) => void
  getForm?: (e: any) => void
}

const ManageNewsForm: FC<IManageNewsFormProps> = ({ currentLang, data, onSubmit, getClearFiles, getForm }) => {
  const { i18n } = useLingui()
  const isEdit = !!data
  const clearFilesRef = useRef<VoidFunction[]>([])

  const validateFieldTitle = yup.string().required(t`กรุณากรอกหัวข้อ`)
  const validateFieldDescription = yup.string().required(t`กรุณากรอกคำอธิบาย`)
  const validateFieldDetail = yup.string().required(t`กรุณากรอกเนื้อหาข่าว`)

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        news: Object.values(Language).map((e) => ({
          title: '',
          description: '',
          detail: '',
          image: null,
          locale: e,
        })),
      } as INewsData
    }

    return {
      news: data?.news?.map((e) => ({
        ...e,
        image: null,
      })),
    }
  }, [data])

  // _Effect
  useEffect(() => {
    if (!!data && clearFilesRef.current) getClearFiles?.(clearFilesRef.current)
  }, [data, getClearFiles])

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={!!initialValues}
      onSubmit={(values: INewsData) => {
        const findValuesActiveLang = values.news.find((e) => e.locale === currentLang)
        const filterValuesOtherLang = values.news
          .filter((e) => e.locale !== currentLang)
          .map((e) => {
            if (Object.values(e).some((e) => !e) && !isEdit)
              return {
                ...e,
                ...omit(findValuesActiveLang, 'locale'),
              }
            return e
          })
        const newValues = [findValuesActiveLang, ...filterValuesOtherLang]
        const formData = new FormData()

        snakelizeKeys(newValues).forEach((value, idx) => {
          for (const key in value) {
            if (value[key])
              if (value[key]?.name) formData.append(`news[${idx}][${key}]`, value[key], value[key].name)
              else formData.append(`news[${idx}][${key}]`, value[key])
          }
        })

        onSubmit?.(formData)
      }}
    >
      {({ values, touched, errors, setFieldValue, handleChange, dirty, ...formik }) => {
        getForm?.(formik)

        return (
          <Form autoComplete="off" className={clsx(`space-y-4`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`รายละเอียดข่าวสาร`)}</h4>

            <FieldArray name="news" validateOnChange={true}>
              {() => (
                <Fragment>
                  {values.news?.map((field, fieldIdx) => {
                    const locale = LOCALES[field.locale]
                    const isActive = currentLang === field.locale

                    const fieldTitle = `news[${fieldIdx}].title`
                    const fieldDescription = `news[${fieldIdx}].description`
                    const fieldDetail = `news[${fieldIdx}].detail`
                    const fieldImage = `news[${fieldIdx}].image`

                    return (
                      <div
                        key={fieldIdx}
                        className={clsx([
                          `space-y-4`,
                          {
                            hidden: !isActive,
                          },
                        ])}
                      >
                        <div>
                          <label htmlFor={fieldTitle}>
                            {i18n._(t`หัวข้อ`)} ({locale})
                          </label>
                          <Field
                            as={Input}
                            id={fieldTitle}
                            name={fieldTitle}
                            className={clsx(`mt-2`)}
                            placeholder={i18n._(t`กรอกหัวข้อ`)}
                            onChange={handleChange}
                            value={field.title}
                            error={getErrorWithTouchedComponent(errors, touched, fieldTitle)}
                            validate={async (value: string) => {
                              if (!isActive) return
                              try {
                                await validateFieldTitle.validate(value)
                              } catch (err: any) {
                                return err.message
                              }
                            }}
                          />
                        </div>

                        <div>
                          <label htmlFor={fieldDescription}>
                            {i18n._(t`คำอธิบาย`)} ({locale})
                          </label>
                          <Field
                            as={Input}
                            id={fieldDescription}
                            name={fieldDescription}
                            className={clsx(`mt-2`)}
                            placeholder={i18n._(t`กรอกคำอธิบาย`)}
                            onChange={handleChange}
                            value={field.description}
                            error={getErrorWithTouchedComponent(errors, touched, fieldDescription)}
                            validate={async (value: string) => {
                              if (!isActive) return
                              try {
                                await validateFieldDescription.validate(value)
                              } catch (err: any) {
                                return err.message
                              }
                            }}
                          />
                        </div>

                        <div>
                          <label htmlFor={fieldDetail}>
                            {i18n._(t`เนื้อหาข่าว`)} ({locale})
                          </label>

                          <Field
                            as={Input.RichTextEditor}
                            id={fieldDetail}
                            name={fieldDetail}
                            className={clsx(`mt-2`)}
                            value={field.detail}
                            onChange={(e: string) => {
                              setFieldValue(fieldDetail, e)
                            }}
                            error={getErrorWithTouchedComponent(errors, touched, fieldDetail)}
                            validate={async (value) => {
                              if (!isActive) return
                              try {
                                await validateFieldDetail.validate(value)
                              } catch (err: any) {
                                return err.message
                              }
                            }}
                          />
                        </div>

                        <div>
                          <label htmlFor={fieldImage} className={clsx(`space-x-1`)}>
                            <Trans>
                              <span>รูปภาพประกอบ</span>
                              <span className={clsx(`text-red-500`)}>(1280 x 550 หรือ 21:9 ratio ที่แนะนำ)</span>
                              <span>({locale})</span>
                            </Trans>
                          </label>
                          <Field
                            as={Input.ImageDropFileForm}
                            name={fieldImage}
                            className={clsx(`mt-2 aspect-[21/9] max-w-[1280px]`)}
                            objectFit="cover"
                            value={undefined}
                            onDrop={(e: DropFile[]) => {
                              setFieldValue(fieldImage, e[0])
                            }}
                            validate={async (value: string) => {
                              if (!isActive || isEdit) return
                              try {
                                await validateFieldImage.validate(value)
                              } catch (err: any) {
                                return err.message
                              }
                            }}
                            error={getErrorWithTouchedComponent(errors, touched, fieldImage)}
                            preview={data?.news?.find((e) => e.locale === currentLang)?.image}
                            getRemoveFileEvent={(e) => clearFilesRef.current.push(e)}
                          />
                        </div>
                      </div>
                    )
                  })}
                </Fragment>
              )}
            </FieldArray>

            <div className={clsx(`mt-8 flex justify-end space-x-4`)}>
              <Button as="a" href="/app/news" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
                <span>{i18n._(t`ยกเลิก`)}</span>
              </Button>
              <Button variant="success" size="medium" type="submit" disabled={!dirty} className={clsx(`flex-1`)}>
                <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มข่าวสาร`)}</span>
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ManageNewsForm
