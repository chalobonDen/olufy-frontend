import type { FC } from 'react'
import { useEffect, useRef, Fragment, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import { t, Trans } from '@lingui/macro'
import { Button, Input } from '@olufy-frontend/shared/UI'
import clsx from 'clsx'
import { getErrorWithTouched, snakelizeKeys } from '@olufy-frontend/shared/utils'
import type { DropFile } from '@olufy-frontend/shared/UI/Input/DropFile/types'
import * as yup from 'yup'
import { addDays } from 'date-fns'

import { validateFieldImage } from '@/utils'

import type { IPartner } from '@/types/modules/partner'

interface IManagePartnerFormProps {
  data?: IPartner
  onSubmit?: (payload: FormData) => void
  getClearFiles?: (e: VoidFunction[]) => void
  getForm?: (e: any) => void
}

const endDate = new Date(addDays(new Date(), 1))

const ManagePartnerForm: FC<IManagePartnerFormProps> = ({ data, onSubmit, getClearFiles, getForm }) => {
  const { i18n } = useLingui()
  const isEdit = !!data
  const clearFilesRef = useRef<VoidFunction[]>([])

  const defaultSchema = {
    name: yup.string().required(t`กรุณากรอกชื่อพาร์ทเนอร์`),
    endDate: yup.string().required(t`กรุณาเลือกวันที่สิ้นสุด`),
  }

  const validationSchema = yup.object().shape({
    ...defaultSchema,
    fileLight: validateFieldImage,
    fileDark: validateFieldImage,
  })

  const editValidationSchema = yup.object().shape({
    ...defaultSchema,
  })

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        name: '',
        endDate,
        fileDark: null,
        fileLight: null,
      } as IPartner
    }

    return {
      ...data,
      fileDark: null,
      fileLight: null,
    }
  }, [data])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema: isEdit ? editValidationSchema : validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      const newValues = snakelizeKeys(values)
      const formData = new FormData()

      for (const key in newValues) {
        if (newValues[key])
          if (newValues[key]?.name) formData.append(key, newValues[key], newValues[key].name)
          else formData.append(key, newValues[key])
      }

      onSubmit?.(formData)
    },
  })

  // _Effect
  useEffect(() => {
    if (!!data && clearFilesRef.current) getClearFiles?.(clearFilesRef.current)
  }, [data, getClearFiles])

  useEffect(() => {
    getForm?.(formik)
  }, [formik, getForm])

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h4 className={clsx(`text-header-4`)}>{i18n._(t`รายละเอียดพาร์ทเนอร์`)}</h4>

        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="name">{i18n._(t`ชื่อพาร์ทเนอร์`)}</label>
            <Input
              id="name"
              name="name"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอกชื่อพาร์ทเนอร์`)}
              onChange={formik.handleChange}
              value={formik.values.name}
              error={getErrorWithTouched(formik, 'name')}
            />
          </div>

          <div>
            <label htmlFor="endDate">{i18n._(t`วันที่สิ้นสุด`)}</label>
            <Input.DatePicker
              name="endDate"
              className={clsx(`mt-2`)}
              selected={formik.values.endDate}
              minDate={endDate}
              onChange={(val) => {
                formik.setFieldValue('endDate', val)
              }}
              error={getErrorWithTouched(formik, 'endDate')}
            />
          </div>

          <div>
            <label htmlFor="fileLight" className={clsx(`space-x-1`)}>
              <Trans>
                <span>อัพโหลดรูปภาพพาร์ทเนอร์</span>
                <span className={clsx(`text-red-500`)}>(Light)</span>
              </Trans>
            </label>
            <Input.ImageDropFileForm
              key="fileLight"
              name="fileLight"
              className={clsx(`mt-2 aspect-[11/6]`)}
              objectFit="contain"
              value={undefined}
              onDrop={(e: DropFile[]) => {
                formik.setFieldValue('fileLight', e[0])
              }}
              onDelete={() => {
                formik.setFieldValue('fileLight', null)
              }}
              error={getErrorWithTouched(formik, 'fileLight')}
              preview={data?.fileLight}
              getRemoveFileEvent={(e) => clearFilesRef.current.push(e)}
            />
          </div>

          <div>
            <label htmlFor="fileDark" className={clsx(`space-x-1`)}>
              <Trans>
                <span>อัพโหลดรูปภาพพาร์ทเนอร์</span>
                <span className={clsx(`text-red-500`)}>(Dark)</span>
              </Trans>
            </label>
            <Input.ImageDropFileForm
              key="fileDark"
              name="fileDark"
              className={clsx(`mt-2 aspect-[11/6]`)}
              objectFit="contain"
              value={undefined}
              onDrop={(e: DropFile[]) => {
                formik.setFieldValue('fileDark', e[0])
              }}
              onDelete={() => {
                formik.setFieldValue('fileDark', null)
              }}
              error={getErrorWithTouched(formik, 'fileDark')}
              preview={data?.fileDark}
              getRemoveFileEvent={(e) => clearFilesRef.current.push(e)}
            />
          </div>
        </div>

        <div className={clsx(`mt-8 flex justify-end space-x-4`)}>
          <Button as="a" href="/app/partner" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
            <span>{i18n._(t`ยกเลิก`)}</span>
          </Button>
          <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
            <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่มพาร์ทเนอร์`)}</span>
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default ManagePartnerForm
