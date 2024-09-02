import type { DropzoneOptions } from 'react-dropzone'

export type DropFile = File & {
  preview?: string
}

export interface IDropFileProps {
  className?: string
  options?: DropzoneOptions
  onDrop?: (val: DropFile[]) => void
  onDropRejected?: VoidFunction
  invalid?: boolean
  onCancel?: VoidFunction
  onDelete?: VoidFunction
}
