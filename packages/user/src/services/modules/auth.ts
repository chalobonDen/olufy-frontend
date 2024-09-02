import type { User, UserCredential } from 'firebase/auth'
import {
  EmailAuthProvider,
  unlink,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  linkWithCredential,
} from 'firebase/auth'

import { auth } from '@/libs/firebase'
import { useUserStore } from '@/stores/user'

import BaseService from './base'

import type { IAuthRegisterParams, IAuthResponse } from '@/types/auth'

export default class AuthService extends BaseService {
  /**
   * Login
   */
  static async login(params: IAuthRegisterParams): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, params.email, params.password)
  }

  /**
   * Login via google account
   */
  static async loginWithGoogleAccount(): Promise<IAuthResponse> {
    const provider = new GoogleAuthProvider()
    provider.addScope('email')

    try {
      const { user } = await signInWithPopup(auth, provider)
      const accessToken = await user.getIdToken()

      // update firebase provider data
      useUserStore.getState().setFirebaseProviderData(user?.providerData)

      return {
        ...user,
        accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Login via google account
   */
  static async loginWithFacebookAccount(): Promise<IAuthResponse> {
    const provider = new FacebookAuthProvider()
    provider.addScope('email')

    try {
      const { user } = await signInWithPopup(auth, provider)
      const accessToken = await user.getIdToken()

      // update firebase provider data
      useUserStore.getState().setFirebaseProviderData(user?.providerData)

      return {
        ...user,
        accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Login via github account
   */
  static async loginWithGithubAccount(): Promise<IAuthResponse> {
    const provider = new GithubAuthProvider()
    provider.addScope('repo')

    try {
      const { user } = await signInWithPopup(auth, provider)
      const accessToken = await user.getIdToken()

      // update firebase provider data
      useUserStore.getState().setFirebaseProviderData(user?.providerData)

      return {
        ...user,
        accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Register by email & password
   */
  static async registerEmail(params: IAuthRegisterParams): Promise<IAuthResponse> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, params.email, params.password)
      const accessToken = await user.getIdToken()
      return {
        ...user,
        accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Send a password reset email
   */
  static async sendResetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email)
  }

  /**
   * Add email address and password credentials to an existing user account
   */
  static async linkWithEmailPassword(params: IAuthRegisterParams): Promise<IAuthResponse> {
    try {
      const credential = EmailAuthProvider.credential(params.email, params.password)
      const data = await linkWithCredential(auth.currentUser, credential)
      const { user } = data
      const accessToken = await user.getIdToken()

      return {
        ...user,
        accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Unlink an auth provider from a user account
   */
  static async unlink(providerId: string): Promise<User> {
    try {
      const user = await unlink(auth.currentUser, providerId)

      // update firebase provider data
      useUserStore.getState().setFirebaseProviderData(user?.providerData)

      return user
    } catch (error) {
      throw error
    }
  }

  /**
   * Logout
   */
  static async logout(): Promise<void> {
    return signOut(auth)
  }
}
