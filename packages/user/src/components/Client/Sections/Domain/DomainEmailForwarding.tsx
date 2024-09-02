import { useMemo } from 'react'

import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { Button, Divider, Input } from '@olufy-frontend/shared/UI'

interface IFormValues {
  prefix: string
  forwardTo: string
}

const DomainEmailForwarding = () => {
  const { i18n } = useLingui()

  // _Memo
  const initialValues = useMemo(() => {
    return { prefix: '', forwardTo: '' } as IFormValues
  }, [])

  // _Formik
  const formik = useFormik({
    initialValues,
    // validationSchema: isEdit ? editValidationSchema : validationSchema,
    // enableReinitialize: !!data,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className={clsx(`p-6`)}>
      <div
        className={clsx(
          `rounded-lg border border-info bg-info/10 p-4 font-light text-info`,
          `sm:text-body-14 sm:font-light`,
        )}
      >
        {i18n._(
          t`If the Email Forwarding Server determines the Forward To address is invalid, we will disable the forwarding record automatically. Please check the Forward To address before you enable it again. The changes on any existing forwarding record may not take effect for up to 1 hour.`,
        )}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <h2 className={clsx(`mt-6 text-header-3`)}>Email Forwarding</h2>
        <Divider className={clsx(`mt-4`)} />

        <div className={clsx(`mt-2`)}>
          <label htmlFor="prefix">{i18n._(t`Prefix`)}</label>
          <Input
            className={clsx(`mt-2`)}
            id="prefix"
            name="prefix"
            onChange={formik.handleChange}
            value={formik.values.prefix}
            disabled={true}
          />
        </div>
        <div className={clsx(`mt-4`)}>
          <label htmlFor="forwardTo">{i18n._(t`Forward To`)}</label>
          <Input
            className={clsx(`mt-2`)}
            id="forwardTo"
            name="forwardTo"
            onChange={formik.handleChange}
            value={formik.values.forwardTo}
            disabled={true}
          />
        </div>

        <Button variant="success" type="submit" className={clsx(`mt-6 w-full`)} size="medium">
          <span className={clsx(`text-header-5`)}>{i18n._(t`บันทึก`)}</span>
        </Button>
      </form>
    </div>
  )
}

export default DomainEmailForwarding
