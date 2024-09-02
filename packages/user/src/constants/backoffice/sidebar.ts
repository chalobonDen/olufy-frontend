import type { IBackofficeLayoutMenuItem } from '@olufy-frontend/shared/layouts/Backoffice/types'

import { IS_PRODUCTION } from '../configs'

export const GET_BASE_BACKOFFICE_SIDEBAR_CONFIG = () =>
  [
    {
      key: 'dashboard',
      iconName: 'backoffice-sidebar-dashboard',
      label: `Dashboard`,
      path: '/app/',
      isAvailable: true,
    },
    {
      key: 'order',
      iconName: 'backoffice-sidebar-order',
      label: `Order`,
      path: '/app/order',
      isAvailable: false,
    },
    {
      key: 'dedicated-server',
      iconName: 'backoffice-sidebar-dedicated',
      label: `Dedicated Server`,
      path: '/app/dedicated-server',
      isAvailable: false,
    },
    {
      key: 'vps-auto',
      iconName: 'backoffice-sidebar-vps-auto',
      label: `VPS Auto`,
      path: '/app/vps-auto',
      isAvailable: false,
    },
    {
      key: 'vps-server',
      iconName: 'backoffice-sidebar-vps-server',
      label: `VPS Server`,
      path: '/app/vps-server',
      isAvailable: true,
    },
    {
      key: 'Co-location',
      iconName: 'backoffice-sidebar-co-location',
      label: `Co-location`,
      path: '/app/co-location',
      isAvailable: false,
    },
    {
      key: 'Hosting',
      iconName: 'backoffice-sidebar-hosting',
      label: `Hosting`,
      path: '/app/hosting',
      isAvailable: false,
    },
    {
      key: 'domain',
      iconName: 'backoffice-sidebar-domain',
      label: `Domain`,
      path: '/app/domain',
      isAvailable: false,
    },
    {
      key: 'License key',
      iconName: 'backoffice-sidebar-license-key',
      label: `License key`,
      path: '/app/license-key',
      isAvailable: false,
    },
    {
      key: 'invoice',
      iconName: 'backoffice-sidebar-invoice',
      label: `Invoice`,
      path: '/app/invoice',
      isAvailable: false,
    },
    {
      key: 'payment',
      iconName: 'backoffice-sidebar-payment',
      label: `Payment`,
      path: '/app/payment',
      isAvailable: false,
    },
    {
      key: 'add-funds',
      iconName: 'backoffice-sidebar-add-funds',
      label: `Add Funds`,
      path: '/app/add-funds',
      isAvailable: true,
    },
    {
      key: 'ips-firewall',
      iconName: 'backoffice-sidebar-ips-firewall',
      label: `IPS-Firewall`,
      path: '/app/ips-firewall',
      isAvailable: false,
    },
    {
      key: 'contact-admin',
      iconName: 'backoffice-sidebar-contact-admin',
      label: `Contact Admin`,
      path: '/app/contact-admin',
      isAvailable: true,
    },
    {
      key: 'billing',
      iconName: 'backoffice-sidebar-invoice',
      label: 'Billing History',
      path: '/app/billing',
      items: [
        {
          label: 'Invoice',
          path: '/app/billing/invoice',
          isAvailable: false,
        },
        {
          label: 'Receipt / Tax Invoice',
          path: '/app/billing/receipt',
          isAvailable: true,
        },
      ],
    },
  ] as IBackofficeLayoutMenuItem[]

export const GET_BACKOFFICE_SIDEBAR_CONFIG = () =>
  GET_BASE_BACKOFFICE_SIDEBAR_CONFIG()
    .filter((e) => {
      let validation = 0

      if (!IS_PRODUCTION) return true

      if (e?.items?.length > 0) {
        const filterItemsAvailable = e.items.filter((item) => item.isAvailable)
        if (filterItemsAvailable?.length > 0) validation += 1
      }

      return e.isAvailable || validation
    })
    .map((e) => {
      if (e?.items?.length > 0) {
        return {
          ...e,
          items: e.items.filter((item) => item.isAvailable),
        }
      }

      return e
    })
