import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用API获取用户信息，传参为token
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          // reject('Verification failed, please Login again.')
          reject('验证失败，请重新登录！')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        // 角色必须是非空数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: 您没有登录权限！')
        }

        // 设置角色
        commit('SET_ROLES', roles)
        // 设置名称
        commit('SET_NAME', name)
        // 设置化身
        commit('SET_AVATAR', avatar)
        // 设置引言
        commit('SET_INTRODUCTION', introduction)
        // 处理数据
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // 用户登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  /**
   * dynamically modify permissions
   * 动态修改权限
   *
   * @param {*} { commit, dispatch }
   * @param {*} role 角色
   * @returns
   */
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      // 获取用户角色信息
      const { roles } = await dispatch('getInfo')

      // 重置路由
      resetRouter()

      // generate accessible routes map based on roles
      // 根据角色生成可访问路由映射
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      // 动态添加可访问路由
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      // 重置已访问的视图和缓存的视图
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
