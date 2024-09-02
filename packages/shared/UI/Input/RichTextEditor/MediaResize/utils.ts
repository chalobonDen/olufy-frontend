import type { IconType } from 'react-icons'
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from 'react-icons/fa'
import { AiOutlinePicLeft, AiOutlinePicRight } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'

interface ResizableMediaAction {
  tooltip: string
  icon: IconType
  action?: (updateAttributes: (o: Record<string, any>) => any) => void
  isActive?: (attrs: Record<string, any>) => boolean
  delete?: (d: () => void) => void
}

export const resizableMediaActions: ResizableMediaAction[] = [
  {
    tooltip: 'Align left',
    action: (updateAttributes) =>
      updateAttributes({
        'data-align': 'left',
        'data-float': null,
      }),
    icon: FaAlignLeft,
    isActive: (attrs) => attrs['data-align'] === 'left',
  },
  {
    tooltip: 'Align center',
    action: (updateAttributes) =>
      updateAttributes({
        'data-align': 'center',
        'data-float': null,
      }),
    icon: FaAlignCenter,
    isActive: (attrs) => attrs['data-align'] === 'center',
  },
  {
    tooltip: 'Align right',
    action: (updateAttributes) =>
      updateAttributes({
        'data-align': 'right',
        'data-float': null,
      }),
    icon: FaAlignRight,
    isActive: (attrs) => attrs['data-align'] === 'right',
  },
  {
    tooltip: 'Float left',
    action: (updateAttributes) =>
      updateAttributes({
        'data-align': null,
        'data-float': 'left',
      }),
    icon: AiOutlinePicLeft,
    isActive: (attrs) => attrs['data-float'] === 'left',
  },
  {
    tooltip: 'Float right',
    action: (updateAttributes) =>
      updateAttributes({
        'data-align': null,
        'data-float': 'right',
      }),
    icon: AiOutlinePicRight,
    isActive: (attrs) => attrs['data-float'] === 'right',
  },
  {
    tooltip: 'Delete',
    icon: RiDeleteBin6Line,
    delete: (deleteNode) => deleteNode(),
  },
]
