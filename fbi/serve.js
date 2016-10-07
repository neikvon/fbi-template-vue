'use strict'
const path = require('path')
const http = require('http')
const express = require('express')
const webpack = require('webpack')
const proxy = require('express-http-proxy')
const config = require('./webpack.config')(require, ctx)

const app = express()
const options = {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
}
const compiler = webpack(config)
const devMiddleWare = require('webpack-dev-middleware')(compiler, options)

// proxy
const proxyOptions = ctx.options.server.proxy
if (proxyOptions) {
  for (let p in proxyOptions) {
    app.use(p, proxy(proxyOptions[p]))
    ctx.log(`Proxy ${p} => ${proxyOptions[p]}`)
  }
}

app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  const fs = devMiddleWare.fileSystem
  devMiddleWare.waitUntilValid(() => {
    res.end(fs.readFileSync(path.join(config.output.path, '../index.html')))
  })
})

let start = ctx.taskParams
  ? ctx.taskParams[0] * 1
  : ctx.options.server.port

// auto selected a valid port & start server
function autoPortServer(cb) {
  let port = start
  start += 1
  const server = http.createServer(app)

  server.listen(port, err => {
    server.once('close', () => {
      app.listen(port, err => {
        if (err) {
          ctx.log(err)
          return
        }
        cb(port)
      })
    })
    server.close()
  })
  server.on('error', err => {
    autoPortServer(cb)
  })
}

// listen
autoPortServer(port => {
  ctx.log(`Server runing at http://${ctx.options.server.host}:${port}`, 1)
})