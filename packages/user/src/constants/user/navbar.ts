import { t } from '@lingui/macro'

import { IS_PRODUCTION } from '../configs'

export const GET_BASE_USER_NAVBAR_CONFIG = () => [
  {
    title: t`Server`,
    items: [
      {
        label: t`Cloud Server`,
        imageUrl: '/images/service/cloud-server.png',
        path: '/cloud-server',
        isAvailable: false,
      },
      {
        label: t`Dedicated Server`,
        imageUrl: '/images/service/dedicated-server.png',
        path: '/dedicated-server',
        isAvailable: false,
      },
      {
        label: t`VPS Server`,
        imageUrl: '/images/service/vps-server.png',
        path: '/vps-server',
        isAvailable: true,
      },
      {
        label: t`Firewall`,
        imageUrl: '/images/service/firewall.png',
        path: '/firewall',
        isAvailable: false,
      },
    ],
  },
  {
    title: t`Hosting`,
    items: [
      {
        label: t`Domains`,
        imageUrl: '/images/service/domains.png',
        path: '/domain',
        isAvailable: false,
      },
      {
        label: t`Application`,
        imageUrl: '/images/service/application.png',
        path: '/application',
        isAvailable: true,
      },
      {
        label: t`CDN`,
        imageUrl: '/images/service/cdn.png',
        path: '/cdn',
        isAvailable: false,
      },
    ],
  },
  {
    title: t`Co-location`,
    items: [
      {
        label: t`Co-location`,
        imageUrl: '/images/service/co-location.png',
        path: '/co-location',
        isAvailable: false,
      },
    ],
  },
]

export const GET_USER_NAVBAR_CONFIG = () =>
  GET_BASE_USER_NAVBAR_CONFIG().map((e) => {
    if (!IS_PRODUCTION) return e

    return {
      ...e,
      items: e.items.filter((item) => item.isAvailable),
    }
  })
