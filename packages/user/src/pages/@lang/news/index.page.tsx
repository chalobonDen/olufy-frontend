import { Fragment, useState } from 'react'

import clsx from 'clsx'
import { range } from 'lodash-es'
import { Pagination } from '@olufy-frontend/shared/UI'
import { useQuery } from '@tanstack/react-query'

import UserNewsCoverSection from '@/components/User/Sections/News/CoverSection'
import type { DocumentProps } from '@/renderer/types'
import UserContainer from '@/components/UI/User/Container'
import NewsCard from '@/components/User/Cards/NewsCard'
import { NewsService } from '@/services'
import PlaceholderNewsCard from '@/components/User/Cards/NewsCard/PlaceholderNewsCard'

import type { INewsQueryParams } from '@/types/modules/news'

export const Page = () => {
  // _State
  const [queryParams, setQueryParams] = useState<INewsQueryParams>({
    page: 1,
    perPage: 12,
    search: '',
  })

  // _Query
  const { data, isLoading } = useQuery(['get-news-list', queryParams], ({ signal }) =>
    NewsService.list(queryParams, { signal }),
  )

  return (
    <Fragment>
      <UserNewsCoverSection />

      <section className={clsx(`pb-20 pt-8`)}>
        <UserContainer>
          <div className={clsx(`mt-10 grid grid-cols-3 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
            {data?.items.map((item, itemIdx) => (
              <NewsCard key={`news-${itemIdx}`} data={item} />
            ))}

            {isLoading && range(1, 7).map((n) => <PlaceholderNewsCard key={n} />)}
          </div>

          {data?.items?.length > 0 && (
            <div className={clsx(`mt-12 text-center`)}>
              <Pagination
                current={queryParams.page}
                total={data?.total ?? 0}
                pageSize={queryParams.perPage}
                showLessItems
                onChange={(e) => {
                  setQueryParams((state) => ({
                    ...state,
                    page: e,
                  }))
                }}
              />
            </div>
          )}
        </UserContainer>
      </section>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'News',
}
