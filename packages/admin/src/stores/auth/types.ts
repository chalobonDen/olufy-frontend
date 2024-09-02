export interface IAuthState {
  accessToken: string
  refreshToken: string
  isAuth?: () => boolean
}

export interface IAuthActions {
  login: (tokens: IAuthState) => void
  logout: () => void
}
