import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import clsx from 'clsx'
import Link from '@tiptap/extension-link'

import MenuBar from './MenuBar'
import MediaResize from './MediaResize'

import './styles.scss'

interface IRichTextEditorProps {
  error?: ReactNode
  className?: string
  onBlur?: (val: string) => void
  onChange?: (val: string) => void
  value?: string
}

const RichTextEditor: FC<IRichTextEditorProps> = ({ error, className, value, onChange, onBlur }) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            className: 'mahiro-theme',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      MediaResize,
      Link,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (!editor.getText()) return onChange?.('')
      onChange?.(editor.getHTML())
    },
    onBlur: ({ editor }) => {
      onBlur?.(editor.getHTML())
    },
  })

  return (
    <Fragment>
      <div
        className={clsx(
          `text-editor`,
          {
            'is-invalid': typeof error === 'string' || !!error,
          },
          className,
        )}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className={clsx(`text-editor-content`)} />
      </div>
      {!!error && <span className={clsx(`input-invalid-message`)}>{error}</span>}
    </Fragment>
  )
}

export default RichTextEditor
