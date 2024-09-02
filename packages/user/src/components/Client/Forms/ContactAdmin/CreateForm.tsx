import type { FC } from 'react'
import { useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { Divider, Input } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched, snakelizeKeys } from '@olufy-frontend/shared/utils'
import type { DropFile } from '@olufy-frontend/shared/UI/Input/DropFile/types'
import * as yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import { MULTIPLE_OPTIONS as FILES_DEFAULT_OPTIONS } from '@olufy-frontend/shared/UI/Input/DropFile/configs'

import { useUserStore } from '@/stores/user'
import Button from '@/components/Button'
import { TicketService } from '@/services'

import type { IManageTicket } from '@/types/modules/ticket'

interface ICreateContactAdminFormProps {
  onSubmit?: (data: FormData) => void
}

const CreateContactAdminForm: FC<ICreateContactAdminFormProps> = ({ onSubmit }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _Query
  const { data: info, isLoading: isInfoLoading } = useQuery([], ({ signal }) => TicketService.info({ signal }), {
    enabled: !!profile,
  })

  // _Memo
  const initialValues = useMemo((): IManageTicket => {
    return {
      title: '',
      permissionId: undefined,
      productId: undefined,
      message: '',
      files: [],
    }
  }, [])

  // _Validation_Schema
  const validationSchema = yup.object().shape({
    title: yup.string().required(t`กรุณากรอกชื่อเรื่อง`),
    permissionId: yup.string().required(t`กรุณาเลือกแผนก`),
    productId: yup.string().required(t`กรุณาเลือกบริการหรือสินค้าที่เกี่ยวข้อง`),
    message: yup.string().required(`กรุณาเขียนข้อความ`),
  })

  // _Forms
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: !!profile,
    onSubmit: (values) => {
      const formData = new FormData()
      const newValues = snakelizeKeys(values) as IManageTicket

      Object.entries(newValues).forEach(([key, value]) => {
        if (key === 'files') {
          ;(value as File[]).forEach((image) => {
            formData.append(`${key}[]`, image, image.name)
          })
        } else formData.append(key, value)
      })

      onSubmit?.(formData)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={clsx(`grid grid-cols-2 gap-4 pt-4`, `sm:grid-cols-1`)}>
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
      <Divider className={clsx(`mt-4`)} />
      <div className={clsx(`mt-4`)}>
        <label htmlFor="title">{i18n._(t`ชื่อเรื่อง`)}</label>
        <Input
          id="title"
          name="title"
          className={clsx(`mt-2`)}
          placeholder={i18n._(t`กรอกชื่อเรื่อง`)}
          onChange={formik.handleChange}
          value={formik.values.title}
          error={getErrorWithTouched(formik, 'title')}
        />
      </div>
      <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
        <div>
          <label htmlFor="permissionId">{i18n._(t`แผนก`)}</label>
          <Input.Select
            id="permissionId"
            name="permissionId"
            className={clsx(`mt-2`)}
            onChange={formik.handleChange}
            value={formik.values.permissionId}
            error={getErrorWithTouched(formik, 'permissionId')}
            disabled={isInfoLoading}
          >
            <option value="">{i18n._(t`เลือกแผนก`)}</option>
            {info?.permission?.map((permission, permissionIdx) => (
              <option key={`permission-${permissionIdx}`} value={permission.id}>
                {permission.name}
              </option>
            ))}
          </Input.Select>
        </div>

        <div>
          <label htmlFor="productId">{i18n._(t`เลือกบริการหรือสินค้าที่เกี่ยวข้อง`)}</label>
          <Input.Select
            id="productId"
            name="productId"
            className={clsx(`mt-2`)}
            onChange={formik.handleChange}
            value={formik.values.productId}
            error={getErrorWithTouched(formik, 'productId')}
            disabled={isInfoLoading}
          >
            <option value="">{i18n._(t`เลือกบริการ`)}</option>
            {info?.product?.map((product, productIdx) => (
              <option key={`product-${productIdx}`} value={product.id}>
                {product.name}
              </option>
            ))}
          </Input.Select>
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
        <Button as="a" href="/app/contact-admin" variant="danger" className={clsx(`flex-1`)} size="medium">
          <span>{i18n._(t`ยกเลิก`)}</span>
        </Button>
        <Button
          variant="success"
          type="submit"
          className={clsx(`flex-1`)}
          size="medium"
          disabled={!formik.dirty || isInfoLoading}
        >
          <span>{i18n._(t`ส่งข้อความ`)}</span>
        </Button>
      </div>
    </form>
  )
}

export default CreateContactAdminForm
