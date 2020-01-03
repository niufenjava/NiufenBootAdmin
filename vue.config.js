// use strict 使用严格模式
'use strict'

// Node.js path 模块提供了一些用于处理文件路径的小工具
// https://www.runoob.com/nodejs/nodejs-path-module.html
const path = require('path')
console.info('path', path)

// 引入全局配置文件，有关页面的显示
const defaultSettings = require('./src/settings.js')

// resolve(path) 转换为绝对路径
function resolve(dir) {
  // 用于连接路径。该方法的主要用途在于，
  // 会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
  // node.js 全局对象 __dirname 表示当前执行脚本所在的目录。
  const resolveAbsoltePath = path.join(__dirname, dir)
  console.info('resolveAbsoltePath: ', resolveAbsoltePath)
  return resolveAbsoltePath
}

// 设置系统标题，如果没有配置则使用默认配置
const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
// 如果端口设置为80
// 使用管理员权限执行命令
// 举个例子，Mac: sudo npm run
// 你可以通过以下方法改变端口:
// 可以通过命令 npm run dev --port = 9999，那可以在这里面通过
// process.evn.port 的方式获取端口号
// port = 9527 npm run dev OR npm run dev --port = 9527

/**
 * process
 * node.js 全局对象 https://www.runoob.com/nodejs/nodejs-global-object.html
 * process 是一个全局变量，即 global 对象的熟悉
 * 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
 * 同时在你写本地命令行程序的时候，少不了要和它打交道。
 *
 * env熟悉
 * 返回一个对象，成员为当前 shell 的环境变量
 */
console.info('process.env.port:', process.env.port)
console.info('process.env.npm_config_port:', process.env.npm_config_port)
console.info('process.env.NODE_ENV:', process.env.NODE_ENV)
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
// 所有的配置项说明都可以在 https://cli.vuejs.org/config/ 找到
/**
 * exports 和 module.exports 的使用
 * 如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。
 * */
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  /**
   * 如果您计划在子路径下部署站点，则需要设置publicPath,
   * 例如GitHub页面。如果您计划将您的站点部署到https://foo.github.io/bar/，
   * 然后将publicPath设置为“/bar/”。
   * 在大多数情况下，请使用'/' !!
   * 详情: https://cli.vuejs.org/config/#publicpath
   * 其实就是设置这个项目的web访问根目录
   *  */
  publicPath: '/',

  /**
   * outputDir
   * @type String
   * @default dist
   * @description 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
   * 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
   * 貌似不能修改成绝对路径
   */
  outputDir: 'dist',

  /**
   * assetsDir
   * @type String
   * @default ''
   * @description 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
   */
  assetsDir: 'static',

  /**
   * lintOnSave
   * @type boolean || 'error'
   * @default true
   * @description 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
   * 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
   */
  lintOnSave: process.env.NODE_ENV === 'development',

  /**
   * productionSourceMap
   * @type boolean
   * @default text
   * @description 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   */
  productionSourceMap: false,

  /**
   * devServer
   * @type Object
   * @description https://webpack.js.org/configuration/dev-server/ 参数选项
   * 开发模式相关配置
   */
  devServer: {
    // 指定端口号
    port: port,
    // 告诉dev-server在服务器启动后打开浏览器。将其设置为true以打开默认浏览器。
    open: true,
    // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。如果只想显示编译器错误：
    overlay: {
      warnings: false,
      errors: true
    },
    // 当您拥有单独的API后端开发服务器并且希望在同一域上发送API请求时，
    // 代理某些URL可能会很有用。
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // 基础后端接口 process.env.VUE_APP_BASE_API
      // 相当于 '/dev-api' : {}
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    // 提供在服务器内部在所有其他中间件之后执行自定义中间件的功能。
    after: require('./mock/mock-server.js')
  },

  /**
   * configureWebpack
   * @type Object | Function
   * webpack相关配置
   * https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
   * */
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // 在webpack的name字段中提供应用程序的标题，
    // 以便在index.html中访问它以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  /**
   * chainWebpack
   * @type Function
   * @description 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
   * https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
   * Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。
   * 这个库提供了一个 webpack 原始配置的上层抽象，
   * 使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
   * */
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    // svg icons 相关配置、加载
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    // vue相关配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
