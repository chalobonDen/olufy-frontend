import { t } from '@lingui/macro'

import { RolePermission } from '@/enums/role'

export const GET_PERMISSIONS = () => ({
  [RolePermission.ADMIN_DASHBOARD]: {
    name: t`Dashboard`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_BANNER]: {
    name: t`จัดการแบนเนอร์`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_PARTNER]: {
    name: t`จัดการพาร์ทเนอร์`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_CONTACT]: {
    name: t`ข้อความจากเว็บไซต์`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_TICKET]: {
    name: t`ข้อความจากผู้ใช้งาน`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_NEWS]: {
    name: t`จัดการข่าวสาร`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_MANAGE_ADMIN]: {
    name: t`จัดการแอดมิน`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_DEDICATED]: {
    name: t`จัดการ Dedicated Server`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_VPS_AUTO]: {
    name: t`จัดการ VPS Auto`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_VPS_SERVER]: {
    name: t`จัดการ VPS Server`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_COLOCATION]: {
    name: t`จัดการ Co-location`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_HOSTING]: {
    name: t`จัดการ Hosting`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_DOMAIN]: {
    name: t`จัดการ Domain`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_LICENSE]: {
    name: t`จัดการ License Key`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_ADDON]: {
    name: t`จัดการ Add On`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_MANAGE_USER]: {
    name: t`จัดการผู้ใช้งาน`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_MANAGE_MEMBERSHIP]: {
    name: t`จัดการระดับสมาชิก`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_ORDER]: {
    name: t`จัดการออเดอร์`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_DOCUMENT]: {
    name: t`การชำระเงิน`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_INVOICE]: {
    name: t`ใบเสนอราคา`,
    isDbAvailable: false,
  },
  [RolePermission.ADMIN_RECEIPT]: {
    name: t`ใบแจ้งหนี้`,
    isDbAvailable: false,
  },
  [RolePermission.ADMIN_BILLING_SLIP]: {
    name: t`ใบเสร็จรับเงิน`,
    isDbAvailable: false,
  },
  [RolePermission.ADMIN_TEMPLATE]: {
    name: t`จัดการเทมเพลต`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_MANAGE_IP]: {
    name: t`จัดการ IP`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_DATA_CENTER]: {
    name: t`จัดการ Data Center`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_RACK]: {
    name: t`จัดการ Rack`,
    isDbAvailable: true,
  },
  [RolePermission.ADMIN_SERVER]: {
    name: t`จัดการ Server List`,
    isDbAvailable: true,
  },
})
