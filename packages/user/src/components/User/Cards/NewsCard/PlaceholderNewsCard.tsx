import type { FC, HTMLAttributes } from 'react'

import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserCard from '@/components/UI/User/Card'

interface IPlaceholderNewsCardProps extends HTMLAttributes<HTMLDivElement> {}

const PlaceholderNewsCard: FC<IPlaceholderNewsCardProps> = ({ className }) => {
  return (
    <UserCard className={clsx(`flex flex-col`, className)}>
      <div className={clsx(`placeholder aspect-[327/200] overflow-hidden rounded-lg`)}></div>
      <span className={clsx(`desc placeholder mt-4 self-start`, `lg:text-body-14`)}>November 15, 2023</span>
      <div
        className={clsx(
          `placeholder mt-[2px] text-header-3`,
          `transition-colors hover:text-primary-500`,
          `2xl:text-header-4`,
        )}
      >
        Impact
      </div>
      <p className={clsx(`desc placeholder mt-2 line-clamp-3`)}>
        Lorem ipsum dolor sit amet consectetur. Lectus id enim molestie vitae viverra.
      </p>

      <div className={clsx(`placeholder mt-2 flex items-center space-x-1 self-start text-primary-500`)}>
        <span>Read More</span>
        <SvgIcon name="arrow-right" className={clsx(`square-6`)} />
      </div>
    </UserCard>
  )
}

export default PlaceholderNewsCard
