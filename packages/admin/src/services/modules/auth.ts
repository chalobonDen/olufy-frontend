import type { UserCredential } from 'firebase/auth'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { auth } from '@/libs/firebase'

import BaseService from './base'

import type { IAuthRegisterParams } from '@/types/auth'

export default class AuthService extends BaseService {
  /**
   * Login
   */
  static async login(params: IAuthRegisterParams): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, params.email, params.password)
  }

  /**
   * Logout
   */
  static async logout(): Promise<void> {
    return signOut(auth)
  }
}
