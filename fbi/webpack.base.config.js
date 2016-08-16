module.exports = (require, ctx) => {

  'use strict'
  const path = require('path')
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const nodeModulesPath = ctx.options.node_modules_path
  // const nodeModulesPath = ctx._.cwd('node_modules') // for local test

  const postcss = [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('precss')
  ]

  return {
    entry: {
      client: './src/index.js'
    },
    output: {
      path: path.join(__dirname, '../dst/assets'),
      filename: '[name].js',
      publicPath: './assets'
    },
    resolve: {
      extensions: ['', '.js', '.vue', '.css', '.json'],
      alias: {
        root: path.join(__dirname, '../src'),
        components: path.join(__dirname, '../src/components')
      },
      modules: [nodeModulesPath] // important !!
    },
    resolveLoader: {
      modules: [nodeModulesPath] // important !!
    },
    module: {
      loaders: [
        {
          test: /\.vue$/,
          loaders: ['vue']
        },
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: [/node_modules/]
        }
      ]
    },
    babel: {
      babelrc: false,
      presets: [
        [nodeModulesPath + '/babel-preset-es2015', { modules: false }],
        nodeModulesPath + '/babel-preset-stage-1'
      ]
    },
    postcss,
    vue: {
      loaders: {},
      postcss
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'vue2',
        template: __dirname + '/index.html',
        filename: '../index.html'
      })
    ]
  }
}