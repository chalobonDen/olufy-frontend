import type { FC, Key } from 'react'
import { Fragment, useMemo, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import type { FormikErrors, FormikTouched } from 'formik'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Input, SvgIcon, Pagination, Divider } from '@olufy-frontend/shared/UI'
import { getErrorWithTouched } from '@olufy-frontend/shared/utils'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'
import { chunk, omit, range } from 'lodash-es'
import { useQuery } from '@tanstack/react-query'

import DataCenterSelect from '@/components/Selects/DataCenterSelect'
import { initValidateIpAddress, showRangeAndTotalPagination } from '@/utils'
import StatusIpSelect from '@/components/Selects/StatusIpSelect'
import MemberShipSelect from '@/components/Selects/MemberShipSelect'
import { MembershipService } from '@/services'

import type {
  IInternetProtocol,
  IInternetProtocolMultiple,
  IInternetProtocolMultipleForm,
  IInternetProtocolQueryParams,
} from '@/types/modules/ip'
import { StatusIp } from '@/enums'
import type { MemberLevel } from '@/enums'
import type { IDataCenterRackItem } from '@/types/modules/data-center'

interface IInternetProtocolMultipleFormProps {
  onSubmit?: (payload: IInternetProtocolMultiple) => void
  readonly?: boolean
}

interface IOptionItem {
  label: string
  value: StatusIp
}

