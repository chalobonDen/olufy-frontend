import { t } from '@lingui/macro'
import { isValidFileType } from '@olufy-frontend/shared/utils'
import * as yup from 'yup'

export const validateFieldImage = yup
  .mixed()
  .required(() => t`กรุณาเลือกรูปภาพ`)
  .test(
    'is-valid-type',
    () => t`ประเภทรูปภาพไม่ถูกต้อง`,
    (value) => isValidFileType(value && value.name.toLowerCase(), 'image'),
  )

export const validateFieldPassword = yup
  .string()
  .required(() => t`กรุณากรอกรหัสผ่าน`)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
    () => t`ต้องมีตัวอักษร a-z A-Z และตัวเลข 0-9 อย่างน้อย 1 ตัวอักษร และมีความยาวรวมกันอย่างน้อย 6 ตัวอักษร`,
  )
