import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'

import { useAuthStore } from '@/stores/auth'
import { ENV } from '@/constants'
import { useSettingStore } from '@/stores/setting'
import { getLanguageFull } from '@/stores/setting/utils'

import { auth } from './firebase'

import type { IBaseResponseError } from '@/types/base'

/**
 * Create axios instance.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: ENV.API_ENDPOINT,
})

/**
 * Axios also provides a request interceptor, allows changes to the request data before it is sent to the server
 * This is only applicable for request methods 'POST', 'PUT', 'PATCH' and 'DELETE'
 * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
 * FormData or Stream
 * You may modify the headers object.
 */
Axios.interceptors.request.use(
  async (reqConfig) => {
    const locale = useSettingStore.getState().lang
    let accessToken = useAuthStore.getState().accessToken as string

    if (auth.currentUser) {
      const user = auth.currentUser
      const token = await user.getIdToken()
      useAuthStore.getState().login({
        accessToken: token,
        refreshToken: user.refreshToken,
      })
      accessToken = token
    }

    const config = reqConfig
    if (config.headers) {
      if (accessToken) config.headers['Authorization'] = `bearer ${accessToken}`
      if (locale) config.headers['Accept-Language'] = getLanguageFull(locale)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const isAxiosError = (payload: unknown): payload is AxiosError<unknown, unknown> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(payload)
}

export const handleAxiosErrorMsg = (err: any): string => {
  if (isAxiosError(err)) {
    if (err.response) {
      const data = err.response.data as IBaseResponseError
      return data.message
    } else if (err.message) {
      return err.message
    }
  }

  if (!!err.message) {
    return err.message
  }

  return 'Somethin wrong!'
}

export default Axios