const ManageInternetProtocolMultipleForm: FC<IInternetProtocolMultipleFormProps> = ({ onSubmit, readonly }) => {
  const { i18n } = useLingui()

  // _State
  const [queryParams, setQueryParams] = useState<IInternetProtocolQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })
  const [search, setSearch] = useState<string>('')
  const [searchFrom, setSearchFrom] = useState<string>('')
  const [searchTo, setSearchTo] = useState<string>('')
  const [racks, setRacks] = useState<IDataCenterRackItem[]>([])
  const [updateFormValues, setUpdateFormValues] = useState<IInternetProtocolMultipleForm>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedRows, setSelectedRows] = useState<IInternetProtocol[]>([])

  // _Query
  const { data: membership } = useQuery(['get-membership-all'], ({ signal }) => MembershipService.all({ signal }))

  // _Validation yup
  initValidateIpAddress()

  const validationSchema = yup.object().shape({
    dataCenterId: yup.string().required(t`กรุณาเลือก Data Center`),
    rackId: yup.string().required(t`กรุณาเลือก Rack`),
    ipv4: yup
      .string()
      .required(t`กรุณากรอก IPV4`)
      .ipAddress('IPV4', 3),
    ipStart: yup
      .string()
      .required(t`กรุณากรอกหมายเลข IP เริ่มต้น`)
      .test(
        'ipStart',
        t`หมายเลข IP เริ่มต้น ต้องน้อยกว่า IP สิ้นสุด`,
        (value, context) => Number(value) < Number(context.parent.ipEnd),
      ),
    ipEnd: yup
      .string()
      .required(t`กรุณากรอกหมายเลข IP สิ้นสุด`)
      .test(
        'ipEnd',
        t`หมายเลข IP สิ้นสุด ต้องมากกว่า IP เริ่มต้น`,
        (value, context) => Number(value) > Number(context.parent.ipStart),
      ),
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
  })

  // _Memo
  const initialValues: IInternetProtocolMultipleForm = useMemo(() => {
    if (updateFormValues) return updateFormValues
    return {
      dataCenterId: '',
      rackId: '',
      ipv4: '',
      subnet: '',
      subnetMask: '',
      gateway: '',
      dns1: '',
      dns2: '',
      ipStart: undefined,
      ipEnd: undefined,
    }
  }, [updateFormValues])

  // _Formik
  const tableFormik = useFormik<IInternetProtocolMultiple>({
    initialValues: { ipAddress: [] },
    validationSchema: yup.object().shape({
      ipAddress: yup.array().of(
        yup.object().shape({
          rankId: yup
            .string()
            .nullable()
            .required(t`กรุณาเลือกระดับสมาชิก`),
        }),
      ),
    }),
    onSubmit: (values) => {
      onSubmit?.({
        ipAddress: [
          ...values.ipAddress.map((e) => {
            return {
              ...e,
              rankId: Number(e?.rankId),
              rackId: Number(e?.rackId),
            }
          }),
        ],
      })
    },
  })

  const formik = useFormik<IInternetProtocolMultipleForm>({
    initialValues,
    validationSchema,
    enableReinitialize: !!updateFormValues,
    onSubmit: (values) => {
      const newValues = range(Number(values.ipStart), Number(values.ipEnd) + 1).map((n) => {
        return {
          ...omit(values, 'ipStart', 'ipEnd'),
          ipv4: `${values.ipv4}.${n}`,
          flag: StatusIp.ACTIVE,
          rankId: membership?.memberShips[0]?.id ?? undefined,
        } as IInternetProtocolMultipleForm
      })

      tableFormik.resetForm()
      setTimeout(() => {
        tableFormik.setFieldValue(`ipAddress`, newValues)
        setUpdateFormValues(values)
      }, 10)
    },
  })

  // _Memo
  const options: IOptionItem[] = useMemo(() => {
    return [
      {
        label: i18n._(t`ว่าง`),
        value: StatusIp.ACTIVE,
      },
      {
        label: i18n._(t`ไม่ว่าง`),
        value: StatusIp.INACTIVE,
      },
      {
        label: i18n._(t`ถูกล็อก`),
        value: StatusIp.LOCK,
      },
    ]
  }, [i18n])

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'ipv4',
        title: `IPV4`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'subnet',
        title: `Subnet`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'subnetMask',
        title: `Subnetmask`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'gateway',
        title: `Gateway`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'dns1',
        title: `DNS 1`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'dns2',
        title: `DNS 2`,
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'rankId',
        title: i18n._(t`ระดับสมาชิก`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
        filter: membership?.memberShips?.map((e) => ({ text: e.name, value: String(e.id) })),
        defaultFilter: queryParams?.rankId,
        filterOptions: {
          resetText: i18n._(t`รีเซ็ต`),
          submitText: i18n._(t`ยืนยัน`),
        },
        onFilter: (values) => {
          setQueryParams((state) => ({
            ...state,
            rankId: values,
            page: 1,
          }))

          clearSelected()
        },
        render: (val: MemberLevel, record: IInternetProtocol) => {
          const index = tableFormik.values.ipAddress.findIndex((item) => item.ipv4 === record.ipv4)
          return (
            <MemberShipSelect
              // key={`ipAddress[${index}].rankId`}
              name={`ipAddress[${index}].rankId`}
              className={clsx(`sm:w-full`)}
              value={val}
              onChange={(event) => tableFormik.setFieldValue(`ipAddress[${index}].rankId`, event.target.value)}
              disabledPlaceholder={false}
              error={
                (tableFormik?.touched?.ipAddress as FormikTouched<IInternetProtocol>[])?.[index]?.rankId &&
                (tableFormik?.errors?.ipAddress as FormikErrors<IInternetProtocol>[])?.[index]?.rankId
              }
            />
          )
        },
      },
      {
        dataIndex: 'flag',
        title: i18n._(t`สถานะการใช้`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        filter: options?.map((e) => ({ text: e.label, value: String(e.value) })),
        defaultFilter: queryParams?.flag,
        filterOptions: {
          resetText: i18n._(t`รีเซ็ต`),
          submitText: i18n._(t`ยืนยัน`),
        },
        onFilter: (values) => {
          setQueryParams((state) => ({
            ...state,
            flag: values,
            page: 1,
          }))

          clearSelected()
        },
        render: (val: StatusIp, record: IInternetProtocol) => {
          const index = tableFormik.values.ipAddress.findIndex((item) => item.ipv4 === record.ipv4)
          return (
            <StatusIpSelect
              // key={`ipAddress[${index}].flag`}
              name={`ipAddress[${index}].flag`}
              placeholder={i18n._(t`สถานะการใช้`)}
              className={clsx(`sm:w-full`)}
              value={val}
              onChange={(event) => {
                tableFormik.setFieldValue(`ipAddress[${index}].flag`, event.target.value)
              }}
            />
          )
        },
      },
    ] as TableColumn<IInternetProtocol>[]
  }, [i18n, membership?.memberShips, options, queryParams?.flag, queryParams?.rankId, tableFormik])

  const searchData = useMemo(() => {
    const filterRank = queryParams.rankId as unknown as string[]
    const filterFlag = queryParams.flag as unknown as string[]

    let filterData = tableFormik.values.ipAddress.filter((item) => {
      const ipNumber = Number(item.ipv4.replace(formik.values.ipv4, '').replace('.', ''))

      if ((searchFrom && !searchTo) || (!searchFrom && searchTo)) {
        return item.ipv4.replace(formik.values.ipv4, '').replace('.', '').includes(searchFrom)
      }

      if (searchFrom && searchTo) {
        return ipNumber >= Number(searchFrom) && ipNumber <= Number(searchTo)
      }

      return item
    })

    if (filterRank?.length > 0) {
      filterData = filterData.filter((e) => filterRank.includes(String(e.rankId)))
    }
    if (filterFlag?.length > 0) {
      filterData = filterData.filter((e) => filterFlag.includes(String(e.flag)))
    }

    return filterData
  }, [queryParams.rankId, queryParams.flag, tableFormik.values.ipAddress, formik.values.ipv4, searchFrom, searchTo])

  const filterData = useMemo(() => {
    const chunkData = chunk(searchData, queryParams.perPage)
    return chunkData[queryParams.page - 1]
  }, [queryParams, searchData])

  // _Events
  const onSelectChange = (newSelectedRowKeys: Key[], selectedRows: IInternetProtocol[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedRows(selectedRows)
  }

  const clearSelected = () => {
    setSelectedRowKeys([])
    setSelectedRows([])
  }

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
              <label htmlFor="ipv4">
                IPV4 <span className={clsx(`text-red-500`)}>{i18n._(t`(ใส่แค่ xxx.xxx.xxx)`)}</span>
              </label>
              <Input
                id="ipv4"
                name="ipv4"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`เช่น 192.168.1`)}
                onChange={formik.handleChange}
                value={formik.values.ipv4}
                error={getErrorWithTouched(formik, 'ipv4')}
              />
            </div>

            <div>
              <label htmlFor="ipStart">IP Start</label>
              <Input.Numeric
                id="ipStart"
                name="ipStart"
                className={clsx(`mt-2`)}
                value={formik.values.ipStart ? String(formik.values.ipStart) : ''}
                onChange={(e) => formik.setFieldValue('ipStart', e)}
                placeholder={i18n._(t`เช่น 1`)}
                error={getErrorWithTouched(formik, 'ipStart')}
                isNumberOnly
              />
            </div>

            <div>
              <label htmlFor="ipEnd">IP End</label>
              <Input.Numeric
                id="ipEnd"
                name="ipEnd"
                className={clsx(`mt-2`)}
                value={formik.values.ipEnd ? String(formik.values.ipEnd) : ''}
                onChange={(e) => formik.setFieldValue('ipEnd', e)}
                placeholder={i18n._(t`เช่น 150`)}
                error={getErrorWithTouched(formik, 'ipEnd')}
                isNumberOnly
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
              <label htmlFor="Gateway">Gateway</label>
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
          </div>
        </div>

        <div className={clsx(`mt-6 flex justify-end space-x-4`)}>
          <Button variant="success" size="medium" type="submit" disabled={!formik.dirty} className={clsx(`flex-1`)}>
            <span>Generate IP</span>
          </Button>
        </div>
      </form>

      {tableFormik.values.ipAddress.length > 0 && (
        <form onSubmit={tableFormik.handleSubmit}>
          <Divider />
          <div className={clsx(`mt-6 flex items-center justify-end`, `sm:ml-0 sm:w-full`)}>
            <Input
              name="search"
              prefix={<SvgIcon name="search" className={clsx(`square-6`)} />}
              placeholder={i18n._(t`ค้นหา IP Start`)}
              className={clsx(`w-[160px]`, `sm:flex-1`)}
              value={searchFrom}
              onChange={(e) => {
                setQueryParams((state) => ({
                  ...state,
                  page: 1,
                }))
                setSearchFrom(e.target.value)
                clearSelected()
              }}
            />
            <div className={clsx(`mx-2`)}>-</div>
            <Input
              name="search"
              prefix={<SvgIcon name="search" className={clsx(`square-6`)} />}
              placeholder={i18n._(t`ค้นหา IP End`)}
              className={clsx(`w-[160px]`, `sm:flex-1`)}
              value={searchTo}
              onChange={(e) => {
                setQueryParams((state) => ({
                  ...state,
                  page: 1,
                }))
                setSearchTo(e.target.value)
                clearSelected()
              }}
            />
          </div>

          {selectedRowKeys.length > 0 && (
            <Fragment>
              <Divider className={clsx(`hidden`, `sm:block`)} />
              <div className={clsx(`flex items-center`, `sm:mt-4 sm:flex-col sm:items-start`)}>
                <span>{i18n._(t`เลือก ${selectedRowKeys.length} รายการ`)}</span>

                <div className={clsx(`ml-auto mt-4 flex items-center space-x-2`, `sm:ml-0 sm:mt-2 sm:w-full`)}>
                  <MemberShipSelect
                    key={`multiple-rank-selection`}
                    className={clsx(`sm:w-full`)}
                    onChange={(event) => {
                      selectedRows.forEach((record) => {
                        const index = tableFormik.values.ipAddress.findIndex((item) => item.ipv4 === record.ipv4)
                        tableFormik.setFieldValue(`ipAddress[${index}].rankId`, event.target.value)
                      })
                    }}
                    disabledPlaceholder={false}
                  />

                  <StatusIpSelect
                    key={`multiple-flag-selection`}
                    placeholder={i18n._(t`สถานะการใช้`)}
                    className={clsx(`sm:w-full`)}
                    onChange={(event) => {
                      selectedRows.forEach((record) => {
                        const index = tableFormik.values.ipAddress.findIndex((item) => item.ipv4 === record.ipv4)
                        tableFormik.setFieldValue(`ipAddress[${index}].flag`, event.target.value)
                      })
                    }}
                    disabledPlaceholder={false}
                  />
                </div>
              </div>
            </Fragment>
          )}

          <Table
            rowKey={(record, index) => `${record.ipv4}-${index}-${queryParams.page}`}
            className={clsx(`mt-4`)}
            columns={columns}
            dataSource={filterData ?? []}
            emptyMsg={i18n._(t`ไม่มีรายการ`)}
            rowSelection={{
              type: 'checkbox',
              onChange: onSelectChange,
              selectedRowKeys,
              preserveSelectedRowKeys: true,
            }}
          />

          <Pagination
            className={clsx(`mt-6 w-full`)}
            current={queryParams.page}
            total={searchData.length}
            pageSize={queryParams.perPage}
            showLessItems
            showTotal={showRangeAndTotalPagination}
            onChange={(e) => {
              setQueryParams((state) => ({
                ...state,
                page: e,
              }))
            }}
          />

          <div className={clsx(`mt-6 flex justify-end space-x-4`)}>
            <Button
              onClick={() => {
                tableFormik.resetForm()
              }}
              variant="danger"
              size="medium"
              type="button"
              className={clsx(`flex-1`)}
            >
              <span>{i18n._(t`ยกเลิก`)}</span>
            </Button>
            <Button type="submit" variant="success" size="medium" className={clsx(`flex-1`)}>
              <span>{i18n._(t`เพิ่ม IP`)}</span>
            </Button>
          </div>
        </form>
      )}
    </Fragment>
  )
}

export default ManageInternetProtocolMultipleForm
