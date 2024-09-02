import Utf8 from 'crypto-js/enc-utf8'
import AES from 'crypto-js/aes'

export const deserialize = (cachedString: string) => {
  return JSON.parse(cachedString)
}

export const decryptAESDeserialize = ({
  value,
  secureKey = null,
  defaultState = null,
}: {
  value: string
  secureKey?: string | null
  defaultState?: unknown
}) => {
  if (secureKey) {
    const bytes = AES.decrypt(value ?? 'empty', secureKey ?? 'key')
    return value ? deserialize(bytes.toString(Utf8)) : defaultState
  }
  return value ? deserialize(value) : defaultState
}
