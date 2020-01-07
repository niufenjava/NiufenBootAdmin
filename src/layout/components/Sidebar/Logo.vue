<template>
  <!-- 整个侧边栏LOGO容器 -->
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <!-- 侧边LOGO变化动画 -->
    <transition name="sidebarLogoFade">

      <!-- 折叠 -->
      <!-- 点击路由到主页面 -->
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>

      <!-- 展开 -->
      <!-- 点击路由到主页面 -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
export default {
  name: 'SidebarLogo',
  props: {
    // 是否折叠
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: null
      // title: 'Vue Element Admin'
      // logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },

  computed: {
    title() {
      return defaultSettings.title
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

// 侧边栏logo容器class
.sidebar-logo-container {
  // 相对的
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

// 侧边栏折叠
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
