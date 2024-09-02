import type { FC } from 'react'

import type { ISelectProps } from '@olufy-frontend/shared/UI/Input/Select'
import { useLingui } from '@lingui/react'
import { Input } from '@olufy-frontend/shared/UI'
import { useQuery } from '@tanstack/react-query'
import { t } from '@lingui/macro'

import { useUserStore } from '@/stores/user'
import { ProductService } from '@/services'

interface IProductsSelectProps extends ISelectProps {
  disabledPlaceholder?: boolean
}

const ProductsSelect: FC<IProductsSelectProps> = ({ disabledPlaceholder = true, placeholder, ...props }) => {
  const { i18n } = useLingui()
  const { profile } = useUserStore()

  // _Query
  const { data } = useQuery(['products-list'], () => ProductService.all(), {
    enabled: !!profile,
  })

  return (
    <Input.Select {...props}>
      <option value="" disabled={disabledPlaceholder}>
        {placeholder ?? i18n._(t`เลือก`)}
      </option>
      {data?.products.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Input.Select>
  )
}

export default ProductsSelect
