import Cookies from 'js-cookie'

const state = {
  sidebar: {
    // 侧边栏是否打开：如果Cookies中存在则从Cookies中获取，如果不存在则默认打开侧边栏
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 是否开启动画，默认false
    withoutAnimation: false
  },
  // 设备，默认桌面
  device: 'desktop',
  // elementUI size 默认medium
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  // 侧边栏展开-缩小切换
  TOGGLE_SIDEBAR: state => {
    // 通过opened = !opened 切换
    state.sidebar.opened = !state.sidebar.opened
    // 设置为不带动画
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      // 如果侧边栏开启，在Cookies中设置状态为1
      Cookies.set('sidebarStatus', 1)
    } else {
      // 如果侧边栏关闭，在Cookies中设置状态为0
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 关闭侧边栏-变更
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // 设置COOKIES sidebarStatus = 0
    Cookies.set('sidebarStatus', 0)
    // opened = false
    state.sidebar.opened = false
    // 动画
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备
  TOGGLE_DEVICE: (state, device) => {
    // 设置当前设备=传入值
    state.device = device
  },
  // 设置elementUI de 大小，并设置到cookies中
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

// Action类似于 mutation，不同在于
// Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
const actions = {
  toggleSideBar({
    commit
  }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({
    commit
  }, {
    withoutAnimation
  }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({
    commit
  }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
