import { Fragment, useCallback, useMemo, useRef, useState } from 'react'

import * as yup from 'yup'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useFormik } from 'formik'
import { snakelizeKeys, getErrorWithTouched } from '@olufy-frontend/shared/utils'
import clsx from 'clsx'
import { Button, ConfirmModal, Divider, Input, SvgIcon } from '@olufy-frontend/shared/UI'
import type { TableColumn } from '@olufy-frontend/shared/UI/Table'
import Table from '@olufy-frontend/shared/UI/Table'

import DataCenterSelect from '@/components/Selects/DataCenterSelect'
import EditButton from '@/components/Buttons/EditButton'
import DeleteButton from '@/components/Buttons/DeleteButton'
import ManageDiskModal from '@/components/Modals/Server/ManageDiskModal'
import UserListSelect from '@/components/Selects/UserListSelect'
import ProductsSelect from '@/components/Selects/ProductsSelect'

import type { IServer } from '@/types/modules/server'
import type { IDisk, ISimpleDisk } from '@/types/modules/disk'
import type { IDataCenterRackItem } from '@/types/modules/data-center'
import type { IFormikResponse } from '@/types/formik'

interface IManageServerFormProps {
  data?: IServer
  onSubmit?: (payload: IServer) => void
  readonly?: boolean
  isLoadingDisk?: boolean
}

