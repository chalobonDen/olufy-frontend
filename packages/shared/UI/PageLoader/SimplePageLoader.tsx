import { forwardRef } from 'react'

import clsx from 'clsx'

import Loader from '../Loader'

import './styles.scss'

const SimplePageLoader = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className={clsx(`simple-page-loader`)}>
      <Loader size={80} />
    </div>
  )
})

SimplePageLoader.displayName = 'SimplePageLoader'

export default SimplePageLoader
