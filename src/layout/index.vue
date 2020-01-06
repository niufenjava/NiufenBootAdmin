<template>
  <div :class="classObj" class="app-wrapper">

    <!-- 如果是手机模式，打开侧边栏的时候需要一个遮罩 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <!-- 左边菜单栏 -->
    <sidebar class="sidebar-container" />

    <!-- 右侧header+tags+main -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">

      <!-- 顶部header+tags -->
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 顶部导航 -->
        <navbar />
        <!-- tags -->
        <tags-view v-if="needTagsView" />
      </div>

      <!-- main区域 -->
      <app-main />

      <!-- 右侧setting设置按钮 -->
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        // 隐藏侧边栏class
        hideSidebar: !this.sidebar.opened,
        // 打开侧边栏class
        openSidebar: this.sidebar.opened,
        // 是否动画
        withoutAnimation: this.sidebar.withoutAnimation,
        // 是否筹集设备
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  // app 整体包装类
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
