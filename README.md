# FBI Vue 模板

## 简介

一个基于Vue 2, Vuex, Vue-router 和 Webpack 2 的项目模板。

Vue 可以让你避免手动DOM操作，一切以数据为驱动，同时 Vue v2 新增了 `jsx`支持和服务端渲染能力。

## 如何使用

```bash

$ cd path/to/a/empty/folder   # 定位到一个空目录

$ fbi init vue               # 初始化本模板

$ npm i --prod               # 安装生产依赖

$ fbi ls                      # 查看可用任务
```

你随时可以修改本地`./fbi`目录内的配置文件 ( `config.js`和`webpack.*.config.js` ) 和 任务文件，这些操作不会影响模版.


## 两条命令
```bash
$ fbi s       # 启动开发服务器 （使用文件流，不生成本地文件）
```
```bash
$ fbi b       # 编译代码 （生成本地文件）
```

## N套环境
```bash
$ fbi s               # 启动开发服务器, 默认使用dev环境数据
$ fbi s -p            # 在dst目录启动web服务器（dst目录是生成后的代码，不可指定环境数据）
$ fbi s -test         # 启动开发服务器, 并使用test环境数据

$ fbi b               # 编译代码，默认使用prod环境数据
$ fbi b -demo         # 编译代码, 并使用demo环境数据

$ fbi s -9000 -prod   # 在9000端口启动服务器，并使用prod环境数据
$ fbi b s             # 编译代码，并启动开发服务器
$ fbi b -test s -9000 # 编译代码（使用test环境数据），并启动开发服务器（使用9000端口, dev环境数据）
```

### 环境变量的使用

```js
// 在js里
const version = VERSION
```
```handlebars
<!-- 在html里 -->
{{ htmlWebpackPlugin.options.data.VERSION }}
```

### 环境变量的配置
```js
// fbi/config.js
{
  webpack: {
    // 模板数据(编译时数据)
    data: {
      // 所有环境
      all: {
        CDN: './',
        VERSION: 'v1.0.1',
        COPYRIGHT: '@2016'
      },
      // 开发环境
      dev: {
        CGI_ROOT: 'http://cgi.dev'
      },
      // 测试环境
      test: {
        CGI_ROOT: 'http://cgi.test'
      },
      // 生产环境
      prod: {
        CGI_ROOT: 'http://cgi.prod'
      }
    },
    // 定义外部依赖
    externals: [],
    // 用别名做重定向
    alias: {}
  }
}
```
> webpack.data（环境变量）配置说明
>
> 1. `all`, `dev`, `test`, `prod` 是环境名称，定义了fbi编译时指明的环境对应的数据，可按需增删改
> 1. `webpack.data.all` 配置是所有环境固定不变的数据，除非你不想使用其他任何环境数据，否则，请不要使用 `fbi s -all`


## Change Logs

**V1.0.2**
- 编译时数据支持自定义环境，且自定义环境和自定义端口可同时使用，如：`fbi s -test -3000` (在3000端口启动服务器，并使用配置的test环境数据)
- `fbi s`默认使用`dev`的数据；`fbi b`默认使用`prod`的数据
- 抽离webpack 的 alias配置到config.js, 同时可在config.js配置webpack的noParse

**V1.0.1**
- 依赖更新
- 配置更新
- 支持组件资源分离（详见：`src/components/demo`）
- 入口页面`index.html`移至src目录