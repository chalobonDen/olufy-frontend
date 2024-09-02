import { useContext } from 'react'

import { Context } from '@/renderer/PageContext'

export const usePageContext = () => {
  const pageContext = useContext(Context)
  return pageContext
}
