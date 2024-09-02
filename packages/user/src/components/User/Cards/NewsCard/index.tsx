import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { useIsMounted } from '@olufy-frontend/shared/hooks'

import UserCard from '@/components/UI/User/Card'
import { formatDate } from '@/utils'
import Link from '@/components/Link'

import type { INews } from '@/types/modules/news'

interface INewsCardProps {
  data: INews
}

const NewsCard: FC<INewsCardProps> = ({ data }) => {
  const { i18n } = useLingui()
  const { isMounted } = useIsMounted()

  return (
    <UserCard className={clsx(`flex flex-col`)}>
      <Link
        href={`/news/${data.slug}`}
        title={data.title}
        className={clsx(`aspect-[327/200] overflow-hidden rounded-lg`)}
      >
        <img
          src={data.titleImageUrl}
          alt={`${data.title} picture`}
          className={clsx(
            `h-full w-full bg-white-500 object-cover`,
            `transition-transform duration-300 ease-in-out will-change-transform hover:rotate-2 hover:scale-125`,
            `dark:bg-dark-300`,
          )}
        />
      </Link>
      <span className={clsx(`desc mt-4`, `lg:text-body-14`)}>
        {isMounted && formatDate(new Date(data.createdAt), 'MMMM dd, yyyy')}
      </span>
      <Link
        href={`/news/${data.slug}`}
        title={data.title}
        className={clsx(`text-header-3`, `transition-colors hover:text-primary-500`, `2xl:text-header-4`)}
      >
        {data.title}
      </Link>
      <p className={clsx(`desc mt-2 line-clamp-3`)}>{data.description}</p>

      <Link
        href={`/news/${data.slug}`}
        title={data.title}
        className={clsx(`mt-2 flex items-center space-x-1 text-primary-500`)}
      >
        <span>{i18n._(t`อ่านต่อ`)}</span>
        <SvgIcon name="arrow-right" className={clsx(`square-6`)} />
      </Link>
    </UserCard>
  )
}

export default NewsCard
