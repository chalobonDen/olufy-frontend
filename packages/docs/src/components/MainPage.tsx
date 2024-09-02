import type { FC, PropsWithChildren } from 'react'
import { useState } from 'react'

import clsx from 'clsx'
import { IoChevronForward } from 'react-icons/io5'
import { useIsMounted } from '@olufy-frontend/shared/hooks'

import usePageContext from '@/hooks/usePageContext'

const MainPage: FC<PropsWithChildren> = ({ children }) => {
  const { documentProps, exports, headings, urlParsed } = usePageContext()
  const newDocumentProps = exports?.documentProps ?? documentProps
  const { isMounted } = useIsMounted()
  const { hashOriginal } = urlParsed

  // _State
  const [hash, setHash] = useState(hashOriginal)

  // _Events
  const onChangeHash = (h: string) => setHash(h)

  return (
    <main className={clsx(`relative py-6`, `grid grid-cols-[1fr_200px] gap-10`, `lg:grid-cols-1 lg:gap-0`)}>
      <div className={clsx(`mx-auto w-full min-w-0`)}>
        <div className={clsx(`flex items-center space-x-1 text-sm`)}>
          <div className={clsx(`desc overflow-hidden text-ellipsis whitespace-nowrap`)}>Docs</div>
          <IoChevronForward className={clsx(`square-4`)} />
          <div className={clsx(`font-medium`)}>{newDocumentProps?.title}</div>
        </div>
        <div className={clsx(`mt-4 space-y-2`)}>
          <h1 className={clsx('scroll-m-20 text-header-2 !leading-none')}>{newDocumentProps?.title}</h1>
          {newDocumentProps?.description && (
            <p className={clsx(`desc text-body-18`)}>{newDocumentProps?.description}</p>
          )}
        </div>

        <div className={clsx(`mdx pb-12 pt-8`)}>{children}</div>
      </div>

      {isMounted && headings?.length > 0 && (
        <div className={clsx(`sticky top-14 -mt-8 self-start py-8 pl-8 pr-6`, `lg:hidden`)}>
          <p>On this page</p>
          <ul>
            {headings.map((heading, headingIdx) => (
              <li key={headingIdx} className={clsx(`pt-2`)}>
                <a
                  href={heading.link}
                  className={clsx(`inline-block text-body-14 no-underline transition-opacity`, {
                    'text-dark-500 dark:text-white-900': heading.link === hash,
                    'desc font-light': heading.link !== hash,
                  })}
                  dangerouslySetInnerHTML={{ __html: heading.text }}
                  onClick={() => onChangeHash(heading.link)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

export default MainPage
