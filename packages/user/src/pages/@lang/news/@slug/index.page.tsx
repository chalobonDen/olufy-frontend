import clsx from 'clsx'
import { SvgIcon } from '@olufy-frontend/shared/UI'
import { useIsMounted } from '@olufy-frontend/shared/hooks'

import UserContainer from '@/components/UI/User/Container'
import { formatDate } from '@/utils'
import UserShareButton from '@/components/User/Buttons/ShareButton'

import type { INews } from '@/types/modules/news'

import '@olufy-frontend/shared/styles/content.scss'
interface IPageProps {
  data: INews
}

export const Page = ({ data }: IPageProps) => {
  const { isMounted } = useIsMounted()

  return (
    <section className={clsx(`pb-16 pt-12`)}>
      <UserContainer>
        <h2
          className={clsx(
            `text-header-2 font-semibold`,
            `md:text-[28px] md:font-semibold`,
            `md:font-semibold sm:text-header-3`,
          )}
        >
          {data.title}
        </h2>
        <h4 className={clsx(`mt-4 text-header-3`, `md:text-header-4`, `sm:text-header-5`)}>{data.description}</h4>

        <div className={clsx(`mt-4 flex items-center space-x-2`)}>
          <SvgIcon name="calendar" className={clsx(`square-6`)} />
          <span>{isMounted && formatDate(new Date(data.createdAt), 'd MMM y')}</span>
        </div>

        <div className={clsx(`mx-auto aspect-[21/9] max-w-full`, `3xl:w-full`, `sm:aspect-video`)}>
          <img
            src={data.titleImageUrl}
            alt={`${data.title} picture`}
            className={clsx(`mt-6 h-full w-full object-cover`)}
          />
        </div>

        <div
          className={clsx(`ProseMirror mt-6 text-body-20`, `lg:text-lg`, `sm:text-body-16`)}
          dangerouslySetInnerHTML={{ __html: data.detail }}
        ></div>

        <UserShareButton className={clsx(`mt-6`)} />
      </UserContainer>
    </section>
  )
}
