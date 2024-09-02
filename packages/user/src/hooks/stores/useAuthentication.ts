import { useEffect, useState } from 'react'

import { useAuthStore } from '@/stores/auth'
import { getAuthenticationSsr } from '@/stores/auth/utils'

import { usePageContext } from '../usePageContext'

export const useAuthentication = () => {
  const { cookie } = usePageContext()
  const { isAuth: _isAuthFn } = useAuthStore()
  const { isAuth: isAuthSsr, tokens } = getAuthenticationSsr(cookie)
  const _isAuth = _isAuthFn()

  // _State
  const [isAuth, setIsAuth] = useState(isAuthSsr)

  // _Effect
  useEffect(() => {
    setIsAuth(_isAuth)
  }, [_isAuth])

  return {
    isAuth,
    tokens,
  }
}
