import type { Key } from 'react'
import { useRef, useMemo, useEffect, useCallback } from 'react'

import { useMergedState } from 'rc-util'

import type { GetRowKey, ITableRowSelection, RowSelectMethod } from '../types'

interface IUseSelectionConfig<RecordType> {
  data: RecordType[]
  getRowKey: GetRowKey<RecordType>
  getRecordByKey: (key: Key) => RecordType
  childrenColumnName: string
}

type AnyObject = Record<PropertyKey, any>

const EMPTY_LIST: Key[] = []

const flattenData = <RecordType extends AnyObject = AnyObject>(
  childrenColumnName: keyof RecordType,
  data?: RecordType[],
): RecordType[] => {
  let list: RecordType[] = []
  ;(data || []).forEach((record) => {
    list.push(record)
    if (record && typeof record === 'object' && childrenColumnName in record) {
      list = [...list, ...flattenData<RecordType>(childrenColumnName, record[childrenColumnName])]
    }
  })
  return list
}

const useTableSelection = <RecordType>(
  rowSelection: ITableRowSelection<RecordType>,
  config: IUseSelectionConfig<RecordType>,
) => {
  const {
    onChange: onSelectionChange,
    selectedRowKeys,
    defaultSelectedRowKeys,
    onSelect,
    preserveSelectedRowKeys,
  } = rowSelection || {}
  const { data: records, getRowKey, getRecordByKey, childrenColumnName } = config

  // _Ref
  const preserveRecordsRef = useRef(new Map<Key, RecordType>())

  // _State
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(
    selectedRowKeys || defaultSelectedRowKeys || EMPTY_LIST,
    {
      value: selectedRowKeys,
    },
  )

  // _Memo
  const flattedData = useMemo(() => flattenData(childrenColumnName as never, records), [childrenColumnName, records])

  // _Record key
  const recordKeys = flattedData.map(getRowKey)
  const keySet = useMemo(() => new Set(mergedSelectedKeys), [mergedSelectedKeys])
  const checkedCurrentAll = recordKeys.every((key) => keySet.has(key))

  // _Callback
  const updatePreserveRecordsCache = useCallback(
    (keys: Key[]) => {
      if (preserveSelectedRowKeys) {
        const newCache = new Map<Key, RecordType>()
        // Keep key if mark as preserveSelectedRowKeys
        keys.forEach((key) => {
          let record = getRecordByKey(key)

          if (!record && preserveRecordsRef.current.has(key)) {
            record = preserveRecordsRef.current.get(key)
          }

          newCache.set(key, record)
        })
        // Refresh to new cache
        preserveRecordsRef.current = newCache
      }
    },
    [getRecordByKey, preserveSelectedRowKeys],
  )

  const setSelectedKeys = useCallback(
    (keys: Key[], method: RowSelectMethod) => {
      let availableKeys: Key[]
      let records: RecordType[]

      updatePreserveRecordsCache(keys)

      if (preserveSelectedRowKeys) {
        availableKeys = keys
        records = keys.map((key) => preserveRecordsRef.current.get(key))
      } else {
        availableKeys = []
        records = []

        keys.forEach((key) => {
          const record = getRecordByKey(key)
          if (record !== undefined) {
            availableKeys.push(key)
            records.push(record)
          }
        })
      }

      setMergedSelectedKeys(availableKeys)
      onSelectionChange?.(availableKeys, records, { type: method })
    },
    [updatePreserveRecordsCache, preserveSelectedRowKeys, setMergedSelectedKeys, onSelectionChange, getRecordByKey],
  )

  const triggerSingleSelection = useCallback(
    (key: Key, selected: boolean, keys: Key[], event: Event) => {
      if (onSelect) {
        const rows = keys.map((k) => getRecordByKey(k))
        onSelect(getRecordByKey(key), selected, rows, event)
      }

      setSelectedKeys(keys, 'single')
    },
    [getRecordByKey, onSelect, setSelectedKeys],
  )

  const onSelectAllChange = useCallback(() => {
    const changeKeys: Key[] = []

    if (checkedCurrentAll) {
      recordKeys.forEach((key) => {
        keySet.delete(key)
        changeKeys.push(key)
      })
    } else {
      recordKeys.forEach((key) => {
        if (!keySet.has(key)) {
          keySet.add(key)
          changeKeys.push(key)
        }
      })
    }

    const keys = Array.from(keySet)

    setSelectedKeys(keys, 'all')
  }, [checkedCurrentAll, keySet, setSelectedKeys, recordKeys])

  // _Effect
  useEffect(() => {
    updatePreserveRecordsCache(mergedSelectedKeys)
  }, [mergedSelectedKeys, updatePreserveRecordsCache])

  useEffect(() => {
    if (!rowSelection) {
      setMergedSelectedKeys(EMPTY_LIST)
    }
  }, [rowSelection, setMergedSelectedKeys])

  return {
    onSelect: (nativeEvent: Event, record: RecordType, index: number) => {
      const key = getRowKey(record, index)
      const checked = keySet.has(key)

      const checkedKeys = [...mergedSelectedKeys, key]
      let nextCheckedKeys = checkedKeys

      if (checked) {
        const tempKeySet = new Set(checkedKeys)
        tempKeySet.delete(key)
        nextCheckedKeys = [...Array.from(tempKeySet)]
      }

      triggerSingleSelection(key, !checked, nextCheckedKeys, nativeEvent)
    },
    onSelectAll: onSelectAllChange,
    selectedKeys: mergedSelectedKeys,
    selectedAll: checkedCurrentAll,
  }
}

export default useTableSelection
