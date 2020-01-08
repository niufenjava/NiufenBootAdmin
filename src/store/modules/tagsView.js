/**
 * this.$store.state.tagsView
 * header选项卡视图相关
 * @param visitedViews 访问过的视图集合
 * @param cachedViews 缓存的视图集合
 */
const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  /**
   * 添加访问过的视图
   */
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  /**
   * 添加缓存视图
   */
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  /**
   * 删除访问过的视图
   */
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  /**
   * 删除缓存视图
   */
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  /**
   * 删除其他的访问过的视图
   */
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  /**
   * 删除其他的缓存的视图
   */
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  /**
   * 删除所有访问过的视图
   */
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  /**
   * 删除所有缓存过视图
   */
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },
  /**
   * 更新访问过的视图
   */
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  /**
   * 添加视图
   *
   * @param {*} { dispatch }
   * @param {*} view 视图
   */
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  /**
   * 添加访问过的视图
   *
   * @param {*} { commit }
   * @param {*} view
   */
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  /**
   * 添加缓存的视图
   *
   * @param {*} { commit }
   * @param {*} view
   */
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  /**
   * 删除视图
   *
   * @param {*} { dispatch, state }
   * @param {*} view
   * @returns
   */
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  /**
   * 删除访问过的视图
   *
   * @param {*} { commit, state }
   * @param {*} view
   * @returns
   */
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  /**
   * 删除缓存过的视图
   *
   * @param {*} { commit, state }
   * @param {*} view
   * @returns
   */
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  /**
   * 删除其他的视图
   *
   * @param {*} { dispatch, state }
   * @param {*} view
   * @returns
   */
  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  /**
   *删除其他访问过的视图
   *
   * @param {*} { commit, state }
   * @param {*} view
   * @returns
   */
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  /**
   * 删除其他缓存过的视图
   *
   * @param {*} { commit, state }
   * @param {*} view
   * @returns
   */
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  /**
   * 删除所有视图
   *
   * @param {*} { dispatch, state }
   * @param {*} view
   * @returns
   */
  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  /**
   * 删除所有访问过的视图
   *
   * @param {*} { commit, state }
   * @returns
   */
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  /**
   * 删除所有缓存过的视图
   *
   * @param {*} { commit, state }
   * @returns
   */
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
  /**
   * 更新访问过的视图
   *
   * @param {*} { commit }
   * @param {*} view
   */
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
