import AES from 'crypto-js/aes'

import { decryptAESDeserialize } from './deserialize'

import { deserialize as deserialize_, serialize as serialize_ } from '.'

type BaseStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export type ClientStorage = {
  getItem<T>(key: string, defaultState?: T | null): T | null
  setItem<T>(key: string, value: T | null): void
  removeItem(key: string): void
}

export const noopStorage: BaseStorage = {
  getItem: (_key) => '',
  setItem: (_key, _value) => null,
  removeItem: (_key) => null,
}

export const createStorage = ({
  deserialize = deserialize_,
  key: prefix = 'persist',
  serialize = serialize_,
  storage,
  secureKey = null,
}: {
  deserialize?: <T>(value: string) => T
  key?: string
  serialize?: <T>(value: T) => string
  storage: BaseStorage
  secureKey?: string | null
}): ClientStorage => {
  return {
    ...storage,
    getItem: (key, defaultState = null) => {
      const value = storage.getItem(`${prefix}.${key}`)
      try {
        return decryptAESDeserialize({
          value,
          defaultState,
          secureKey,
        })
      } catch (error) {
        console.warn(error)
        return defaultState
      }
    },
    setItem: (key, value) => {
      if (value === null) {
        storage.removeItem(`${prefix}.${key}`)
      } else {
        try {
          if (secureKey)
            return storage.setItem(`${prefix}.${key}`, AES.encrypt(serialize(value), secureKey ?? 'key').toString())
          storage.setItem(`${prefix}.${key}`, serialize(value))
        } catch (err) {
          console.error(err)
        }
      }
    },
    removeItem: (key) => storage.removeItem(`${prefix}.${key}`),
  }
}
