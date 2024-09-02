import { useContext } from 'react'

import { PageContext } from '@/renderer/PageContext'

const usePageContext = () => {
  return useContext(PageContext)
}

export default usePageContext
