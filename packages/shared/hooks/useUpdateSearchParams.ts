import { useCallback, useEffect, useMemo } from 'react'

import queryString from 'query-string'

export const useUpdateSearchParams = (searchParams: object) => {
  // _Memo
  const searchParamsStr = useMemo(() => {
    return queryString.stringify(searchParams)
  }, [searchParams])

  // _Callbacks
  const setHistorySearchParams = useCallback((values: string) => {
    if (history.pushState) {
      const searchParamsObj = queryString.parse(values)
      const newSearchParamsStr = queryString.stringify(searchParamsObj)

      if (!newSearchParamsStr) return

      const newurl =
        window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + newSearchParamsStr
      window.history.pushState({ path: newurl }, '', newurl)
    }
  }, [])

  // _Effect
  useEffect(() => {
    if (searchParamsStr) setHistorySearchParams(searchParamsStr)
  }, [searchParamsStr, setHistorySearchParams])

  return {
    setHistorySearchParams,
  }
}
