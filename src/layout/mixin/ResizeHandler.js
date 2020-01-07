// 导入vuex store
import store from '@/store'

const { body } = document
// refer to Bootstrap's responsive design
// 参考Bootstrap的响应式设计
const WIDTH = 992

export default {
  watch: {
    // 监听路由
    $route(route) {
      // 如果设备是mobile 并且 侧边栏是打开的
      if (this.device === 'mobile' && this.sidebar.opened) {
        // 关闭侧边栏
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  // 挂载前
  // beforeMount --- 这个过程是在模版已经在内存中编译完成，
  // 挂载之前被调用，render函数也是首次被调用，
  // 此时完成了虚拟Dom的构建，但并未被渲染，这也是最后一次修改数据的机会。
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  // 销毁前
  // 这个过程是vue实例销毁之前被调用，
  // 在这个过程中我们可以做一些事情，比如 清除计时器或事件等等。
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  // 挂载后一次
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    /**
     * $_isMobile
     * 是否mobile模式
     * @returns true-mobile模式；false-desktop模式
     */
    $_isMobile() {
      // 理解：getBoundingClientRect用于获取某个元素相对于视窗的位置集合。
      // 集合中有top, right, bottom, left, width, height等属性。
      const rect = body.getBoundingClientRect()
      // 如果当前window宽度小于992，返回true-mobile；false-desktop
      return rect.width - 1 < WIDTH
    },

    /**
     * $_resizeHandler
     * 尺寸变化时的操作
     */
    $_resizeHandler() {
      // 如果当前文档没有隐藏
      if (!document.hidden) {
        // 是否mobile
        const isMobile = this.$_isMobile()
        // 设置store.device = mobile or desktop
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          // 如果是mobile，关闭侧边栏
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
