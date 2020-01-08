import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * 使用 meta.role，以确定当前用户是否具有权限
 * @param roles 用户拥有角色数组
 * @param route 当前路由对象
 */
function hasPermission(roles, route) {
  // 如果存在meta元信息，并且有角色role数组
  if (route.meta && route.meta.roles) {
    // 回调函数中有一个返回真，则返回真
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes 异步路由
 * @param roles 角色数组
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  // 对路由数组进行遍历
  routes.forEach(route => {
    const tmp = { ...route }
    // 判断当前路由角色 是否存在于 用户所拥有角色组
    if (hasPermission(roles, tmp)) {
      // 如果有子节点，则递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 添加到临时数组
      res.push(tmp)
    }
  })

  return res
}

// vuex state
/**
 * vuex state
 * routes 路由数组
 * addRoutes 添加的路由
 */
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  /**
   * 设置路由
   * @param state 状态对象
   * @param routes 要设置的路由数组
   * */
  SET_ROUTES: (state, routes) => {
    // 设置要添加的路由数组
    state.addRoutes = routes
    // 将当前路由添加到常量路由
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 根据角色生成路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 如果角色包含admin，那么把所有的异步路由都添加上
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // 如果不是admin角色，那么进行路由过滤
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
