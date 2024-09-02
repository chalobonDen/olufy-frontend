import type { IPaginatedResponse, IPaginationQuery } from '../pagination'
import type { IRole } from './role'

import type { UserFlag } from '@/enums'

export interface IUser {
  createdAt: Date
  credit: number
  email: string
  firebaseUid: string
  flag: UserFlag
  id: number
  identityCardNumber: string
  isNewUser: boolean
  isVerifyEmail: boolean
  isVerifyIdentityCard: boolean
  isVerifyMobile: boolean
  nameEn: string
  nameTh: string
  role: IRole
  tel: string
  updatedAt: Date
}

export interface ISimpleUser extends Pick<IUser, 'nameEn' | 'email' | 'flag' | 'id' | 'role'> {}

export interface IManageUser {
  id?: number
  name: string
  email: string
  permissionId: number | string
  password?: string
  role?: IRole
}

export interface IUserQueryParams extends IPaginationQuery {
  search?: string
}

export interface IUserPaginationResponse extends IPaginatedResponse<ISimpleUser> {}

export interface IUserItem {
  id: number
  name: string
}

export interface IUsersList {
  users: IUserItem[]
}