const ManageServerForm = ({ data, onSubmit, readonly, isLoadingDisk }: IManageServerFormProps) => {
  const { i18n } = useLingui()
  const isEdit = !!data

  // _Ref
  const manageDiskFormRef = useRef<IFormikResponse<IDisk> | null>(null)

  // _Validation_Schema
  const validationSchema = yup.object().shape({
    dataCenterId: yup.string().required(t`กรุณาเลือก Data Center`),
    rackId: yup.string().required(t`กรุณาเลือก Rack`),
    name: yup.string().required(t`กรุณากรอก Server Name`),
    cpuName: yup.string().required(t`กรุณากรอก CPU Name`),
    cpuCore: yup.string().required(t`กรุณากรอก CPU Core`),
    cpuThreads: yup.string().required(t`กรุณากรอก CPU Threads`),
    ram: yup.string().required(t`กรุณากรอก RAM Amount`),
    ramType: yup.string().required(t`กรุณากรอก RAM Type`),
    apiUrl: yup.string().required(t`กรุณากรอก API Url`),
    credentials: yup.string().required(t`กรุณากรอก Credentials`),
    size: yup.string().required(t`กรุณากรอก Size`),
    userId: yup.string().required(t`กรุณาเลือก Owner`),
    productId: yup.string().required(t`กรุณาเลือก Server Type`),
    slotNo: yup.string().required(t`กรุณา Slot number`),
    detail: yup.string().required(t`กรุณากรอกรายละเอียด`),
  })

  // _State
  const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false)
  const [isManageDisk, setIsManageDisk] = useState<boolean>(false)
  const [dataEdit, setDataEdit] = useState<IDisk | null>(null)
  const [racks, setRacks] = useState<IDataCenterRackItem[]>([])
  const [diskSelectedIndex, setDiskSelectedIndex] = useState<number | null>(null)

  // _Memo
  const initialValues = useMemo(() => {
    if (!data) {
      return {
        dataCenterId: '',
        rackId: '',
        name: '',
        cpuName: '',
        cpuCore: '',
        cpuThreads: '',
        ram: '',
        ramType: '',
        apiUrl: '',
        credentials: '',
        detail: '',
        size: '',
        userId: '',
        productId: '',
        slotNo: '',
        serverDisks: [],
        nodeId: null,
        vmServerId: null,
      } as IServer
    }

    return data
  }, [data])

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'type',
        title: i18n._(t`Type`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
      },
      {
        dataIndex: 'capacity',
        title: i18n._(t`Capacity`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => <span>{val}GB</span>,
      },
      {
        dataIndex: 'speed',
        title: i18n._(t`Speed`),
        align: 'center',
        className: clsx(`min-w-[160px]`),
        render: (val) => <span>{val}RPM</span>,
      },
      {
        dataIndex: 'interface',
        title: i18n._(t`Interface`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'serialNumber',
        title: i18n._(t`Serial Number`),
        align: 'center',
        className: clsx(`min-w-[180px]`),
      },
      {
        dataIndex: 'actions',
        title: '',
        align: 'right',
        className: clsx(`min-w-[80px]`),
        render: (_val, record, idx) => (
          <div className={clsx(`flex items-center space-x-2`)}>
            <EditButton
              onClick={() => {
                setDataEdit(record)
                setIsManageDisk(true)
                setDiskSelectedIndex(idx)
              }}
            />
            <DeleteButton
              onClick={() => {
                setVisibleDeleteModal(true)
                setDiskSelectedIndex(idx)
              }}
            />
          </div>
        ),
      },
    ] as TableColumn<ISimpleDisk>[]
  }, [i18n])

  // _Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: !!data,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        rackId: Number(values.rackId),
        cpuCore: Number(values.cpuCore),
        cpuThreads: Number(values.cpuThreads),
        ram: Number(values.ram),
        size: Number(values.size),
        userId: Number(values.userId),
        productId: Number(values.productId),
        slotNo: Number(values.slotNo),
        serverDisks: values.serverDisks,
        vmServerId: Number(values.vmServerId),
        nodeId: Number(values.nodeId),
      }

      onSubmit?.(newValues)
    },
  })

  // _Callback
  const closeManageDisk = useCallback(() => {
    setDataEdit(null)
    setDiskSelectedIndex(null)
    setIsManageDisk(false)

    if (manageDiskFormRef.current) manageDiskFormRef.current.resetForm()
  }, [])

  const handleCloseDeleteDiskModal = useCallback(() => {
    setDiskSelectedIndex(null)
    setVisibleDeleteModal(false)
  }, [])

  const handleDeleteDisk = useCallback(() => {
    formik.setFieldValue(
      'serverDisks',
      formik.values.serverDisks.map((e, i) => {
        if (i === diskSelectedIndex)
          return {
            ...e,
            flag: 'deleted',
          }

        return e
      }),
    )

    handleCloseDeleteDiskModal()
  }, [formik, handleCloseDeleteDiskModal, diskSelectedIndex])

  // _Events
  const transformData = (e: IDisk): IDisk => {
    return {
      id: e.id,
      type: e.type,
      capacity: e.capacity,
      speed: e.speed,
      interface: e.interface,
      serialNumber: e.serialNumber,
      flag: e.flag,
    }
  }

  const onUpdateDisk = (e: IDisk) => {
    const isDiskUpdate = !!dataEdit && typeof diskSelectedIndex === 'number'

    // Update
    if (isDiskUpdate) {
      formik.setFieldValue(
        'serverDisks',
        formik.values.serverDisks.map((item, itemIdx) => {
          if (itemIdx === diskSelectedIndex) return e
          return item
        }),
      )
      closeManageDisk()
      return
    }

    // Create
    formik.setFieldValue('serverDisks', [...formik.values.serverDisks, e])
    closeManageDisk()
  }

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h4 className={clsx(`text-header-4`)}>{i18n._(t`ข้อมูล Server`)}</h4>

        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <label htmlFor="dataCenterId">{i18n._(t`Data Center`)}</label>
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
            <label htmlFor="rackId">{i18n._(t`Rack`)}</label>
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
            <label htmlFor="name">{i18n._(t`Server Name`)}</label>
            <Input
              id="name"
              name="name"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก Server Name`)}
              onChange={formik.handleChange}
              value={formik.values.name}
              error={getErrorWithTouched(formik, 'name')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="cpuName">{i18n._(t`CPU Name`)}</label>
            <Input
              id="cpuName"
              name="cpuName"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก CPU Name`)}
              onChange={formik.handleChange}
              value={formik.values.cpuName}
              error={getErrorWithTouched(formik, 'cpuName')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="cpuCore">{i18n._(t`CPU Core`)}</label>
            <Input.Numeric
              id="cpuCore"
              name="cpuCore"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก CPU Core`)}
              onChange={(e) => {
                formik.setFieldValue('cpuCore', e)
              }}
              value={formik.values.cpuCore as string}
              error={getErrorWithTouched(formik, 'cpuCore')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="cpuThreads">{i18n._(t`CPU Threads`)}</label>
            <Input.Numeric
              id="cpuThreads"
              name="cpuThreads"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก CPU Threads`)}
              onChange={(e) => {
                formik.setFieldValue('cpuThreads', e)
              }}
              value={formik.values.cpuThreads as string}
              error={getErrorWithTouched(formik, 'cpuThreads')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="ram">{i18n._(t`RAM Amount`)}</label>
            <Input.Numeric
              id="ram"
              name="ram"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก RAM Amount`)}
              suffix={<div className={clsx(`border-l pl-2`)}>MB</div>}
              onChange={(e) => {
                formik.setFieldValue('ram', e)
              }}
              value={formik.values.ram as string}
              error={getErrorWithTouched(formik, 'ram')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="ramType">{i18n._(t`RAM Type`)}</label>
            <Input
              id="ramType"
              name="ramType"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก RAM Type`)}
              onChange={formik.handleChange}
              value={formik.values.ramType}
              error={getErrorWithTouched(formik, 'ramType')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="apiUrl">{i18n._(t`API Url`)}</label>
            <Input
              id="apiUrl"
              name="apiUrl"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก API Url`)}
              onChange={formik.handleChange}
              value={formik.values.apiUrl}
              error={getErrorWithTouched(formik, 'apiUrl')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="credentials">{i18n._(t`Credentials`)}</label>
            <Input
              id="credentials"
              name="credentials"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก Credentials`)}
              onChange={formik.handleChange}
              value={formik.values.credentials}
              error={getErrorWithTouched(formik, 'credentials')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="size">{i18n._(t`Size 1U 2U`)}</label>
            <Input.Numeric
              id="size"
              name="size"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`กรอก Size`)}
              onChange={(e) => {
                formik.setFieldValue('size', e)
              }}
              value={formik.values.size as string}
              error={getErrorWithTouched(formik, 'size')}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="userId">{i18n._(t`Owner`)}</label>
            <UserListSelect
              id="userId"
              name="userId"
              className={clsx(`mt-2`)}
              onChange={formik.handleChange}
              value={formik.values.userId}
              error={getErrorWithTouched(formik, 'userId')}
              disabled={readonly}
              placeholder={i18n._(t`เลือก Owner`)}
            />
          </div>
          <div>
            <label htmlFor="productId">{i18n._(t`Server Type`)}</label>
            <ProductsSelect
              id="productId"
              name="productId"
              className={clsx(`mt-2`)}
              onChange={formik.handleChange}
              value={formik.values.productId}
              error={getErrorWithTouched(formik, 'productId')}
              disabled={readonly}
              placeholder={i18n._(t`เลือก Server Type`)}
            />
          </div>
          <div>
            <label htmlFor="slotNo">{i18n._(t`Slot no`)}</label>
            <Input.Numeric
              id="slotNo"
              name="slotNo"
              className={clsx(`mt-2`)}
              placeholder={i18n._(t`เช่น อยู่ชั้นไหนของ Rack`)}
              onChange={(e) => {
                formik.setFieldValue('slotNo', Number(e))
              }}
              value={formik.values.slotNo as string}
              error={getErrorWithTouched(formik, 'slotNo')}
              disabled={readonly}
            />
          </div>
        </div>

        <div className={clsx(`mt-4`)}>
          <label htmlFor="detail">{i18n._(t`รายละเอียด`)}</label>
          <Input.TextArea
            id="detail"
            name="detail"
            className={clsx(`mt-2`)}
            placeholder={i18n._(t`กรอกรายละเอียด`)}
            onChange={formik.handleChange}
            value={formik.values.detail}
            error={getErrorWithTouched(formik, 'detail')}
            disabled={readonly}
          />
        </div>

        <div className={clsx(`mt-4 grid grid-cols-2 gap-4`, `sm:grid-cols-1`)}>
          <div>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="server">{i18n._(t`Node Id`)}</label>
              <Input.Numeric
                id="nodeId"
                name="nodeId"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอก Node Id`)}
                onChange={(e) => {
                  formik.setFieldValue('nodeId', Number(e))
                }}
                value={formik.values.nodeId as string}
                error={getErrorWithTouched(formik, 'nodeId')}
                disabled={readonly}
              />
            </div>
          </div>
          <div>
            <div className={clsx(`mt-2`)}>
              <label htmlFor="server">{i18n._(t`VM Server Id`)}</label>
              <Input.Numeric
                id="vmServerId"
                name="vmServerId"
                className={clsx(`mt-2`)}
                placeholder={i18n._(t`กรอก VM Server Id`)}
                onChange={(e) => {
                  formik.setFieldValue('vmServerId', Number(e))
                }}
                value={formik.values.vmServerId as string}
                error={getErrorWithTouched(formik, 'vmServerId')}
                disabled={readonly}
              />
            </div>
          </div>
        </div>

        <Divider />

        <h1 className={clsx(`text-header-4`)}>{i18n._(t`Disk List`)}</h1>
        <Button
          variant="success"
          buttonType="icon-text"
          size="medium"
          className={clsx(`mt-6`)}
          onClick={() => {
            setDataEdit(null)
            setDiskSelectedIndex(null)
            setIsManageDisk(true)
          }}
        >
          <SvgIcon name="plus-circle" />
          <span>{i18n._(t`เพิ่ม Disk`)}</span>
        </Button>

        <Table
          rowKey={(_, index) => index}
          className={clsx(`-mx-4 mt-6 px-4`)}
          columns={columns}
          dataSource={formik.values?.serverDisks.filter((item) => item.flag !== 'deleted') ?? []}
          loading={isLoadingDisk}
          emptyMsg={i18n._(t`ไม่มีรายการ`)}
        />

        {!readonly && (
          <Button
            variant="success"
            size="medium"
            type="submit"
            disabled={!formik.dirty}
            className={clsx(`mt-4 w-full`)}
          >
            <span>{isEdit ? i18n._(t`บันทึก`) : i18n._(t`เพิ่ม Server`)}</span>
          </Button>
        )}
      </form>

      {/* เพิ่ม Disk */}
      <ManageDiskModal
        visible={isManageDisk}
        data={!!dataEdit ? transformData(dataEdit) : null}
        closeModal={closeManageDisk}
        onSubmit={onUpdateDisk}
        getForm={(form) => (manageDiskFormRef.current = form)}
      />

      {/* Confirm Delete */}
      <ConfirmModal
        visible={!!visibleDeleteModal}
        title={i18n._(t`ยืนยันการลบ`)}
        cancelText={i18n._(t`ยกเลิก`)}
        confirmText={i18n._(t`ลบ`)}
        onConfirm={() => {
          handleDeleteDisk()
        }}
        onCancel={handleCloseDeleteDiskModal}
        closeModal={handleCloseDeleteDiskModal}
      >
        <p>{i18n._(t`คุณต้องการลบรายการนี้ ?`)}</p>
      </ConfirmModal>
    </Fragment>
  )
}

export default ManageServerForm
