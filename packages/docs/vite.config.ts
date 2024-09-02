/* eslint-disable no-param-reassign */
import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import ssr from 'vite-plugin-ssr/plugin'
import rehypeSlug from 'rehype-slug'
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import rehypePrettyCode from 'rehype-pretty-code'
import { visit } from 'unist-util-visit'
import remarkGfm from 'remark-gfm'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { rehypeComponent } from './src/libs/rehype-component'

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  keepBackground: false,
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@olufy-frontend/shared': path.resolve(__dirname, '../shared'),
    },
  },
  plugins: [
    react(),
    ssr(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeComponent,
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === 'element' && node?.tagName === 'pre') {
              const [codeEl] = node.children
              if (codeEl.tagName !== 'code') {
                return
              }

              if (codeEl.data?.meta) {
                // Extract event from meta and pass it down the tree.
                const regex = /event="([^"]*)"/
                const match = codeEl.data?.meta.match(regex)
                if (match) {
                  node.__event__ = match ? match[1] : null
                  codeEl.data.meta = codeEl.data.meta.replace(regex, '')
                }
              }

              node.__rawString__ = codeEl.children?.[0].value
              node.__src__ = node.properties?.__src__
              node.__style__ = node.properties?.__style__
            }
          })
        },
        [rehypePrettyCode, rehypePrettyCodeOptions],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === 'element' && node?.tagName === 'div') {
              if (!('data-rehype-pretty-code-fragment' in node.properties)) {
                return
              }

              const preElement = node.children.at(-1)
              if (preElement.tagName !== 'pre') {
                return
              }

              // preElement.properties['__withmeta__'] = node.children.at(0).tagName === 'div'
              preElement.properties['__rawstring__'] = node.__rawString__

              if (node.__src__) {
                preElement.properties['__src__'] = node.__src__
              }

              if (node.__event__) {
                preElement.properties['__event__'] = node.__event__
              }

              if (node.__style__) {
                preElement.properties['__style__'] = node.__style__
              }
            }
          })
        },
      ],
    }),
  ],
  optimizeDeps: { include: ['react/jsx-runtime'] },
  ssr: {
    noExternal: ['react-dropzone', 'usehooks-ts', 'rc-pagination', 'react-icons', 'date-fns'],
  },
})
