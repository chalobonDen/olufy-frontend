import type { SVGAttributes } from 'react'
import { FC, forwardRef } from 'react'

interface ISvgIconProps extends SVGAttributes<SVGSVGElement> {
  name: string
  prefix?: string
  color?: string
}

// Make svg sprites by `vite-plugin-svg-icons`
// https://github.com/vbenjs/vite-plugin-svg-icons
const SvgIcon = forwardRef<SVGSVGElement, ISvgIconProps>(({ name, prefix = 'icon', color, ...props }, ref) => {
  const symbolId = `#${prefix}-${name}`

  return (
    <svg ref={ref} {...props} aria-hidden="true">
      <use href={symbolId} fill={color} />
    </svg>
  )
})

SvgIcon.displayName = 'SvgIcon'

export default SvgIcon
