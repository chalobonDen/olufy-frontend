import type { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

import UserContainer from '../Container'

interface IUserCoverProps extends PropsWithChildren {
  title?: string
  description?: string
}

const UserCover: FC<IUserCoverProps> = ({ title = 'Cover', description, children }) => {
  return (
    <section className={clsx(`user-cover`)}>
      {children}
      <UserContainer className={clsx(`relative z-10 flex flex-col items-center text-center`)}>
        <h1
          className={clsx(`text-[96px] font-semibold leading-none text-white-900`, `lg:text-[80px]`, `sm:text-[48px]`)}
        >
          {title}
        </h1>
        {description && <p className={clsx(`mt-3 max-w-[448px] text-white-900`)}>{description}</p>}
      </UserContainer>
    </section>
  )
}

export default UserCover
