import { mergeAttributes, nodeInputRule } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Image from '@tiptap/extension-image'

import ResizableMediaNodeView from './ResizableMediaNodeView'

export interface MediaOptions {
  // inline: boolean, // we have floating support, so block is good enough
  // allowBase64: boolean, // we're not going to allow this
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    resizableMedia: {
      setMedia: (options: {
        'media-type': 'img' | 'video'
        src: string
        alt?: string
        title?: string
        width?: string
        height?: string
      }) => ReturnType
    }
  }
}

export const IMAGE_INPUT_REGEX = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export const ResizableMedia = Image.extend<MediaOptions>({
  name: 'resizableMedia',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    }
  },

  inline: false,

  group: 'block',

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      'media-type': {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: '100%',
      },
      height: {
        default: 'auto',
      },
      'data-align': {
        default: 'left', // 'left' | 'center' | 'right'
      },
      'data-float': {
        default: null, // 'left' | 'right'
      },
    }
  },

  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'img[src]:not([src^="data:"])',
        getAttrs: (el) => ({
          src: (el as HTMLImageElement).getAttribute('src'),
          'media-type': 'img',
        }),
      },
      {
        tag: 'video',
        getAttrs: (el) => ({
          src: (el as HTMLVideoElement).getAttribute('src'),
          'media-type': 'video',
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { 'media-type': mediaType } = HTMLAttributes

    if (mediaType === 'img') {
      return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    } else if (mediaType === 'video') {
      return ['video', { controls: 'true', style: 'width: 100%', ...HTMLAttributes }, ['source', HTMLAttributes]]
    }

    if (!mediaType)
      console.error('TiptapMediaExtension-renderHTML method: Media Type not set, going default with image')

    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setMedia:
        (options) =>
        ({ commands }) => {
          const { 'media-type': mediaType } = options

          if (mediaType === 'img') {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            })
          } else if (mediaType === 'video') {
            return commands.insertContent({
              type: this.name,
              attrs: {
                ...options,
                controls: 'true',
              },
            })
          }

          if (!mediaType) console.error('TiptapMediaExtension-setMedia: Media Type not set, going default with image')

          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableMediaNodeView)
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match

          return {
            src,
            alt,
            title,
            'media-type': 'img',
          }
        },
      }),
      nodeInputRule({
        find: VIDEO_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [, , src] = match

          return {
            src,
            'media-type': 'video',
          }
        },
      }),
    ]
  },
})
