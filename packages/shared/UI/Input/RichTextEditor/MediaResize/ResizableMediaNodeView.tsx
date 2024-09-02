import type { MutableRefObject, MouseEvent } from 'react'
import { useState, useEffect, useMemo, useRef } from 'react'

import type { Node as ProseMirrorNode } from 'prosemirror-model'
import type { Editor, Node } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import type { Decoration } from 'prosemirror-view'
import clsx from 'clsx'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'

import { resizableMediaActions } from './utils'

import './styles.scss'

interface Props {
  editor: Editor
  node: ProseMirrorNode
  decorations: Decoration
  selected: boolean
  extension: Node<any, any>
  getPos: () => number
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
}

interface WidthAndHeight {
  width: number
  height: number
}

export default ({ node, updateAttributes, deleteNode }: Props) => {
  const resizableImg = useRef<HTMLImageElement | HTMLVideoElement | null>(null)
  const aspectRatio = useRef(0)
  const proseMirrorContainerWidth = useRef(0)
  const mediaActionActiveState = useRef<Record<string, boolean>>({})
  const isHorizontalResizeActive = useRef(false)
  const lastCursorX = useRef(-1)
  const isVerticalResizeActive = useRef(false)
  const lastCursorY = useRef(-1)

  // _Floating
  const [isOpen, setIsOpen] = useState(false)

  const { refs, x, y, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  // _Memo
  const mediaType = useMemo<'img' | 'video'>(() => node.attrs['media-type'], [node.attrs])
  const isFloat = useMemo<boolean>(() => !!node.attrs['data-float'], [node.attrs])
  const isAlign = useMemo<boolean>(() => !!node.attrs['data-align'], [node.attrs])

  // _Events
  const setMediaActionActiveStates = () => {
    const activeStates: Record<string, boolean> = {}

    for (const { tooltip, isActive } of resizableMediaActions) activeStates[tooltip] = !!isActive?.(node.attrs)

    mediaActionActiveState.current = activeStates
  }

  const mediaSetupOnLoad = () => {
    // ! TODO: move this to extension storage
    const proseMirrorContainerDiv = document.querySelector('.ProseMirror')

    if (proseMirrorContainerDiv) proseMirrorContainerWidth.current = proseMirrorContainerDiv?.clientWidth

    // When the media has loaded
    if (!resizableImg.current) return

    if (mediaType === 'video') {
      // Aspect Ratio from its original size
      setTimeout(() => {
        aspectRatio.current =
          (resizableImg.current as HTMLVideoElement).videoWidth / (resizableImg.current as HTMLVideoElement).videoHeight

        // for the first time when video is added with custom width and height
        // and we have to adjust the video height according to it's width
        onHorizontalResize('left', 0)
      }, 200)
    } else {
      resizableImg.current.onload = () => {
        // Aspect Ratio from its original size
        aspectRatio.current =
          (resizableImg.current as HTMLImageElement).naturalWidth /
          (resizableImg.current as HTMLImageElement).naturalHeight
        onHorizontalResize('left', 0)
      }
    }

    setTimeout(() => setMediaActionActiveStates(), 200)
  }

  // const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) => width < 100 || height < 100
  const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) => width < 1 || height < 1

  const startHorizontalResize = (e: MouseEvent) => {
    isHorizontalResizeActive.current = true
    lastCursorX.current = e.clientX

    document.addEventListener('mousemove', onHorizontalMouseMove)
    document.addEventListener('mouseup', stopHorizontalResize)
  }

  const stopHorizontalResize = () => {
    isHorizontalResizeActive.current = false
    lastCursorX.current = -1

    document.removeEventListener('mousemove', onHorizontalMouseMove)
    document.removeEventListener('mouseup', stopHorizontalResize)
  }

  const onHorizontalResize = (directionOfMouseMove: 'right' | 'left', diff: number) => {
    if (!resizableImg.current) {
      console.error('Media ref is undefined|null', { resizableImg: resizableImg.current })
      return
    }

    const currentMediaDimensions = {
      width: resizableImg.current?.width,
      height: resizableImg.current?.height,
    }

    const newMediaDimensions = {
      width: -1,
      height: currentMediaDimensions.height,
    }

    if (directionOfMouseMove === 'left') {
      newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff)
    } else {
      newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff)
    }

    // if (newMediaDimensions.width > proseMirrorContainerWidth.current)
    //   newMediaDimensions.width = proseMirrorContainerWidth.current

    newMediaDimensions.height = newMediaDimensions.width / aspectRatio.current

    if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return

    updateAttributes(newMediaDimensions)
  }

  const onHorizontalMouseMove = (e: globalThis.MouseEvent) => {
    if (!isHorizontalResizeActive.current) return

    const { clientX } = e

    const diff = lastCursorX.current - clientX

    lastCursorX.current = clientX

    if (diff === 0) return

    const directionOfMouseMove: 'left' | 'right' = diff > 0 ? 'left' : 'right'

    onHorizontalResize(directionOfMouseMove, Math.abs(diff))
  }

  const startVerticalResize = (e: MouseEvent) => {
    isVerticalResizeActive.current = true
    lastCursorY.current = e.clientY

    document.addEventListener('mousemove', onVerticalMouseMove)
    document.addEventListener('mouseup', stopVerticalResize)
  }

  const stopVerticalResize = () => {
    isVerticalResizeActive.current = false
    lastCursorY.current = -1

    document.removeEventListener('mousemove', onVerticalMouseMove)
    document.removeEventListener('mouseup', stopVerticalResize)
  }

  const onVerticalMouseMove = (e: globalThis.MouseEvent) => {
    if (!isVerticalResizeActive.current) return

    const { clientY } = e

    const diff = lastCursorY.current - clientY

    lastCursorY.current = clientY

    if (diff === 0) return

    const directionOfMouseMove: 'up' | 'down' = diff > 0 ? 'up' : 'down'

    if (!resizableImg.current) {
      console.error('Media ref is undefined|null', { resizableImg: resizableImg.current })
      return
    }

    const currentMediaDimensions = {
      width: resizableImg.current?.width,
      height: resizableImg.current?.height,
    }

    const newMediaDimensions = {
      width: -1,
      height: -1,
    }

    if (directionOfMouseMove === 'up') {
      newMediaDimensions.height = currentMediaDimensions.height - Math.abs(diff)
    } else {
      newMediaDimensions.height = currentMediaDimensions.height + Math.abs(diff)
    }

    newMediaDimensions.width = newMediaDimensions.height * aspectRatio.current

    if (newMediaDimensions.width > proseMirrorContainerWidth.current) {
      // newMediaDimensions.width = proseMirrorContainerWidth.current
      newMediaDimensions.height = newMediaDimensions.width / aspectRatio.current
    }

    if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return

    updateAttributes(newMediaDimensions)
  }

  // _Effect
  useEffect(() => {
    mediaSetupOnLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (node.attrs) setMediaActionActiveStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.attrs])

  return (
    <NodeViewWrapper
      className={clsx('media-node-view', [
        `${(isFloat && `f-${node.attrs['data-float']}`) || ''}`,
        `${(isAlign && `align-${node.attrs['data-align']}`) || ''}`,
      ])}
    >
      <div ref={refs.setReference} {...getReferenceProps()} className={clsx(`media-node-container`)}>
        {mediaType === 'img' && (
          <img
            ref={resizableImg as MutableRefObject<HTMLImageElement>}
            className={clsx([
              `${(isFloat && `float-${node.attrs['data-float']}`) || ''}`,
              `${(isAlign && `align-${node.attrs['data-align']}`) || ''}`,
            ])}
            draggable
            {...node.attrs}
          />
        )}

        {mediaType === 'video' && (
          <video
            ref={resizableImg as MutableRefObject<HTMLVideoElement>}
            className={clsx([
              `${(isFloat && `float-${node.attrs['data-float']}`) || ''}`,
              `${(isAlign && `align-${node.attrs['data-align']}`) || ''}`,
            ])}
            draggable
            controls
            {...node.attrs}
          >
            <source src={node.attrs.src} />
          </video>
        )}

        <div
          className={clsx('horizontal-resize-handle', { 'horizontal-resize-active': isHorizontalResizeActive })}
          title="Resize"
          onMouseDown={startHorizontalResize}
          onMouseUp={stopHorizontalResize}
        />

        <div
          className={clsx('vertical-resize-handle', { 'vertical-resize-active': isVerticalResizeActive })}
          title="Resize"
          onMouseDown={startVerticalResize}
          onMouseUp={stopVerticalResize}
        />

        {isOpen && (
          <section
            ref={refs.setFloating}
            className={clsx(`image-actions-container`)}
            style={{
              position: strategy,
              left: x,
              top: y,
              width: 'max-content',
            }}
            {...getFloatingProps()}
          >
            {resizableMediaActions.map((mediaAction, idx) => {
              const Icon = mediaAction.icon

              return (
                <button
                  key={idx}
                  className={clsx(`image-action-button`)}
                  type="button"
                  onClick={() => {
                    if (mediaAction.tooltip === 'Delete') mediaAction.delete?.(deleteNode)
                    else mediaAction.action?.(updateAttributes)
                  }}
                >
                  <Icon />
                </button>
              )
            })}
          </section>
        )}
      </div>
    </NodeViewWrapper>
  )
}
