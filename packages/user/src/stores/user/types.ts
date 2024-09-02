import type { UserInfo } from 'firebase/auth'

import type { IUser } from '@/types/modules/user'

export interface IUserState {
  profile: IUser
  firebase: {
    providerData: UserInfo[]
  }
}

export interface IUserActions {
  setProfile: (profile: IUser) => void
  clear: VoidFunction
  setSetupNewUser: (payload: Pick<IUser, 'isNewUser' | 'nameEn' | 'nameTh'>) => void
  setFirebaseProviderData: (payload: UserInfo[]) => void
}
