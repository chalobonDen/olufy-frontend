import { t } from '@lingui/macro'
import { isValidFileType } from '@olufy-frontend/shared/utils'
import { range } from 'lodash-es'
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

export const initValidateIpAddress = () => {
  yup.addMethod(yup.string, 'ipAddress', function (label = 'Label', length = 4) {
    return this.test(
      'check-ip-number',
      () => t`หมายเลข ${label} แต่ละตำแหน่งต้องอยู่ระหว่าง 0 - 255`,
      (value) => value?.split('.')?.every((e) => Number(e) >= 0 && Number(e) <= 255),
    ).test(
      'check-ip-position',
      () => t`หมายเลข ${label} ต้องมี ${length} ตำแหน่ง`,
      (value) => value?.split('.')?.filter((e) => !!e)?.length === length,
    )
  })

  yup.addMethod(yup.string, 'duplicateIpv4', function (label = 'Label') {
    return this.test(
      'check-duplicate-ipv4',
      () => t`หมายเลข ${label} ต้องไม่ซ้ำ IPV4`,
      (value, context) => {
        const { ipStart, ipEnd, ipv4 } = context.parent
        if (isNaN(Number(ipStart)) || isNaN(Number(ipEnd)) || !ipv4) return true
        else {
          const generateData = range(Number(ipStart), Number(ipEnd) + 1).map((n) => `${ipv4}.${n}`)
          return !generateData.includes(value)
        }
      },
    )
  })
}
