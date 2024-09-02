import { useCallback, useState } from 'react'

import type { DropEvent, FileRejection } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'

import type { DropFile, IDropFileProps } from './types'

export const useDropFile = ({
  options,
  onDrop,
  onDropRejected,
  onCancel,
  onDelete,
}: Pick<IDropFileProps, 'onDrop' | 'onDropRejected' | 'options' | 'onCancel' | 'onDelete'>) => {
  const [files, setFiles] = useState<DropFile[]>([])

  // _Callback
  const onFileDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (options.maxFiles > 1) {
        if ([...acceptedFiles, ...files].length <= options.maxFiles)
          setFiles((state) => {
            return [
              ...state,
              ...acceptedFiles.map((file: File) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                }),
              ),
            ]
          })
        else toast.error('Too many files')
      } else {
        setFiles(
          acceptedFiles.map((file: File) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        )
      }

      onDrop?.(acceptedFiles)
    },
    [files, onDrop, options.maxFiles],
  )

  const onFileDropRejected = useCallback(
    (fileRejections: FileRejection[], event: DropEvent) => {
      if (fileRejections.length > options.maxFiles) {
        fileRejections[0].errors.map((e) => toast.error(e.message))
      } else {
        fileRejections[0].errors.map((e) => toast.error(e.message))
      }

      onDropRejected?.()
    },
    [onDropRejected, options.maxFiles],
  )

  const onFileDialogCancel = useCallback(() => {
    if (onCancel) {
      setFiles([])
      onCancel()
    }
  }, [onCancel])

  const onRemoveFile = useCallback(
    (idx?: number) => {
      if (typeof idx !== 'number') {
        setFiles([])
        onDelete?.()
      } else {
        const newFiles = files.filter((_file, i) => i !== idx)
        setFiles(newFiles)
        onDrop?.(newFiles)
      }
    },
    [files, onDelete, onDrop],
  )

  // _Dropzone Hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileDrop,
    onDropRejected: onFileDropRejected,
    ...(options ? options : {}),
    onFileDialogCancel,
  })

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    onRemoveFile,
  }
}
