import { t } from '@lingui/macro'
import type { IBackofficeLayoutMenuItem } from '@olufy-frontend/shared/layouts/Backoffice/types'

import { IS_PRODUCTION } from '../configs'

import { RolePermission } from '@/enums/role'

export const GET_BASE_BACKOFFICE_SIDEBAR_CONFIG = () =>
  [
    {
      key: 'dashboard',
      iconName: 'backoffice-sidebar-dashboard',
      label: t`Dashboard`,
      path: '/app/',
      symbole: RolePermission.ADMIN_DASHBOARD,
      isAvailable: true,
    },
    {
      key: 'banner',
      iconName: 'backoffice-sidebar-banner',
      label: t`จัดการแบนเนอร์`,
      path: '/app/banner',
      symbole: RolePermission.ADMIN_BANNER,
      isAvailable: true,
    },
    {
      key: 'partner',
      iconName: 'backoffice-sidebar-partner',
      label: t`จัดการพาร์ทเนอร์`,
      path: '/app/partner',
      symbole: RolePermission.ADMIN_PARTNER,
      isAvailable: true,
    },
    {
      key: 'contact',
      iconName: 'backoffice-sidebar-contact',
      label: t`ข้อความจากเว็บไซต์`,
      path: '/app/contact',
      symbole: RolePermission.ADMIN_CONTACT,
      isAvailable: true,
    },
    {
      key: 'ticket',
      iconName: 'backoffice-sidebar-ticket',
      label: t`ข้อความจากผู้ใช้งาน`,
      path: '/app/ticket',
      symbole: RolePermission.ADMIN_TICKET,
      isAvailable: true,
    },
    {
      key: 'news',
      iconName: 'backoffice-sidebar-news',
      label: t`จัดการข่าวสาร`,
      path: '/app/news',
      symbole: RolePermission.ADMIN_NEWS,
      isAvailable: true,
    },
    {
      key: 'admin',
      iconName: 'backoffice-sidebar-admin',
      label: t`จัดการแอดมิน`,
      path: '/app/admin',
      symbole: RolePermission.ADMIN_MANAGE_ADMIN,
      isAvailable: true,
    },
    {
      key: 'member',
      iconName: 'backoffice-sidebar-user',
      label: t`จัดการผู้ใช้งาน`,
      path: '/app/member',
      symbole: RolePermission.ADMIN_MANAGE_USER,
      isAvailable: true,
    },
    {
      key: 'membership',
      iconName: 'backoffice-sidebar-membership',
      label: t`จัดการระดับสมาชิก`,
      path: '/app/membership',
      symbole: RolePermission.ADMIN_MANAGE_MEMBERSHIP,
      isAvailable: true,
    },
    {
      key: 'co-location',
      iconName: 'backoffice-sidebar-co-location',
      label: t`จัดการ Co-location`,
      path: '/app/co-location',
      symbole: RolePermission.ADMIN_COLOCATION,
      isAvailable: false,
    },
    {
      key: 'hosting',
      iconName: 'backoffice-sidebar-hosting',
      label: t`จัดการ Hosting`,
      path: '/app/hosting',
      symbole: RolePermission.ADMIN_HOSTING,
      isAvailable: false,
    },
    {
      key: 'domain',
      iconName: 'backoffice-sidebar-domain',
      label: t`จัดการ Domain`,
      path: '/app/domain',
      symbole: RolePermission.ADMIN_DOMAIN,
      isAvailable: false,
    },
    {
      key: 'license',
      iconName: 'backoffice-sidebar-license',
      label: t`จัดการ License Key`,
      path: '/app/license',
      symbole: RolePermission.ADMIN_LICENSE,
      isAvailable: false,
    },
    {
      key: 'addon',
      iconName: 'backoffice-sidebar-addon',
      label: t`จัดการ Add On`,
      path: '/app/addon',
      symbole: RolePermission.ADMIN_ADDON,
      isAvailable: false,
    },
    {
      key: 'dedicated',
      iconName: 'backoffice-sidebar-dedicated',
      label: t`จัดการ Dedicated Server`,
      path: '/app/dedicated',
      symbole: RolePermission.ADMIN_DEDICATED,
      isAvailable: false,
    },
    {
      key: 'vps-auto',
      iconName: 'backoffice-sidebar-vps-auto',
      label: t`จัดการ VPS Auto`,
      path: '/app/vps-auto',
      symbole: RolePermission.ADMIN_VPS_AUTO,
      isAvailable: false,
    },
    {
      key: 'receipt',
      iconName: 'backoffice-sidebar-quotation',
      label: t`การชำระเงิน`,
      path: '/app/receipt',
      symbole: RolePermission.ADMIN_DOCUMENT,
      isAvailable: true,
    },
    {
      key: 'vps-server',
      iconName: 'backoffice-sidebar-vps-server',
      label: t`จัดการ VPS Server`,
      path: '/app/vps-server',
      symbole: RolePermission.ADMIN_VPS_SERVER,
      isAvailable: true,
    },
    {
      key: 'template',
      iconName: 'backoffice-sidebar-template',
      label: t`จัดการเทมเพลต`,
      path: '/app/template',
      symbole: RolePermission.ADMIN_TEMPLATE,
      isAvailable: true,
    },
    {
      key: 'data-center',
      iconName: 'backoffice-sidebar-data-center',
      label: t`จัดการ Data Center`,
      path: '/app/data-center',
      symbole: RolePermission.ADMIN_DATA_CENTER,
      isAvailable: true,
    },
    {
      key: 'rack',
      iconName: 'backoffice-sidebar-rack',
      label: t`จัดการ Rack`,
      path: '/app/rack',
      symbole: RolePermission.ADMIN_RACK,
      isAvailable: true,
    },
    {
      key: 'server',
      iconName: 'backoffice-sidebar-server',
      label: t`จัดการ Server List`,
      path: '/app/server',
      symbole: RolePermission.ADMIN_SERVER,
      isAvailable: true,
    },
    {
      key: 'order',
      iconName: 'backoffice-sidebar-order',
      label: t`จัดการออเดอร์`,
      path: '/app/order',
      symbole: RolePermission.ADMIN_ORDER,
      isAvailable: false,
    },
    {
      key: 'manage-ip',
      iconName: 'backoffice-sidebar-manage-ip',
      label: t`จัดการ IP`,
      path: '/app/manage-ip',
      symbole: RolePermission.ADMIN_MANAGE_IP,
      isAvailable: true,
    },
    // {
    //   key: 'submenu1',
    //   icon: 'loader',
    //   label: 'Submenu',
    //   items: [
    //     {
    //       label: 'menu1',
    //       path: '/app/sub1',
    //     },
    //   ],
    // },
  ] as IBackofficeLayoutMenuItem<RolePermission>[]

export const GET_BACKOFFICE_SIDEBAR_CONFIG = () =>
  GET_BASE_BACKOFFICE_SIDEBAR_CONFIG().filter((e) => {
    if (!IS_PRODUCTION) return true
    return e.isAvailable
  })
