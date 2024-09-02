import type { FC } from 'react'
import { useMemo } from 'react'

import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaParagraph,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaLink,
  FaUnlink,
  FaImage,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaRemoveFormat,
  FaUndo,
  FaRedo,
  FaCode,
} from 'react-icons/fa'

import Divider from '../../Divider'

interface IRichTextEditorMenuBarProps {
  editor?: Editor
}

const MenuBar: FC<IRichTextEditorMenuBarProps> = ({ editor }) => {
  // _Memo
  const menus = useMemo(() => {
    return [
      {
        icon: FaBold,
        title: 'Bold',
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor?.isActive('bold'),
        disabled: () => null,
      },
      {
        icon: FaItalic,
        title: 'Italic',
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor?.isActive('italic'),
        disabled: () => null,
      },
      {
        icon: FaStrikethrough,
        title: 'Strike',
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor?.isActive('strike'),
        disabled: () => null,
      },
      {
        type: 'divider',
      },
      {
        icon: FaCode,
        title: 'Code',
        action: () => editor.commands.toggleCodeBlock(),
        isActive: () => editor?.isActive('code'),
        disabled: () => null,
      },
      {
        type: 'divider',
      },
      {
        icon: 'H1',
        title: 'Heading 1',
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor?.isActive('heading', { level: 1 }),
        disabled: () => null,
      },
      {
        icon: 'H2',
        title: 'Heading 2',
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor?.isActive('heading', { level: 2 }),
        disabled: () => null,
      },
      {
        icon: 'H3',
        title: 'Heading 3',
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => editor?.isActive('heading', { level: 3 }),
        disabled: () => null,
      },
      {
        icon: FaParagraph,
        title: 'Paragraph',
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: () => editor?.isActive('paragraph'),
        disabled: () => null,
      },
      {
        type: 'divider',
      },
      {
        icon: FaAlignLeft,
        title: 'Align Left',
        action: () => editor.chain().focus().setTextAlign('left').run(),
        isActive: () => editor?.isActive({ textAlign: 'left' }),
        disabled: () => null,
      },
      {
        icon: FaAlignCenter,
        title: 'Align Center',
        action: () => editor.chain().focus().setTextAlign('center').run(),
        isActive: () => editor?.isActive({ textAlign: 'center' }),
        disabled: () => null,
      },
      {
        icon: FaAlignRight,
        title: 'Align Right',
        action: () => editor.chain().focus().setTextAlign('right').run(),
        isActive: () => editor?.isActive({ textAlign: 'right' }),
        disabled: () => null,
      },
      {
        icon: FaAlignJustify,
        title: 'Align Justify',
        action: () => editor.chain().focus().setTextAlign('justify').run(),
        isActive: () => editor?.isActive({ textAlign: 'justify' }),
        disabled: () => null,
      },
      {
        type: 'divider',
      },
      {
        icon: FaLink,
        title: 'Link',
        action: () => {
          const previousUrl = editor.getAttributes('link').href
          const url = window.prompt('URL', previousUrl)
          // cancelled
          if (url === null) {
            return
          }

          // empty
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
          }

          // update link
          editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        },
        isActive: () => editor?.isActive('link'),
        disabled: () => null,
      },
      {
        icon: FaUnlink,
        title: 'Link',
        action: () => {
          editor.chain().focus().unsetLink().run()
        },
        isActive: () => null,
        disabled: () => !editor?.isActive('link'),
      },
      {
        icon: FaImage,
        title: 'Insert Image',
        action: () => {
          const inputFile = document.createElement('input')
          inputFile.type = 'file'
          inputFile.accept = 'image/png, image/gif, image/jpeg'

          inputFile.click()
          inputFile.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement
            const files = target.files as unknown as File[]
            if (files) {
              const reader = new FileReader()

              reader.addEventListener('load', (event) => {
                const { result } = event.target
                editor
                  .chain()
                  .focus()
                  .setMedia({ src: result as string, 'media-type': 'img' })
                  .run()

                inputFile.remove()
              })

              reader.readAsDataURL(files[0])
            }
          })
        },
        isActive: () => null,
        disabled: () => null,
      },
      {
        type: 'divider',
      },
      {
        icon: FaListUl,
        title: 'Bullet List',
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor?.isActive('bulletList'),
        disabled: () => null,
      },
      {
        icon: FaListOl,
        title: 'Ordered List',
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor?.isActive('orderedList'),
        disabled: () => null,
      },
      {
        type: 'divider',
      },
      {
        icon: FaQuoteLeft,
        title: 'Blockquote',
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor?.isActive('blockquote'),
      },
      {
        icon: FaRemoveFormat,
        title: 'Clear Format',
        action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: FaUndo,
        title: 'Undo',
        action: () => editor.chain().focus().undo().run(),
      },
      {
        icon: FaRedo,
        title: 'Redo',
        action: () => editor.chain().focus().redo().run(),
      },
    ]
  }, [editor])

  return (
    <div className={clsx(`text-editor-tools`)}>
      {menus.map((menu, menuIdx) => {
        const Icon = menu.icon

        if (menu?.type === 'divider') return <Divider key={`divider-${menuIdx}`} type="vertical" />

        return (
          <button
            key={`menu-item-${menuIdx}`}
            type="button"
            className={clsx({
              active: menu?.isActive?.(),
              disabled: menu?.disabled?.(),
            })}
            onClick={menu.action}
          >
            {typeof Icon === 'string' ? Icon : <Icon />}
          </button>
        )
      })}
    </div>
  )
}

export default MenuBar
