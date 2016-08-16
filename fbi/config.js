module.exports = {
  template: 'vue2',
  templateDescription: 'A modern Vue.js project which uses Vue 2, Vuex, Vue-router and Webpack 2.',
  server: {
    root: 'dst/',
    host: 'localhost',
    port: 8888
  },
  npm: {
    alias: 'npm',
    // options: '--save-dev'
    options: '--save-dev --registry=https://registry.npm.taobao.org'
  },
  alias: {
    b: 'build',
    s: 'serve'
  }
}