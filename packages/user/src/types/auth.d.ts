import type { User, AuthErrorCodes } from 'firebase/auth'

export interface IAuthLoginParams {
  email: string
  password: string
}

export interface IAuthRegisterParams extends IAuthLoginParams {
  referral?: string
}

export interface IAuthResponse extends User {
  accessToken: string
}

export interface IAuthEventError {
  code: AuthErrorCodes
  message: string
}
