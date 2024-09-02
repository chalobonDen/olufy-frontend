import { camelCase, snakeCase } from 'lodash-es'

export const camelizeKeys = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v))
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    )
  }
  return obj
}

export const snakelizeKeys = (obj: any, ignoreKeys = [] as string[]) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakelizeKeys(v, ignoreKeys))
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      if (ignoreKeys.includes(key))
        return {
          ...result,
          [key]: snakelizeKeys(obj[key], ignoreKeys),
        }
      return {
        ...result,
        [snakeCase(key)]: snakelizeKeys(obj[key], ignoreKeys),
      }
    }, {})
  }
  return obj
}
