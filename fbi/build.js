const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.config')(require, ctx)

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log(err, 0)
  }

  console.log(`
${stats.toString({
      chunks: false,
      colors: true
    })}
    `)
})
