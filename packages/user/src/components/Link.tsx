import type { AnchorHTMLAttributes } from 'react'
import { useMemo, forwardRef } from 'react'

import { useSetting } from '@/hooks/stores/useSetting'

interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isExternal?: boolean
}

const Link = forwardRef<HTMLAnchorElement, ILinkProps>(
  ({ href, isExternal = false, children, onClick, ...props }, ref) => {
    const { lang } = useSetting()

    // _Memo
    const newHref = useMemo(() => (isExternal ? href : `/${lang}${href}`), [href, isExternal, lang])

    // _Events
    const handleClick = (e) => {
      if (document) {
        document.querySelector('main').scrollTo(0, 0)
      }

      onClick?.(e)
    }

    return (
      <a ref={ref} href={newHref} onClick={(e) => handleClick(e)} {...props}>
        {children}
      </a>
    )
  },
)

Link.displayName = 'Link'

export default Link
