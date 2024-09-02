import type { FC } from 'react'
import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Input } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'

import DataCenterSelect from '@/components/Selects/DataCenterSelect'
import StatusIpSelect from '@/components/Selects/StatusIpSelect'
import { initValidateIpAddress } from '@/utils'
import MemberShipSelect from '@/components/Selects/MemberShipSelect'

import type { IInternetProtocol } from '@/types/modules/ip'
import type { IDataCenterRackItem } from '@/types/modules/data-center'

interface IInternetProtocolFormProps {
  data?: IInternetProtocol
  onSubmit?: (payload: IInternetProtocol) => void
  readonly?: boolean
}

const ManageInternetProtocolForm: FC<IInternetProtocolFormProps> = ({ data, readonly, onSubmit }) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  //_State
  const [racks, setRacks] = useState<IDataCenterRackItem[]>([])

  // _Validation yup
  initValidateIpAddress()

  const validationSchema = yup.object().shape({
    dataCenterId: yup.string().required(t`กรุณาเลือก Data Center`),
    rackId: yup.string().required(t`กรุณาเลือก Rack`),
    ipv4: yup
      .string()
      .required(t`กรุณากรอก IPV4`)
      .ipAddress('IPV4'),
    subnet: yup.string().required(t`กรุณากรอก Subnet`),
    subnetMask: yup
      .string()
      .required(t`กรุณากรอก Subnetmask`)
      .ipAddress('Subnetmask'),
    gateway: yup
      .string()
      .required(t`กรุณากรอก Gateway`)
      .test(
        'gateway-duplicate-dns1',
        t`หมายเลข Gateway ต้องไม่ซ้ำกับ DNS`,
        (value, context) => value !== context.parent.dns1 && value !== context.parent.dns2,
      )
      .ipAddress('Gateway')
      .duplicateIpv4('Gateway'),
    dns1: yup
      .string()
      .required(t`กรุณากรอก DNS 1`)
      .test(
        'dns1-duplicate-gateway',
        t`หมายเลข DNS 1 ต้องไม่ซ้ำกับ Gateway`,
        (value, context) => value !== context.parent.gateway,
      )
      .ipAddress('DNS 1')
      .duplicateIpv4('DNS 1'),
    dns2: yup
      .string()
      .required(t`กรุณากรอก DNS 2`)
      .test(
        'dns2-duplicate-gateway',
        t`หมายเลข DNS 2 ต้องไม่ซ้ำกับ Gateway`,
        (value, context) => value !== context.parent.gateway,
      )
      .ipAddress('DNS 2')
      .duplicateIpv4('DNS 2'),
    rankId: yup
      .string()
      .nullable()
      .required(t`กรุณาเลือกระดับสมาชิก`),
    flag: yup
      .string()
      .nullable()
      .required(t`กรุณาเลือกสถานะการใช้`),
  })

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        dataCenterId: '',
        rackId: '',
        ipv4: '',
        subnet: '',
        subnetMask: '',
        gateway: '',
        dns1: '',
        dns2: '',
        rankId: null,
        flag: null,
      } as IInternetProtocol
    }

    return {
      ...data,
    }
  }, [data])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      onSubmit?.(values)
    },
  })

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <h4 className={clsx(`text-header-4`)}>{i18n._(t`ข้อมูล IP`)}</h4>

          <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
            <div>
              <label htmlFor="dataCenterId">Data Center</label>
              <DataCenterSelect
                id="dataCenterId"
                name="dataCenterId"
                className={clsx(`mt-2`)}
                value={formik.values.dataCenterId}
                onChange={(e) => {
                  formik.setFieldValue('dataCenterId', e.target.value)
                  formik.setFieldValue('rackId', '')
                }}
                onGetRacks={setRacks}
                error={getErrorWithTouched(formik, 'dataCenterId')}
              />
            </div>

            <div>
              <label htmlFor="rackId">Rack</label>
              <Input.Select
                id="rackId"
                name="rackId"
                className={clsx(`mt-2`)}
                onChange={formik.handleChange}
                value={formik.values.rackId}
                error={getErrorWithTouched(formik, 'rackId')}
                disabled={readonly}
              >
                <option value="" disabled>
                  {i18n._(t`เลือก Rack`)}
                </option>
                {racks?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Input.Select>
            </div>

            <div>
              <label htmlFor="ipv4">IPV4</label>
              <Input
                id="ipv4"
                name="ipv4"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 192.168.1.2`)}
                onChange={formik.handleChange}
                value={formik.values.ipv4}
                error={getErrorWithTouched(formik, 'ipv4')}
              />
            </div>

            <div>
              <label htmlFor="subnet">Subnet</label>
              <Input.Numeric
                id="subnet"
                name="subnet"
                value={formik.values.subnet ? String(formik.values.subnet) : ''}
                className={clsx(`mt-2`)}
                onChange={(e) => formik.setFieldValue('subnet', e)}
                placeholder={i18n._(t`เช่น 22`)}
                error={getErrorWithTouched(formik, 'subnet')}
                isNumberOnly
              />
            </div>

            <div>
              <label htmlFor="subnetMask">Subnetmask</label>
              <Input
                id="subnetMask"
                name="subnetMask"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 192.168.1.2`)}
                onChange={formik.handleChange}
                value={formik.values.subnetMask}
                error={getErrorWithTouched(formik, 'subnetMask')}
              />
            </div>

            <div>
              <label htmlFor="subnet">Gateway</label>
              <Input
                id="gateway"
                name="gateway"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 192.168.1.2`)}
                onChange={formik.handleChange}
                value={formik.values.gateway}
                error={getErrorWithTouched(formik, 'gateway')}
              />
            </div>

            <div>
              <label htmlFor="dns1">DNS 1</label>
              <Input
                id="dns1"
                name="dns1"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 192.168.1.2`)}
                onChange={formik.handleChange}
                value={formik.values.dns1}
                error={getErrorWithTouched(formik, 'dns1')}
              />
            </div>

            <div>
              <label htmlFor="dns2">DNS 2</label>
              <Input
                id="dns2"
                name="dns2"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 192.168.1.2`)}
                onChange={formik.handleChange}
                value={formik.values.dns2}
                error={getErrorWithTouched(formik, 'dns2')}
              />
            </div>

            <div>
              <label htmlFor="rankId">{i18n._(t`ระดับสมาชิก`)}</label>
              <MemberShipSelect
                id="rankId"
                name="rankId"
                className={clsx(`mt-2`)}
                onChange={formik.handleChange}
                value={formik.values.rankId || ''}
                error={getErrorWithTouched(formik, 'rankId')}
              />
            </div>

            <div>
              <label htmlFor="flag">{i18n._(t`สถานะการใช้`)}</label>
              <StatusIpSelect
                id="flag"
                name="flag"
                className={clsx(`mt-2`)}
                onChange={formik.handleChange}
                value={formik.values.flag || ''}
                error={getErrorWithTouched(formik, 'flag')}
              />
            </div>
          </div>
        </div>

        <div className={clsx(`mt-6 flex justify-end space-x-4`)}>
          <Button as="a" href="/app/manage-ip" variant="danger" size="medium" type="button" className={clsx(`flex-1`)}>
            <span>{i18n._(t`ยกเลิก`)}</span>
          </Button>
          <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
            <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่ม IP`)}</span>
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default ManageInternetProtocolForm
