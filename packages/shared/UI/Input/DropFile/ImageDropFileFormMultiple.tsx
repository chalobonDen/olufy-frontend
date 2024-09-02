import type { FC, ReactNode } from 'react'
import { useState, Fragment, useEffect } from 'react'

import clsx from 'clsx'
import { IoAdd, IoEyeOutline, IoTrashBinOutline } from 'react-icons/io5'
import type { DropzoneOptions } from 'react-dropzone'

import { DEFAULT_OPTIONS, MULTIPLE_OPTIONS } from './configs'
import { useDropFile } from './hooks'
import type { DropFile, IDropFileProps } from './types'
import Modal from '../../Modal'

interface IImageDropFileFormMultipleInputProps extends IDropFileProps {
  objectFit?: 'cover' | 'contain'
  error?: ReactNode
  name?: string
  value?: string
  preview?: string
  onCancel?: VoidFunction
  onDelete?: VoidFunction
  getRemoveFileEvent?: (e: VoidFunction) => void
}

const ImagePreview = ({ file, onRemove }: { file: DropFile; onRemove: VoidFunction }) => {
  // _State
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)

  return (
    <Fragment>
      <img src={file.preview} alt="" />

      <div className={clsx(`input-dropfile-multiple-item-actions`)}>
        <button type="button" onClick={() => setPreviewVisible(true)}>
          <IoEyeOutline />
        </button>
        <button type="button" onClick={onRemove}>
          <IoTrashBinOutline />
        </button>
      </div>

      <Modal
        visible={previewVisible}
        closeModal={() => setPreviewVisible(false)}
        isDesktopFullScreen
        className="preview-modal"
      >
        <div className={clsx(`input-dropfile-form-preview`)}>
          <img src={file.preview} />
        </div>
      </Modal>
    </Fragment>
  )
}

const ImageDropFileFormMultipleInput: FC<IImageDropFileFormMultipleInputProps> = ({
  className,
  invalid,
  objectFit = 'contain',
  options = MULTIPLE_OPTIONS,
  onDrop,
  onDropRejected,
  error,
  preview,
  onCancel,
  onDelete,
  getRemoveFileEvent,
  ...props
}) => {
  const { getRootProps, getInputProps, files, onRemoveFile } = useDropFile({
    options: {
      ...MULTIPLE_OPTIONS,
      ...options,
    },
    onDrop,
    onDropRejected,
    onCancel,
    onDelete,
  })

  // _Effect
  useEffect(() => {
    getRemoveFileEvent?.(onRemoveFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <div className={clsx(`input-dropfile-multiple-wrapper`, className)}>
        {files.map((file, fileIdx) => (
          <div key={fileIdx} className={clsx(`input-dropfile-multiple-item is-preview`)}>
            <ImagePreview file={file} onRemove={() => onRemoveFile(fileIdx)} />
          </div>
        ))}

        <div
          className={clsx(`input-dropfile-multiple-item`, {
            'is-invalid': typeof error === 'string' || !!error,
          })}
          {...getRootProps()}
        >
          <input {...getInputProps(props)} />

          <IoAdd />
          <span>Select Files</span>
        </div>
      </div>

      {!!error && <span className={clsx(`input-invalid-message`)}>{error}</span>}
    </Fragment>
  )
}

export default ImageDropFileFormMultipleInput
