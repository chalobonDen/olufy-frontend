import { navigate } from 'vite-plugin-ssr/client/router'

import { useSetting } from './stores/useSetting'

/**
 * useRouter
 * - push() / replace()
 * - @param path = string // pattern: `/contact` not `contact`
 */
const useRouter = () => {
  const { lang } = useSetting()

  // _Events
  const push = (path: string) => {
    navigate(`/${lang}${path}`)
  }

  const replace = (path: string) => {
    navigate(`/${lang}${path}`, { overwriteLastHistoryEntry: true })
  }

  return {
    push,
    replace,
  }
}

export default useRouter
