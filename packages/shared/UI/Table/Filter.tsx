import { Fragment } from 'react'

import clsx from 'clsx'
import { FaFilter } from 'react-icons/fa'
import { Menu } from '@headlessui/react'
import { Field, FieldArray, Form, Formik } from 'formik'

import Dropdown, { DropdownDivider } from '../Dropdown'
import Checkbox from '../Checkbox'
import Button from '../Button'

import type { TableColumn } from '.'

const Filter = ({
  record,
  onSubmit,
}: {
  record: TableColumn<any>
  onSubmit: (values: string[] | number[]) => void
}) => {
  const key = `table-filter-${record.dataIndex}`

  return (
    <Dropdown
      showCaret={false}
      button={<FaFilter />}
      buttonProps={{
        rounder: 'sm',
      }}
      className={clsx(`filter-button`)}
      dialogClassName={clsx(`table-filter-dialog`)}
      items={
        <Formik
          initialValues={{ [key]: record?.defaultFilter ?? [] }}
          enableReinitialize={!!record?.defaultFilter}
          onSubmit={(values) => {
            onSubmit?.(values[key])
          }}
        >
          {({ values, handleChange, setValues, dirty }) => (
            <Form autoComplete="off">
              <div className={clsx(`dropdown-dialog-item no-hover desc`)}>Filter</div>
              <FieldArray name={key} validateOnChange={true}>
                {() => (
                  <Fragment>
                    {record?.filter?.map((item, itemIdx) => (
                      <div key={itemIdx} className={clsx(`dropdown-dialog-item no-hover`)}>
                        <Field
                          as={Checkbox}
                          name={`${key}`}
                          value={item.value}
                          onChange={handleChange}
                          checked={values[key].includes(item.value as never)}
                        >
                          <span>{item.text}</span>
                        </Field>
                      </div>
                    ))}
                  </Fragment>
                )}
              </FieldArray>

              <DropdownDivider />
              <div className={clsx(`dropdown-dialog-item no-hover filter-footer-buttons`)}>
                <Button
                  variant="default"
                  type="button"
                  size="small"
                  className={clsx()}
                  onClick={() => {
                    setValues({
                      [key]: [],
                    })
                  }}
                >
                  {record?.filterOptions?.resetText || 'Reset'}
                </Button>
                <Menu.Item>
                  <Button variant="primary" type="submit" size="small" disabled={!dirty} className={clsx()}>
                    {record?.filterOptions?.submitText || 'Submit'}
                  </Button>
                </Menu.Item>
              </div>
            </Form>
          )}
        </Formik>
      }
    />
  )
}

export default Filter
