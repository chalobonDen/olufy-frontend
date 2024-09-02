/* eslint-disable no-console */
// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr/server'
import fetch from 'cross-fetch'

import { root } from './root.js'

const isProduction = process.env.NODE_ENV === 'production'

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

  const port = process.env.PORT || 3001
  app.listen(port)
  console.log(`Server running at http://localhost:${port}/blank`)
}
