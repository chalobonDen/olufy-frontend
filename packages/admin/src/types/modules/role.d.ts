import type { RolePermission } from '@/enums/role'

export interface IRole {
  id: number
  name: string
  rolePermissions: RolePermission[]
}

export interface ISimpleRole extends Pick<IRole, 'id' | 'name'> {}

export interface IManageRole {
  id?: number
  name: string
  permissions: RolePermission[]
}
