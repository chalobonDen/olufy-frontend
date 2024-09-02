import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import eslint from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import type { ManifestOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import { lingui } from '@lingui/vite-plugin'

const manifest: Partial<ManifestOptions> = {
  name: 'Olufy Admin',
  short_name: 'Olufy Admin',
  icons: [
    {
      src: '/favicon/android-icon-36x36.png',
      sizes: '36x36',
      type: 'image/png',
      density: '0.75',
    },
    {
      src: '/favicon/android-icon-48x48.png',
      sizes: '48x48',
      type: 'image/png',
      density: '1.0',
    },
    {
      src: '/favicon/android-icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
      density: '1.5',
    },
    {
      src: '/favicon/android-icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
      density: '2.0',
    },
    {
      src: '/favicon/android-icon-144x144.png',
      sizes: '144x144',
      type: 'image/png',
      density: '3.0',
    },
    {
      src: '/favicon/android-icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      density: '4.0',
      purpose: 'any maskable',
    },
    {
      src: '/favicon/android-icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  theme_color: '#FFFFFF',
  background_color: '#000006',
  start_url: '/',
  display: 'standalone',
  orientation: 'portrait',
}

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@olufy-frontend/shared': path.resolve(__dirname, '../shared'),
      },
    },
    plugins: [
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
      {
        ...eslint(),
        apply: 'build',
      },
      ssr(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
      }),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: 'generateSW',
        workbox: {
          globPatterns: ['**/*.{js,css}'],
          navigateFallback: null,
        },
        manifest,
      }),
      svgr(),
      lingui(),
    ],
    optimizeDeps: {
      include: ['cross-fetch', 'react/jsx-runtime'],
      exclude: ['@lingui/macro', '@lingui/cli'],
    },
    ssr: {
      noExternal: ['react-dropzone', 'usehooks-ts', 'rc-pagination', 'react-icons', 'date-fns'],
    },
  })
}
