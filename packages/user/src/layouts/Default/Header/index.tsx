import type { FC } from 'react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { Logo } from '@olufy-frontend/shared/UI'
import { IoMenu } from 'react-icons/io5'

import UserContainer from '@/components/UI/User/Container'
import { useAuthentication } from '@/hooks/stores/useAuthentication'
import Link from '@/components/Link'
import Button from '@/components/Button'
import { usePageContext } from '@/hooks/usePageContext'
import useRouter from '@/hooks/useRouter'

import ThemeToggleButton from './Buttons/ThemeToggle'
import Navbar from './Navbar'
import ChangeLangButton from './Buttons/ChangeLang'
import NavbarMobile from './Navbar/Mobile'
import UserProfileButton from './Buttons/UserProfile'

interface ILayoutProps {}

const SCROLLED = 5

const Header: FC<ILayoutProps> = () => {
  const { i18n } = useLingui()
  const { isAuth } = useAuthentication()
  const { urlPathname } = usePageContext()
  const { push } = useRouter()

  const isHomePage = urlPathname.split('/')[2] === '' || typeof urlPathname.split('/')[2] === 'undefined'

  let lastScrollTop = 0
  let up = 0
  let down = 0

  // _State
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>('up')
  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false)

  // _Event
  const onScroll = useCallback(() => {
    const root = document.documentElement
    const st = window.pageYOffset || root.scrollTop
    if (st > SCROLLED) setHasScrolled(true)
    else setHasScrolled(false)

    if (st > lastScrollTop) {
      if (down === 1) {
        // console.log('on scroll down')
        setScrollDirection('down')
        root.setAttribute('data-scroll', 'down')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      down += 1
      // eslint-disable-next-line react-hooks/exhaustive-deps
      up = 0
    } else if (st < lastScrollTop) {
      if (up === 1) {
        // console.log('on scroll up')
        setScrollDirection('up')
        root.setAttribute('data-scroll', 'up')
      }
      up += 1
      down = 0
    } else if (st > SCROLLED) {
      // console.log('check on init')
      setScrollDirection('down')
      root.setAttribute('data-scroll', 'down')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
  }, [])

  // _Effect
  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, false)
    return () => window.removeEventListener('scroll', onScroll, false)
  }, [onScroll])

  return (
    <Fragment>
      <header
        className={clsx([
          `main-space-x sticky top-0 z-20 pt-2`,
          `transition-all duration-200 will-change-transform`,
          {
            'bg-white-900 shadow-01 dark:bg-dark-400': hasScrolled || !isHomePage,
            // TODO: มีปัญหากับหน้าที่ความสูงไม่มากเลยปิดไปก่อนครับ
            // 'translate-y-[-50px]': scrollDirection === 'down',
          },
        ])}
      >
        <UserContainer className={clsx(`flex items-center justify-end space-x-2`)}>
          <Fragment>
            {isAuth ? (
              <UserProfileButton />
            ) : (
              <Fragment>
                <Button size="small" className={clsx(`!px-2 text-primary-500`)} onClick={() => push(`/login`)}>
                  {i18n._(t`เข้าสู่ระบบ`)}
                </Button>
                <Button variant="primary" size="small" className={clsx(`!px-2`)} onClick={() => push(`/register`)}>
                  {i18n._(t`สมัครสมาชิก`)}
                </Button>
              </Fragment>
            )}
          </Fragment>
          <ChangeLangButton />
          <ThemeToggleButton className={clsx(`hidden`, `lg:flex`)} />
        </UserContainer>

        <UserContainer
          className={clsx([
            `mt-3 min-h-[80px] rounded-lg`,
            `flex items-center px-4`,
            {
              'shadow-01 dark:bg-dark-400 dark:shadow-02': !hasScrolled && isHomePage,
            },
            `lg:min-h-[64px] lg:px-3`,
          ])}
        >
          <Link href="/">
            <Logo imageClassName={clsx(`lg:square-[40px]`)} textClassName={clsx(`lg:w-[55px] lg:h-[30px]`)} />
          </Link>
          <Navbar className={clsx(`ml-8`)} />

          <ThemeToggleButton className={clsx(`ml-auto lg:hidden`)} />

          <IoMenu
            className={clsx(`ml-auto hidden cursor-pointer text-primary-500 square-12`, `lg:block`)}
            onClick={() => setShowNavbarMobile(true)}
          />
        </UserContainer>
      </header>

      <NavbarMobile visible={showNavbarMobile} closeDrawer={() => setShowNavbarMobile(false)} />
    </Fragment>
  )
}

export default Header
