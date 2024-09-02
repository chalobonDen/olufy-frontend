import type { FC } from 'react'

import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'
import Button from '@/components/Button'

import NewsCard from '../../Cards/NewsCard'

import type { INews } from '@/types/modules/news'

interface IUserHomeNewsSectionProps {
  news: INews[]
}

const UserHomeNewsSection: FC<IUserHomeNewsSectionProps> = ({ news }) => {
  const { i18n } = useLingui()

  return (
    <section className={clsx(`py-12`)}>
      <UserContainer>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`ข่าวสาร`)}</UserTitle>

        <div className={clsx(`mt-10 grid grid-cols-3 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          {news.map((item, itemIdx) => (
            <NewsCard key={`news-${itemIdx}`} data={item} />
          ))}
        </div>

        <div className={clsx(`mt-10 text-center`)}>
          <Button variant="primary" className={clsx(`space-x-2`)} as="a" href="/news">
            <span>{i18n._(t`ดูทั้งหมด`)}</span>
            <SvgIcon name="arrow-right" className={clsx(`square-6`)} />
          </Button>
        </div>
      </UserContainer>
    </section>
  )
}

export default UserHomeNewsSection
