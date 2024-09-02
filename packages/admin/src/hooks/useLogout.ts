import { useMutation } from '@tanstack/react-query'

import { AuthService } from '@/services'
import { useUserStore } from '@/stores/user'

export const useLogout = () => {
  const { clear } = useUserStore()

  return useMutation(() => AuthService.logout(), {
    onSuccess: () => {
      clear()
    },
  })
}
