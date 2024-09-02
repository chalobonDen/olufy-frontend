import { useState } from 'react'

import { identity, omit, pick, pickBy } from 'lodash-es'

import { useUpdateSearchParams } from './useUpdateSearchParams'
import type { IPaginationQuery } from '../types/pagination'

const isNumber = (val: any) => !isNaN(Number(val))

export const usePagination = <T extends IPaginationQuery>(
  searchParams: T,
  optionalKeys?: string[],
  defaultInitValue?: {
    page: number
    perPage: number
  },
) => {
  const initialValue = {
    page: isNumber(searchParams?.page) ? Number(searchParams.page) : defaultInitValue?.page ?? 1,
    perPage: isNumber(searchParams?.perPage) ? Number(searchParams.perPage) : defaultInitValue?.perPage ?? 10,
    search: searchParams?.search || '',
    sort: searchParams?.sort,
    order: searchParams?.order,
    ...pick(omit(searchParams, ['page', 'perPage', 'search', 'sort', 'order']), optionalKeys ?? []),
  } as T

  // _State
  const [queryParams, setQueryParams] = useState(initialValue)
  const [search, setSearch] = useState<string>(searchParams?.search ? searchParams.search : '')

  // _Update_Search_Params
  useUpdateSearchParams(pickBy(queryParams as object, identity))

  // _Events
  const onSearch = () => {
    setQueryParams((state) =>
      !!search
        ? {
            ...state,
            search,
            page: 1,
          }
        : (omit(state, 'search') as T),
    )
  }

  const onPageChange = (page: number) => {
    setQueryParams((state) => ({
      ...state,
      page,
    }))
  }

  return {
    queryParams: pickBy(queryParams as object, identity) as T,
    search,
    onSearch,
    setSearch,
    onPageChange,
    setQueryParams,
  }
}
