module.exports = (require, ctx) => {

  'use strict'
  const path = require('path')
  const webpack = require('webpack')
  const CleanPlugin = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  const ProgressBarPlugin = require('progress-bar-webpack-plugin')
  const pkg = require('../package')
  const nodeModulesPath = ctx.options.node_modules_path
  const root = process.cwd()
  const noop = function () { }
  // const nodeModulesPath = ctx._.cwd('node_modules') // for local test
  const deps = [
    'vue/dist/vue.min.js',
    'vuex/dist/vuex.min.js',
    'vue-router/dist/vue-router.min.js'
  ]

  const postcss = [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('precss')
  ]

  const config = {
    cache: true,
    entry: {
      app: ctx.isProd
        ? path.join(root, 'src/index.js')
        : ['webpack-hot-middleware/client', path.join(root, 'src/index.js')]
    },
    output: {
      path: path.join(root, ctx.options.server.root, 'assets'),
      filename: ctx.isProd ? '[name].[chunkhash:8].js' : '[name].js',
      publicPath: ctx.isProd ? './assets' : '/assets/'
    },
    resolve: {
      extensions: ['*', '.js', '.vue', '.css', '.json'],
      alias: {
        root: path.join(root, 'src'),
        components: path.join(root, 'src/components')
      },
      modules: [
        // nodeModulesPath,
        'node_modules'
      ] // important !!
    },
    resolveLoader: {
      modules: [nodeModulesPath] // important !!
    },
    devtool: ctx.isProd ? 'source-map' : 'cheap-source-map',
    module: {
      noParse: [],
      loaders: [
        {
          test: /\.vue$/,
          loaders: ['vue-loader']
        },
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: path => {
            // 路径中含有 node_modules 的就不去解析。
            const isNpmModule = !!path.match(/node_modules/)
            return isNpmModule
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url',
          query: {
            limit: 5000,
            name: ctx.isProd
              ? '/img/[name].[hash:8].[ext]'
              : 'img/[name].[ext]?[hash:8]'
          }
        }
      ]
    },
    plugins: [
      ctx.isProd
        ? new CleanPlugin([ctx.options.server.root], {
          root: root
        })
        : noop,
      // ^Webpack 2.1.0-beta23
      // https://github.com/webpack/webpack/pull/2974#issuecomment-245857168
      new webpack.LoaderOptionsPlugin({
        options: {
          babel: {
            babelrc: false,
            presets: [
              [nodeModulesPath + '/babel-preset-es2015', { modules: false }],
              nodeModulesPath + '/babel-preset-stage-1'
            ]
          },
          postcss,
          vue: {
            loaders: {
              css: ctx.isProd
                ? ExtractTextPlugin.extract({
                  loader: 'css-loader',
                  fallbackLoader: 'vue-style-loader'
                })
                : 'style-loader!css-loader!postcss-loader'
            },
            postcss
          }
        },
        minimize: ctx.isProd // minify css
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ctx.isProd ? 'production' : 'development')
      }),
      new HtmlWebpackPlugin({
        title: 'vue2',
        template: __dirname + '/index.html',
        filename: '../index.html'
      }),
      ctx.isProd
        ? new ProgressBarPlugin()
        : new webpack.HotModuleReplacementPlugin(),
      ctx.isProd
        ? new CopyWebpackPlugin([
          { from: 'src/favicon.ico', to: '../' }
        ])
        : new webpack.NoErrorsPlugin(),
      ctx.isProd
        ? new ExtractTextPlugin('app.[contenthash:8].css')
        : noop,
      ctx.isProd
        ? new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          comments: false
        })
        : noop,
      ctx.isProd
        ? new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: 'vendor.[chunkhash:8].js'
        })
        : noop
    ]
  }

  deps.map(dep => {
    const depPath = path.join(root, 'node_modules', dep)
    config.resolve.alias[dep.split('/')[0]] = depPath
    config.module.noParse.push(depPath)
  })

  if (ctx.isProd) {
    config.entry.vendor = Object.keys(pkg.dependencies).filter(name => {
      // update the code if you want to
      // remove some dependencies you don't need in the vendor bundle
      return true
    })
  }

  return config
}