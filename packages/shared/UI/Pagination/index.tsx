import type { FC } from 'react'

import type { PaginationProps } from 'rc-pagination'
import RCPagination from 'rc-pagination'

import './styles.scss'

const Pagination: FC<PaginationProps> = ({ ...props }) => {
  return <RCPagination {...props} />
}

export default Pagination
