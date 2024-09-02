import { useContext } from 'react'

import { BackofficeLayoutContext } from '@/layouts/Backoffice'

export const useBackofficeLayout = () => {
  return useContext(BackofficeLayoutContext)
}
