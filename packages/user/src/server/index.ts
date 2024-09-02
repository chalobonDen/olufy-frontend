/* eslint-disable no-console */
// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr/server'
import fetch from 'cross-fetch'
import { renderToStream } from '@react-pdf/renderer'
import { config } from 'dotenv'

import type { PageContext } from '@/renderer/types.js'

import { root, __dirname } from './root.js'

const isProduction = process.env.NODE_ENV === 'production'

config()
startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  if (isProduction) {
    const sirv = (await import('sirv')).default
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  // For Backend call get generate template
  // app.post('/document/download', async (req, res) => {
  // TODO: should be POST method
  app.get('/document/download', async (req, res) => {
    // const { body, headers } = req

    console.log('GENERATE_DOCUMENT_KEY: ', process.env.GENERATE_DOCUMENT_KEY)

    const pageContextInit = {
      urlOriginal: req.url,
      body: {
        test: 'xxx',
      },
    }

    const pageContext = (await renderPage(pageContextInit)) as PageContext
    const pdfStream = await renderToStream(pageContext.pdfViwer)
    res.setHeader('Content-Type', 'application/pdf')
    pdfStream.pipe(res)
    pdfStream.on('end', () => console.log('Done streaming, response sent.'))
  })

  app.get('*', async (req, res, next) => {
    if (req.originalUrl.includes('manifest') || (req.originalUrl.includes('.js') && !req.originalUrl.includes('.json')))
      return next()

    const pageContextInit = {
      urlOriginal: req.protocol + '://' + req.headers.host + req.originalUrl,
      fetch,
      cookie: req.headers.cookie,
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    const { redirectTo } = pageContext as { redirectTo?: string }

    if (!!redirectTo) res.redirect(redirectTo)
    else if (!httpResponse) return next()
    else {
      const { body, statusCode, contentType, earlyHints } = httpResponse
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
      res.status(statusCode).type(contentType).send(body)
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}/blank`)
}
