import { useRef, useState } from 'react'

import clsx from 'clsx'
import { FaSearch } from 'react-icons/fa'
import { Menu } from '@headlessui/react'
import { Form, Formik } from 'formik'

import Dropdown, { DropdownDivider, Keys } from '../Dropdown'
import Button from '../Button'
import Input from '../Input'

import type { TableColumn } from '.'

const Search = ({ record, onSubmit }: { record: TableColumn<any>; onSubmit: (values: string) => void }) => {
  const key = `search-${record.dataIndex}`
  const closeRef = useRef<VoidFunction>(null)

  return (
    <Formik
      initialValues={{ [key]: record?.defaultSearch ?? '' }}
      enableReinitialize={!!record?.defaultSearch}
      onSubmit={(values) => {
        onSubmit?.(values[key])
      }}
    >
      {({ values, handleChange, setValues, dirty, handleSubmit }) => (
        <Dropdown
          showCaret={false}
          button={<FaSearch />}
          buttonProps={{
            rounder: 'sm',
          }}
          className={clsx(`filter-button`)}
          dialogClassName={clsx(`table-filter-dialog`)}
          getCloseFn={(e) => (closeRef.current = e)}
          onMenuItemsKeyDown={(e) => {
            if (e.key === Keys.Enter) {
              handleSubmit()
              closeRef.current?.()
            }
          }}
          items={
            <Form autoComplete="off">
              <div className={clsx(`dropdown-dialog-item no-hover desc`)}>
                {record?.searchOption?.label ?? 'Search'}
              </div>

              <div className={clsx(`dropdown-dialog-item no-hover`)} tabIndex={-1}>
                <Input
                  name={key}
                  value={values[key]}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  placeholder={record?.searchOption?.label ?? 'Search'}
                />
              </div>

              <DropdownDivider />
              <div className={clsx(`dropdown-dialog-item no-hover filter-footer-buttons`)}>
                <Button
                  variant="default"
                  type="button"
                  size="small"
                  className={clsx()}
                  onClick={() => {
                    setValues({
                      [key]: '',
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
          }
        />
      )}
    </Formik>
  )
}

export default Search
