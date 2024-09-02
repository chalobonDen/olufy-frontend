import { forwardRef, useMemo } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Button, Card, Input } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import type { DropFile } from '@olufy-frontend/shared/UI/Input/DropFile/types'
import { MULTIPLE_OPTIONS as FILES_DEFAULT_OPTIONS } from '@olufy-frontend/shared/UI/Input/DropFile/configs'

import { useUserStore } from '@/stores/user'

import type { ITicketReplyMessage } from '@/types/modules/ticket'

interface IFormValues extends Omit<ITicketReplyMessage, 'ticketId'> {}

interface ISendTicketFormProps {
  ticketId: number
  onSubmit?: (data: FormData) => void
  onCancel?: VoidFunction
}

const SendTicketForm = forwardRef<HTMLDivElement, ISendTicketFormProps>(({ ticketId, onSubmit, onCancel }, ref) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  const initialValues = useMemo((): IFormValues => {
    if (profile) {
      return {
        message: '',
        files: [],
      }
    }

    return {
      message: '',
      files: [],
    }
  }, [profile])

  // _Validation_Schema
  const validationSchema = yup.object().shape({
    message: yup.string().required(`กรุณาเขียนข้อความ`),
  })

  // _Forms
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: !!profile,
    onSubmit: (values) => {
      const formData = new FormData()
      const newValues = snakelizeKeys({
        ...values,
        ticketId,
      })

      Object.entries(newValues).forEach(([key, value]) => {
        if (key === 'files') {
          ;(value as File[]).forEach((image) => {
            formData.append(`${key}[]`, image, image.name)
          })
        } else formData.append(key, value as string)
      })

      onSubmit?.(formData)
    },
  })

  return (
    <Card ref={ref} title={i18n._(t`ตอบกลับ`)}>
      <form className={clsx(`pt-4`)} onSubmit={formik.handleSubmit}>
        <div className={clsx(`grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="name">{i18n._(t`ชื่อ - นามสกุล`)}</label>
            <Input
              id="name"
              name="name"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกชื่อ - นามสกุล`)}
              value={profile?.nameEn}
              disabled
            />
          </div>
          <div>
            <label htmlFor="email">{i18n._(t`อีเมล`)}</label>
            <Input
              id="email"
              name="email"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกอีเมล`)}
              value={profile?.email}
              disabled
            />
          </div>
        </div>

        <div className={clsx(`mt-4`)}>
          <label htmlFor="message">{i18n._(t`เขียนข้อความ`)}</label>
          <Input.TextArea
            id="message"
            name="message"
            className={clsx(`mt-2 [&>textarea]:min-h-[120px]`)}
            value={formik.values.message}
            error={getErrorWithTouched(formik, 'message')}
            onChange={formik.handleChange}
          />
        </div>

        <div className={clsx(`mt-4`)}>
          <label>{i18n._(t`อัพโหลดภาพ`)}</label>
          <p className={clsx(`desc text-body-14`)}>
            {i18n._(t`อัพโหลดได้สูงสุดไม่เกิน ${FILES_DEFAULT_OPTIONS.maxFiles} ไฟล์`)}
          </p>
          <Input.ImageDropFileFormMultiple
            className={clsx(`mt-2`)}
            onDrop={(e: DropFile[]) => {
              formik.setFieldValue('files', e)
            }}
          />
        </div>

        <div className={clsx(`mt-6 flex space-x-3`)}>
          <Button variant="danger" className={clsx(`flex-1`)} size="medium" onClick={() => onCancel?.()}>
            <span>{i18n._(t`ยกเลิก`)}</span>
          </Button>
          <Button variant="success" type="submit" className={clsx(`flex-1`)} size="medium" disabled={!formik.dirty}>
            <span>{i18n._(t`ส่งข้อความ`)}</span>
          </Button>
        </div>
      </form>
    </Card>
  )
})

SendTicketForm.displayName = 'SendTicketForm'

export default SendTicketForm
