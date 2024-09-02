import type { FC } from 'react'
import React, { Fragment, useState, useMemo } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { Button, Checkbox, Divider, Input } from '@olufy-frontend/shared/UI'
import { useFormik } from 'formik'

enum SettingType {
  STANDARD = 'standard',
  CUSTOM = 'custom',
}

interface IFormValues {
  nameFirst: string
  nameSecond: string
  nameThird: string
  nameFourth: string
  nameFifth: string
}

interface IDomainNameServerProps {
  data?: IFormValues
}

const DomainNameServer: FC<IDomainNameServerProps> = ({ data }) => {
  const { i18n } = useLingui()

  const [setting, setSetting] = useState(SettingType.STANDARD)

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return { nameFirst: '', nameSecond: '', nameThird: '', nameFourth: '', nameFifth: '' } as IFormValues
    }

    return data
  }, [data])

  // _Formik
  const formik = useFormik({
    initialValues,
    // validationSchema: isEdit ? editValidationSchema : validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className={clsx(`p-6`)}>
      <span className={clsx(`text-header-4`, `sm:text-header-5`)}>Nameservers</span>
      <span className={clsx(`ml-2 font-light text-primary-500`, `sm:text-body-14 sm:font-light`)}>
        {i18n._(t` คุณสามารถเปลี่ยน Nameservers เพื่อชี้ไปยังโฮสต์อื่นได้ การเปลี่ยนแต่ละครั้งจะใช้เวลาในการอัพเดตไปยังที่ใหม่
            ประมาณ 12-48 ชม.`)}
      </span>

      <Divider className={clsx(`mt-4`)} />

      <Checkbox
        className={clsx(`mt-4 w-fit self-center`)}
        checked={setting === SettingType.STANDARD}
        value={setting}
        onChange={() => setSetting(SettingType.STANDARD)}
      >
        <span className={clsx(`font-light`)}>{i18n._(t`ใช้ค่า Nameservers มาตรฐาน`)}</span>
      </Checkbox>
      <Checkbox
        className={clsx(`mt-3 w-fit self-center`)}
        checked={setting === SettingType.CUSTOM}
        value={setting}
        onChange={() => setSetting(SettingType.CUSTOM)}
      >
        <span className={clsx(`font-light`)}>{i18n._(t`ปรับแต่ง Nameservers เอง (ใส่รายการ Nameservers ในช่อง)`)}</span>
      </Checkbox>

      {setting === SettingType.CUSTOM && (
        <Fragment>
          <Divider className={clsx(`mt-4`)} />

          <form onSubmit={formik.handleSubmit}>
            <h3 className={clsx(`mt-4 text-header-4`)}>Nameservers</h3>

            {Object.entries(initialValues).map(([key, _val], idx) => (
              <div className={clsx(`mt-2`)} key={idx}>
                <label htmlFor={key}>{i18n._(t`Nameserver ${idx + 1}`)}</label>
                <Input
                  className={clsx(`mt-2`)}
                  id={key}
                  name={key}
                  onChange={formik.handleChange}
                  value={formik.values[key]}
                  disabled={true}
                />
              </div>
            ))}

            <Button variant="success" type="submit" className={clsx(`mt-6 w-full`)} size="medium">
              <span className={clsx(`text-header-5`)}>{i18n._(t`เปลี่ยน Nameservers`)}</span>
            </Button>
          </form>
        </Fragment>
      )}
    </div>
  )
}

export default DomainNameServer
