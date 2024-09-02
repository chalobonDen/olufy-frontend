import type { FC } from 'react'

import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import clsx from 'clsx'

import UserContainer from '@/components/UI/User/Container'
import Link from '@/components/Link'

import type { IBanner } from '@/types/modules/home'

interface IUserHomeWhyPlatformSectionSliderProps {
  className?: string
  banners: IBanner[]
}

const UserHomeWhyPlatformSectionSlider: FC<IUserHomeWhyPlatformSectionSliderProps> = ({ className, banners }) => {
  return (
    <UserContainer>
      <Swiper
        className={clsx(className, `rounded-lg`)}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '#why-platform-slider-pagination',
          type: 'bullets',
        }}
        spaceBetween={0}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {banners.map((banner, bannerIdx) => (
          <SwiperSlide key={bannerIdx}>
            <Link href={banner.url} target="_blank">
              <img
                src={banner.imageDesktop}
                alt={banner.title}
                className={clsx(`aspect-[1110/300] w-full object-cover`, `sm:hidden`)}
              />
              <img
                src={banner.imageMobile}
                alt={banner.title}
                className={clsx(`hidden aspect-[420/180] w-full object-cover`, `sm:block`)}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div id="why-platform-slider-pagination" className={clsx(`mt-3 flex justify-center`)}></div>
    </UserContainer>
  )
}

export default UserHomeWhyPlatformSectionSlider
