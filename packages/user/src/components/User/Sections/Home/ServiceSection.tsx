import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import clsx from 'clsx'

import UserContainer from '@/components/UI/User/Container'
import UserCard from '@/components/UI/User/Card'
import UserTitle from '@/components/UI/User/Title'
import { GET_ORDER_LIST } from '@/constants/product-order'

const UserHomeServiceSection = () => {
  const { i18n } = useLingui()

  return (
    <section className={clsx(`py-12`)}>
      <UserContainer>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`บริการของเรา`)}</UserTitle>

        <div
          className={clsx(
            `mt-10 grid grid-cols-4 gap-6`,
            `2xl:gap-4`,
            `lg:grid-cols-3`,
            `md:grid-cols-2`,
            `sm:grid-cols-1`,
          )}
        >
          {GET_ORDER_LIST().map((item, itemIdx) => (
            <UserCard key={itemIdx}>
              <div className={clsx(`space-y-2`)}>
                <img src={item.imageUrl} alt={item.title} className={clsx(`pointer-events-none square-20`)} />
                <h4 className={clsx(`text-header-3`)}>{item.title}</h4>
                <p className={clsx(`desc`)}>{item.description}</p>
              </div>
              {/* <Link
                href={item.readmore.path}
                title={item.readmore.label}
                className={clsx(`mt-4 flex items-center space-x-1 text-primary-500`)}
              >
                <span>{item.readmore.label}</span>
                <SvgIcon name="arrow-right" className={clsx(`square-6`)} />
              </Link> */}
            </UserCard>
          ))}
        </div>
      </UserContainer>
    </section>
  )
}

export default UserHomeServiceSection
