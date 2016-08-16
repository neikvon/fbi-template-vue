'use strict'
const path = require('path')
const http = require('http')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.dev.config')(require, ctx)

const app = express()

const compiler = webpack(config)

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
})
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
  // ctx.log(`Server root: ${ctx.options.server.root}`)
})