import type { FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { User } from 'firebase/auth'
import { getAuth, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import { debounce } from 'lodash-es'

import { ENV } from '@/constants'
import { AuthService, UserService } from '@/services'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig: FirebaseOptions = {
  apiKey: ENV.FIREBASE_API_KEY,
  appId: ENV.FIREBASE_APP_ID,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  projectId: ENV.FIREBASE_PROJECT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

const initializeFirebase = () => {
  const getUserData = debounce(async (_user: User) => {
    const currentProfile = useUserStore.getState().profile
    if (currentProfile) return

    try {
      await UserService.me()
    } catch (_error) {
      await AuthService.logout()
      useAuthStore.getState().logout()
    }
  }, 50)

  onIdTokenChanged(auth, async (user) => {
    if (user) {
      const accessToken = await user.getIdToken()
      useAuthStore.getState().login({
        accessToken,
        refreshToken: user.refreshToken,
      })
      getUserData(user)
    }
  })

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const accessToken = await user.getIdToken()
      useAuthStore.getState().login({
        accessToken,
        refreshToken: user.refreshToken,
      })
      getUserData(user)
    } else {
      useAuthStore.getState().logout()
    }
  })
}

export { initializeFirebase, auth }
export default app
