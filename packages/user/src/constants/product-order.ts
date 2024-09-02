import { t } from '@lingui/macro'

export const GET_ORDER_LIST = () => {
  return [
    {
      imageUrl: '/images/service/cloud-server.png',
      title: t`Cloud Server`,
      description: t`สร้างเซิร์ฟเวอร์ภายใน 1 นาที`,
      readmore: {
        label: t`Start Cloud`,
        path: '/',
      },
    },
    {
      imageUrl: '/images/service/dedicated-server.png',
      title: t`Dedicated Server`,
      description: t`เซิร์ฟเวอร์ส่วนตัวให้ 5 นาที`,
      readmore: {
        label: t`Get Server`,
        path: '/',
      },
    },
    {
      imageUrl: '/images/service/vps-server.png',
      title: t`VPS Server`,
      description: t`เช่าบริการ วีพีเอส ส่วนตัว`,
      readmore: {
        label: t`Rent VPS`,
        path: '/',
      },
    },
    {
      imageUrl: '/images/service/co-location.png',
      title: t`Co-location`,
      description: t`วางเซิร์ฟเวอร์`,
      readmore: {
        label: t`Co-location`,
        path: '/',
      },
    },
    {
      imageUrl: '/images/service/cdn.png',
      title: t`Hosting`,
      description: t`คลาวด์โฮสติ้งส่วนตัว`,
      readmore: {
        label: t`Get Hosting`,
        path: '/',
      },
    },
    {
      imageUrl: '/images/service/domains.png',
      title: t`Domains`,
      description: t`จดทะเบียนโดเมน`,
      readmore: {
        label: t`Register Domaln`,
        path: '/',
      },
    },
    {
      imageUrl: '/images/service/application.png',
      title: t`Application`,
      description: t`ออกแบบเว็บไซต์พัฒนา ระบบ`,
      readmore: {
        label: t`Your Desing`,
        path: '/',
      },
    },
    {
      imageUrl: '/images/service/cloud-gaming.png',
      title: t`Streaming`,
      description: t`บริการสตรีมมิ่งสด`,
      readmore: {
        label: t`Streaming`,
        path: '/',
      },
    },
  ]
}
