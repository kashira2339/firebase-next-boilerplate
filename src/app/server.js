const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { createReadStream } = require('fs')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    if (pathname === '/firebase-messaging-sw.js') {
      res.setHeader('content-type', 'text/javascript')
      createReadStream('../public/firebase-messaging-sw.js').pipe(res)
    } else if (pathname === '/manifest.json') {
      res.setHeader('content-type', 'application/manifest+json')
      createReadStream('../public/manifest.json').pipe(res)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
