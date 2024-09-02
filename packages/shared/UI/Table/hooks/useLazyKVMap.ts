import type { Key } from 'react'
import { useRef } from 'react'

import type { GetRowKey } from '../types'

interface MapCache<RecordType> {
  data?: readonly RecordType[]
  childrenColumnName?: string
  kvMap?: Map<Key, RecordType>
  getRowKey?: Function
}

const useLazyKVMap = <RecordType>(
  data: readonly RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>,
) => {
  const mapCacheRef = useRef<MapCache<RecordType>>({})

  function getRecordByKey(key: Key): RecordType {
    if (
      !mapCacheRef.current ||
      mapCacheRef.current.data !== data ||
      mapCacheRef.current.childrenColumnName !== childrenColumnName ||
      mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<Key, RecordType>()

      const dig = (records: readonly RecordType[]) => {
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index)
          kvMap.set(rowKey, record)

          if (record && typeof record === 'object' && childrenColumnName in record) {
            dig((record as any)[childrenColumnName] || [])
          }
        })
      }

      dig(data)

      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey,
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return mapCacheRef.current.kvMap!.get(key)!
  }

  return {
    getRecordByKey,
  }
}

export default useLazyKVMap
