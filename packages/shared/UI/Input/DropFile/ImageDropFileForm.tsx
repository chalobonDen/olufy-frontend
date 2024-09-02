import type { FC, ReactNode } from 'react'
import { useState, Fragment, useEffect, useMemo } from 'react'

import clsx from 'clsx'
import { IoClose, IoEye } from 'react-icons/io5'

import { DEFAULT_OPTIONS } from './configs'
import type { IDropFileProps } from './types'
import { useDropFile } from './hooks'
import UploadSvg from '../../../assets/icons/upload.svg'
import Modal from '../../Modal'

interface IImageDropFileFormInputProps extends IDropFileProps {
  objectFit?: 'cover' | 'contain'
  error?: ReactNode
  name?: string
  value?: string
  preview?: string
  onCancel?: VoidFunction
  onDelete?: VoidFunction
  getRemoveFileEvent?: (e: VoidFunction) => void
}

const ImageDropFileFormInput: FC<IImageDropFileFormInputProps> = ({
  className,
  invalid,
  objectFit = 'contain',
  options = DEFAULT_OPTIONS,
  onDrop,
  onDropRejected,
  error,
  preview,
  onCancel,
  onDelete,
  getRemoveFileEvent,
  ...props
}) => {
  const { getRootProps, getInputProps, files, isDragActive, onRemoveFile } = useDropFile({
    options,
    onDrop,
    onDropRejected,
    onCancel,
    onDelete,
  })

  // _State
  const [previewVisible, setPreviewVisible] = useState(false)

  // _Memo
  const file = useMemo(() => (files.length > 0 ? files[0] : preview ? { preview } : null), [files, preview])

  const hasOverlay = useMemo(() => {
    return files.length > 0 || preview
  }, [files.length, preview])

  const renderPreviewImage = useMemo(() => {
    if (options.maxFiles === 1) {
      if (!file) return null

      return (
        <div className={clsx(`input-dropfile-form-preview`)}>
          <img
            src={file.preview}
            className={clsx([objectFit])}
            onLoad={() => {
              // URL.revokeObjectURL(file.preview)
            }}
          />
        </div>
      )
    }

    return null
  }, [options.maxFiles, file, objectFit])

  // _Effect
  useEffect(() => {
    getRemoveFileEvent?.(onRemoveFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <div className={clsx(`input-dropfile-form-wrapper`, className)}>
        <div
          className={clsx(`input-dropfile-form`, {
            'is-invalid': typeof error === 'string' || !!error,
          })}
          {...getRootProps()}
        >
          <input {...getInputProps(props)} />

          {renderPreviewImage}

          {hasOverlay && <div className={clsx(`input-dropfile-overlay`)}></div>}

          {isDragActive ? (
            <div className={clsx(`input-dropfile-form-info`, { 'has-overlay': hasOverlay })}>
              <img src={UploadSvg} className={clsx(`input-dropfile-form-icon`)} />
              <span className={clsx(`input-dropfile-form-text`)}>Drop the files here ...</span>
            </div>
          ) : (
            <div className={clsx(`input-dropfile-form-info`, { 'has-overlay': hasOverlay })}>
              <img src={UploadSvg} className={clsx(`input-dropfile-form-icon`)} />
              <span className={clsx(`input-dropfile-form-text`)}>Drag and Drop here</span>
              <span className={clsx(`input-dropfile-form-text`)}>or</span>
              <span className={clsx(`input-dropfile-form-text`)}>Browse files</span>
            </div>
          )}
        </div>
        {!!error && <span className={clsx(`input-invalid-message`)}>{error}</span>}

        {(files.length > 0 || file?.preview) && (
          <div className={clsx(`input-dropfile-form-actions`)}>
            {file?.preview && (
              <div
                className="input-dropfile-form-action"
                onClick={() => {
                  setPreviewVisible(true)
                }}
              >
                <IoEye />
              </div>
            )}
            {files.length > 0 && (
              <div className="input-dropfile-form-action" onClick={() => onRemoveFile()}>
                <IoClose />
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        visible={previewVisible}
        closeModal={() => setPreviewVisible(false)}
        isDesktopFullScreen
        className="preview-modal"
      >
        {renderPreviewImage}
      </Modal>
    </Fragment>
  )
}

export default ImageDropFileFormInput
