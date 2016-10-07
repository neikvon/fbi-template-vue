module.exports = {
  template: 'vue2',
  templateDescription: 'A modern Vue.js project which uses Vue 2, Vuex, Vue-router and Webpack 2.',
  server: {
    root: 'dst/',
    host: 'localhost',
    port: 8888,
    // proxy: {
    //   '/api': 'http://qqar.oa.com'
    // }
  },
  npm: {
    alias: 'tnpm',
    options: ''
    // options: '--registry=https://registry.npm.taobao.org'
  },
  alias: {
    b: 'build',
    s: 'serve'
  },
  webpack: {
    data: {
      dev: {
        __APIROOT__: '/api/'
      },
      prod: {
        __APIROOT__: 'http://demo.api.com/'
      }
    }
  }
}