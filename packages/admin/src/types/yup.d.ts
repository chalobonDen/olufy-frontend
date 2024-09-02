import { StringSchema } from 'yup'

declare module 'yup' {
  interface StringSchema {
    ipAddress(label: string, length?: number): StringSchema
    duplicateIpv4(label: string): StringSchema
  }
}
