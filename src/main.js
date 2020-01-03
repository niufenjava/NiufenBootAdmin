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
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import {
  mockXHR
} from '../mock'
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
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
