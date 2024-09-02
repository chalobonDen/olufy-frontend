import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import clsx from 'clsx'

import { DEFAULT_OPTIONS } from './configs'
import type { IDropFileProps } from './types'
import { useDropFile } from './hooks'

import './styles.scss'

interface IImageDropFileInputProps extends IDropFileProps {
  dragActiveMessage?: ReactNode
  placeholderMessage?: ReactNode
  isOverlay?: boolean
  containerClassName?: string
}

const ImageDropFileInput: FC<IImageDropFileInputProps> = ({
  className,
  containerClassName,
  invalid,
  options = DEFAULT_OPTIONS,
  onDrop,
  onDropRejected,
  dragActiveMessage,
  placeholderMessage,
  isOverlay,
}) => {
  const { getRootProps, getInputProps, files, isDragActive } = useDropFile({ options, onDrop, onDropRejected })

  return (
    <div className={clsx(className, `input-dropfile`)} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={clsx(['input-dropfile-container', containerClassName])}>
        {isDragActive ? (
          <Fragment>
            {dragActiveMessage ? (
              dragActiveMessage
            ) : (
              <span
                className={clsx(`input-dropfile-text`, {
                  'is-invalid': invalid,
                })}
              >
                Drop the files here ...
              </span>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {placeholderMessage ? (
              placeholderMessage
            ) : (
              <span
                className={clsx(`input-dropfile-text`, {
                  'is-invalid': invalid,
                })}
              >
                Drop image here or click to upload
              </span>
            )}
          </Fragment>
        )}
      </div>

      {options.maxFiles === 1 &&
        files.map((file) => (
          <div key={file.name} className={clsx(`input-dropfile-preview`)}>
            <img
              src={file.preview}
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
            />
          </div>
        ))}

      {isOverlay && <div className={clsx(`input-dropfile-overlay`)}></div>}
    </div>
  )
}

export default ImageDropFileInput
