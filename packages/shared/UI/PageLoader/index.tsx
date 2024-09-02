import { forwardRef } from 'react'

import clsx from 'clsx'
import { range } from 'lodash-es'

import './styles.scss'

const PageLoader = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className={clsx(`page-loader`)}>
      <div className={clsx(`box-loader`)}>
        {range(8).map((n) => (
          <div key={`box-item-${n}`} className={clsx(`box`, [`box${n}`])}>
            <div></div>
          </div>
        ))}
        <div className={clsx(`box-ground`)}>
          <div></div>
        </div>
      </div>
    </div>
  )
})

PageLoader.displayName = 'PageLoader'

export default PageLoader
