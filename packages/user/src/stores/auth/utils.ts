import { parse } from 'cookie'
import { decryptAESDeserialize } from '@olufy-frontend/shared/utils'

import type { IAuthState } from '@/stores/auth/types'
import { DEFAULT_STORAGE_PREFIX, STORE_KEY } from '@/constants'

interface IGetAuthentication {
  isAuth: boolean
  tokens: Omit<IAuthState, 'isAuth'>
}

const DEFAULT_AUTHENTICATION_DATA: IGetAuthentication = {
  isAuth: false,
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
}

export const deserializeAuthTokenSsr = (cookie: string): Omit<IAuthState, 'isAuth'> => {
  const value = parse(cookie)[`${DEFAULT_STORAGE_PREFIX}.${STORE_KEY.auth.key}`]
  const tokens = decryptAESDeserialize({
    value,
    secureKey: STORE_KEY.auth.secureKey,
  })
  return tokens
}

export const getAuthenticationSsr = (cookie: string): { isAuth: boolean; tokens: Omit<IAuthState, 'isAuth'> } => {
  if (!cookie) return DEFAULT_AUTHENTICATION_DATA
  const tokens = deserializeAuthTokenSsr(cookie)
  return {
    isAuth: !!tokens?.accessToken,
    tokens,
  }
}
