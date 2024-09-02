import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'

export interface IModalScreenProps extends PropsWithChildren {
  screen?: string | number
}

const Screen: FC<IModalScreenProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

Screen.displayName = 'Screen'

export default Screen
