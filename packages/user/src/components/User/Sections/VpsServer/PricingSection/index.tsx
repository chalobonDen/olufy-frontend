import { useState } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@olufy-frontend/shared/UI'

import UserContainer from '@/components/UI/User/Container'
import UserTitle from '@/components/UI/User/Title'
import { VpsServerService } from '@/services'

import UserVpsServerPricingCard from './Card'

import type { IVpsServerQueryParams } from '@/types/modules/vps-server'

const UserVpsServerPricingSection = () => {
  const { i18n } = useLingui()

  // _State
  const [queryParams, setQueryParams] = useState<IVpsServerQueryParams>({
    page: 1,
    perPage: 10,
    search: '',
  })

  // _Query
  const { data } = useQuery(['get-vps-server-list', queryParams], ({ signal }) =>
    VpsServerService.list(queryParams, { signal }),
  )

  return (
    <section className={clsx(`pb-10 pt-12`)}>
      <UserContainer className={clsx(`flex flex-col items-center`)}>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`VPS Server`)}</UserTitle>

        <div className={clsx(`mt-10 grid w-full grid-cols-4 gap-6`, `2xl:gap-4`, `lg:grid-cols-2`, `sm:grid-cols-1`)}>
          {data?.items?.map((item, itemIdx) => (
            <UserVpsServerPricingCard key={`vps-server-${itemIdx}`} data={item} />
          ))}
        </div>

        <Pagination
          className={clsx(`mt-4`)}
          current={queryParams.page}
          total={data?.total}
          pageSize={queryParams.perPage}
          showLessItems
          onChange={(e) => {
            setQueryParams((state) => ({
              ...state,
              page: e,
            }))
          }}
        />
      </UserContainer>
    </section>
  )
}

export default UserVpsServerPricingSection
