import Vue from 'vue'

/**
 * js-cookie
 * @description 一个简单、轻量级的JavaScript API，用于处理cookie
 * @host https://github.com/js-cookie/js-cookie
 * @demo https://www.jianshu.com/p/6e1bacd35f59
 */
import Cookies from 'js-cookie'

/**
 * normalize
 * @description a modern alternative to CSS resets
 * @description CSS重置的现代替代方法
 * @host https://github.com/necolas/normalize.css
 * */
import 'normalize.css/normalize.css'

/**
 * element-ui
 * @description vue组件框架
 * @host https://element.eleme.io/#/zh-CN/component/installation
 * */
import Element from 'element-ui'

// 系统element-ui 样式变量替换
import './styles/element-variables.scss'

// 导入全局主题样式，这里面还包含其他样式文件
import '@/styles/index.scss' // global css

// vue 主文件
import App from './App'

// vuex 存储
import store from './store'

// vue 路由
import router from './router'

// 导入icon
import './icons' // icon

// 权限控制
import './permission' // permission control

// 导入错误日志
import './utils/error-log' // error log

// 导入全局过滤器
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/**
 * 如果你不想使用mock服务器，
 * 你想使用MockJs的mock api，
 * 你可以执行:mockXHR()
 *
 * 目前MockJs将在生产环境中使用，
 * 请在上线前删除它!!!
 * */
// 如果是开发环境，执行 mockXHR()
if (process.env.NODE_ENV === 'production') {
  import('../mock').then(({ mockXHR }) => {
    mockXHR()
  })
}

// 设置ElementUI 的默认大小为中等
// 如果Cookies中设置了size，则使用设置，否则使用默认
// 在引入 Element 时，可以传入一个全局配置对象。
// 该对象目前支持 size 与 zIndex 字段。
// size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。
// 按照引入 Element 的方式，具体操作如下：
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
// 注册全局工具过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
