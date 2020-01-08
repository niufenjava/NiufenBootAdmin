/**
 * vuex 设置
 */
// 样式变量
import variables from '@/styles/element-variables.scss'
// 默认配置文件
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

/**
 *
 * @param theme 主题
 * @param showSetting 是否展示设置按钮
 * @param tagsView 视图tags
 * @param fixedHeader 是否固定header
 * @param sidebarLoge 是否展示Logo
 */
const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  /**
   * 设置store.state 状态
   * key 键
   * value 值
   */
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  /**
   * 变更设置熟悉
   *
   * @param {*} { commit }
   * @param {*} data {key,value}
   */
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

