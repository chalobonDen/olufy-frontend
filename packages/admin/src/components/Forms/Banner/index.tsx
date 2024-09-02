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
import type { IBanners } from '@/types/modules/banner'

interface IManageBannerFormProps {
  currentLang: Language
  data?: IBanners
  onSubmit?: (payload: FormData) => void
  getClearFiles?: (e: VoidFunction[]) => void
  getForm?: (e: any) => void
}

const ManageBannerForm: FC<IManageBannerFormProps> = ({ currentLang, data, onSubmit, getClearFiles, getForm }) => {
  const { i18n } = useLingui()
  const isEdit = !!data
  const clearFilesRef = useRef<VoidFunction[]>([])

  const validateFieldTitle = yup.string().required(t`กรุณากรอกชื่อแบนเนอร์`)
  const validateFieldUrl = yup
    .string()
    .url(t`URL ไม่ถูกต้อง`)
    .required(t`กรุณากรอก URL Link`)

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        banners: Object.values(Language).map((e) => ({
          title: '',
          imageDesktop: null,
          imageMobile: null,
          url: '',
          locale: e,
        })),
      } as IBanners
    }

    return {
      banners: data?.banners?.map((e) => ({
        ...e,
        imageDesktop: null,
        imageMobile: null,
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
      onSubmit={(values: IBanners) => {
        const findValuesActiveLang = values.banners.find((e) => e.locale === currentLang)
        const filterValuesOtherLang = values.banners
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
              if (value[key]?.name) formData.append(`banners[${idx}][${key}]`, value[key], value[key].name)
              else formData.append(`banners[${idx}][${key}]`, value[key])
          }
        })

        onSubmit?.(formData)
      }}
    >
      {({ values, touched, errors, setFieldValue, handleChange, dirty, ...formik }) => {
        getForm?.(formik)

        return (
          <Form autoComplete="off" className={clsx(`space-y-4`)}>
            <h4 className={clsx(`text-header-4`)}>{i18n._(t`รายละเอียดแบนเนอร์`)}</h4>

            <FieldArray name="banners" validateOnChange={true}>
              {() => (
                <Fragment>
                  {values.banners?.map((field, fieldIdx) => {
                    const locale = LOCALES[field.locale]
                    const isActive = currentLang === field.locale

                    const fieldTitle = `banners[${fieldIdx}].title`
                    const fieldImageDesktop = `banners[${fieldIdx}].imageDesktop`
                    const fieldImageMobile = `banners[${fieldIdx}].imageMobile`
                    const fieldUrl = `banners[${fieldIdx}].url`

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
                            {i18n._(t`ชื่อแบนเนอร์`)} ({locale})
                          </label>
                          <Field
                            as={Input}
                            id={fieldTitle}
                            name={fieldTitle}
                            className={clsx(`mt-2`)}
                            placeholder={i18n._(t`กรอกชื่อแบนเนอร์`)}
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
                          <label htmlFor={fieldImageDesktop} className={clsx(`space-x-1`)}>
                            <Trans>
                              <span>อัพโหลดรูปภาพแบนเนอร์</span>
                              <span className={clsx(`text-red-500`)}>(Desktop 1110 x 300 ที่แนะนำ)</span>
                              <span>({locale})</span>
                            </Trans>
                          </label>
                          <Field
                            as={Input.ImageDropFileForm}
                            name={fieldImageDesktop}
                            className={clsx(`mt-2 aspect-[37/10] max-w-[1110px]`, `sm:aspect-[21/9]`)}
                            objectFit="cover"
                            value={undefined}
                            onDrop={(e: DropFile[]) => {
                              setFieldValue(fieldImageDesktop, e[0])
                            }}
                            onDelete={() => {
                              setFieldValue(fieldImageDesktop, null)
                            }}
                            validate={async (value: string) => {
                              if (!isActive || isEdit) return
                              try {
                                await validateFieldImage.validate(value)
                              } catch (err: any) {
                                return err.message
                              }
                            }}
                            error={getErrorWithTouchedComponent(errors, touched, fieldImageDesktop)}
                            preview={data?.banners?.find((e) => e.locale === currentLang).imageDesktop}
                            getRemoveFileEvent={(e) => clearFilesRef.current.push(e)}
                          />
                        </div>

                        <div>
                          <label htmlFor={fieldImageMobile} className={clsx(`space-x-1`)}>
                            <Trans>
                              <span>อัพโหลดรูปภาพแบนเนอร์</span>
                              <span className={clsx(`text-red-500`)}>(Mobile 420 x 180 ที่แนะนำ)</span>
                              <span>({locale})</span>
                            </Trans>
                          </label>
                          <Field
                            as={Input.ImageDropFileForm}
                            name={fieldImageMobile}
                            className={clsx(`mt-2 aspect-[21/9] max-w-[420px]`)}
                            objectFit="cover"
                            value={undefined}
                            onDrop={(e: DropFile[]) => {
                              setFieldValue(fieldImageMobile, e[0])
                            }}
                            onDelete={() => {
                              setFieldValue(fieldImageMobile, null)
                            }}
                            validate={async (value: string) => {
                              if (!isActive || isEdit) return
                              try {
                                await validateFieldImage.validate(value)
                              } catch (err: any) {
                                return err.message
                              }
                            }}
                            error={getErrorWithTouchedComponent(errors, touched, fieldImageMobile)}
                            preview={data?.banners?.find((e) => e.locale === currentLang).imageMobile}
                            getRemoveFileEvent={(e) => clearFilesRef.current.push(e)}
                          />
                        </div>

                        <div>
                          <label htmlFor={fieldUrl}>
                            {i18n._(t`URL Link`)} ({locale})
                          </label>
                          <Field
                            as={Input}
                            id={fieldUrl}
                            name={fieldUrl}
                            className={clsx(`mt-2`)}
                            placeholder={i18n._(t`https://example.com or http://example.com`)}
                            onChange={handleChange}
                            value={field.url}
                            error={getErrorWithTouchedComponent(errors, touched, fieldUrl)}
                            validate={async (value: string) => {
                              if (!isActive) return
                              try {
                                await validateFieldUrl.validate(value)
                              } catch (err: any) {
                                return err.message
                              }
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </Fragment>
              )}
            </FieldArray>

            <div className={clsx(`mt-8 flex justify-end space-x-4`)}>
              <Button as="a" href="/app/banner" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
                <span>{i18n._(t`ยกเลิก`)}</span>
              </Button>
              <Button variant="success" size="medium" type="submit" disabled={!dirty} className={clsx(`flex-1`)}>
                <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มแบนเนอร์`)}</span>
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ManageBannerForm
