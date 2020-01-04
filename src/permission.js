// vue 路由
import router from './router'

// vuex 存储
import store from './store'

// element-ui 消息通知
import { Message } from 'element-ui'

/**
 * nprogress
 * @host https://github.com/rstacruz/nprogress
 * @description Minimalist progress bar 简约进度条
 */
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 权限工具
import { getToken } from '@/utils/auth' // get token from cookie

// 引入动态生成页面标题方法
import getPageTitle from '@/utils/get-page-title'

// Turn off loading spinner by setting it to false. (default: true)
// 通过将其设置为false来关闭加载微调器。 （默认值：true）
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// no redirect whitelist
// 重定向白名单
const whiteList = ['/login', '/auth-redirect']

/**
 * router.beforeEach
 * 你可以使用 router.beforeEach 注册一个全局前置守卫：
 * router.beforeEach((to, from, next) => {
 * })
 * 当一个导航触发时，全局前置守卫按照创建顺序调用。
 * 守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 *   next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
 *   next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
 *   next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 *       你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home'
 *       之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
 *   next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
 * 确保要调用 next 方法，否则钩子就不会被 resolved。
 */
// async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。
// explain https://segmentfault.com/a/1190000011526612?utm_source=tag-newest
router.beforeEach(async(to, from, next) => {
  // start progress bar
  // 开启进度条
  NProgress.start()

  // set page title
  // 用于动态设置页面 title，并设置标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // 获取cookie中的token
  const hasToken = getToken()

  // 如果存在token
  if (hasToken) {
    // 如果目标路由是 login
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      // 结束进度条
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // 确定用户是否通过getInfo获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 如果角色存在，则继续
      if (hasRoles) {
        next()
      } else {
        // 如果角色不存在
        try {
          // get user info
          // 获取用户信息
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 注意:角色必须是一个对象数组!例如:['admin']或，['developer'，'editor']
          // await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。
          // await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，
          // 但是它最主要的意图是用来等待 Promise 对象的状态被 resolved。
          // 如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决,如果等的是正常的表达式则立即执行。
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 根据角色生成可访问路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // 破解方法，以确保addRoutes是完整的
          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // 删除令牌，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          // 结束进度条
          NProgress.done()
        }
      }
    }
  } else {
    // 如果不存在token
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // 在免费登录白名单，直接去
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 没有访问权限的其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      // 结束进度条
      NProgress.done()
    }
  }
})

// 注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
router.afterEach(() => {
  // finish progress bar
  // 结束进度条
  NProgress.done()
})
