import type { Style } from '@react-pdf/types'

import type { DocumentSizeType } from './styles'
import { sizes } from './styles'

const record = <Prop extends PropertyKey, Value extends Style>(prop: Prop, value: Value) =>
  ({ [prop]: value } as Record<Prop, Value>)

const giveMeFunctions = <
  NamePrefix extends string,
  SizePrefix extends DocumentSizeType,
  Value extends number,
  TypePrefix extends string,
>(
  namePrefix: NamePrefix,
  keyPrefix: SizePrefix,
  typePrefix: TypePrefix,
  value: Value,
) => ({
  ...record(`${namePrefix}t-${keyPrefix}`, {
    [`${typePrefix}Top`]: value,
  }),
  ...record(`${namePrefix}b-${keyPrefix}`, {
    [`${typePrefix}Bottom`]: value,
  }),
  ...record(`${namePrefix}l-${keyPrefix}`, {
    [`${typePrefix}Left`]: value,
  }),
  ...record(`${namePrefix}r-${keyPrefix}`, {
    [`${typePrefix}Right`]: value,
  }),
  ...record(`${namePrefix}y-${keyPrefix}`, {
    [`${typePrefix}Vertical`]: value,
  }),
  ...record(`${namePrefix}x-${keyPrefix}`, {
    [`${typePrefix}Horizontal`]: value,
  }),
})

/**
 * For generate `margin | padding` prefix key to use like `tailwindcss`
 * Example: generateStyleSize('margin') // Output: `mt-sm`, ...
 */
export const generateStyleSize = (type: 'margin' | 'padding') => {
  const k = type === 'margin' ? 'm' : 'p'

  const data = Object.entries(sizes).map(([key, value]) => {
    return giveMeFunctions(k, key as DocumentSizeType, type, value)
  })
  const item = data[0]

  return data.reduce((a, c) => ({ ...a, ...c }), {} as typeof item)
}

/**
 * replace vowel in thai
 */
export const replaceThaiMessage = (msg: string) => msg.replace(/ำ/g, 'ํา')

/**
 * render thai message
 * renderText(`จำกัด`)
 */
export const renderText = (msg: string) => {
  let newMsg = msg
  newMsg = replaceThaiMessage(newMsg)
  return newMsg
}
