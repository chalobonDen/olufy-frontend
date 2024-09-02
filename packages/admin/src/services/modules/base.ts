import { camelizeKeys, snakelizeKeys } from '@olufy-frontend/shared/utils'

import axios from '@/libs/axios'
import type { PageContext } from '@/renderer/types'
import { ENV } from '@/constants'
import { getAuthenticationSsr } from '@/stores/auth/utils'
import { getSettingSsr } from '@/stores/setting/utils'

import type { IBaseAxiosRequestConfig } from '@/types/base'

export default class BaseService {
  static async _get(url: string, config?: IBaseAxiosRequestConfig) {
    const params = config?.params
    const ignoreSnakeKeys = config?.ignoreSnakeKeys ?? []

    try {
      const res = await axios.get(url, {
        ...config,
        params: params ? snakelizeKeys(params, ignoreSnakeKeys) : {},
      })
      return Promise.resolve(camelizeKeys(res.data?.data))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static async _post(url: string, data?: unknown, config?: IBaseAxiosRequestConfig) {
    const ignoreSnakeKeys = config?.ignoreSnakeKeys ?? []

    try {
      const res = await axios.post(url, snakelizeKeys(data, ignoreSnakeKeys), config)
      return Promise.resolve(camelizeKeys(res.data?.data))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static async _patch(url: string, data?: unknown, config?: IBaseAxiosRequestConfig) {
    const ignoreSnakeKeys = config?.ignoreSnakeKeys ?? []

    try {
      const res = await axios.patch(url, snakelizeKeys(data, ignoreSnakeKeys), config)
      return Promise.resolve(camelizeKeys(res.data?.data))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static async _put(url: string, data?: unknown, config?: IBaseAxiosRequestConfig) {
    const ignoreSnakeKeys = config?.ignoreSnakeKeys ?? []

    try {
      const res = await axios.put(url, snakelizeKeys(data, ignoreSnakeKeys), config)
      return Promise.resolve(camelizeKeys(res.data?.data))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static async _delete(url: string, data?: unknown, config?: IBaseAxiosRequestConfig) {
    try {
      const res = await axios.delete(url, {
        ...config,
        data,
      })
      return Promise.resolve(camelizeKeys(res.data?.data))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // SSR
  static async _getSSR(pageContext: PageContext, url: string, headers?: HeadersInit) {
    const { tokens } = getAuthenticationSsr(pageContext.cookie)
    const { lang } = getSettingSsr(pageContext.cookie)

    const res = await pageContext.fetch(ENV.API_ENDPOINT + url, {
      headers: {
        Authorization: `bearer ${tokens?.accessToken}`,
        'Accept-Language': lang,
        ...headers,
      },
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    return Promise.resolve(camelizeKeys(data?.data))
  }

  static async _postSSR(pageContext: PageContext, url: string, payload?: unknown, headers?: HeadersInit) {
    const { tokens } = getAuthenticationSsr(pageContext.cookie)

    const res = await pageContext.fetch(ENV.API_ENDPOINT + url, {
      body: JSON.stringify(payload ?? {}),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${tokens?.accessToken}`,
        ...headers,
      },
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    return Promise.resolve(camelizeKeys(data?.data))
  }
}
