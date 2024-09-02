import type { IUser } from '@/types/modules/user'

export interface IUserState {
  profile: IUser
}

export interface IUserActions {
  setProfile: (profile: IUser) => void
  clear: VoidFunction
  setSetupNewUser: (payload: Pick<IUser, 'isNewUser' | 'nameEn' | 'nameTh'>) => void
}
