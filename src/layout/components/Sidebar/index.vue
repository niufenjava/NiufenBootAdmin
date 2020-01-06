<template>
  <div :class="{'has-logo':showLogo}">
    <!-- logo 区域 -->
    <logo v-if="showLogo" :collapse="isCollapse" />

    <!-- 左侧菜单栏 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--
        mode	: 模式	horizontal 水平 / vertical 垂直
        default-active	: 当前激活的菜单
        collapse  : 是否折叠 true-折叠；false-展开
        background-color	: 菜单的背景色（仅支持 hex 格式）
        text-color	: 菜单的文字颜色（仅支持 hex 格式）
        unique-opened	: 是否只保持一个子菜单的展开
        active-text-color	: 当前激活菜单的文字颜色（仅支持 hex 格式）
        collapse-transition	: 是否开启折叠动画
       -->
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <!-- 子组件 -->
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    // 激活的菜单
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // 如果设置路径，侧栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否显示LOGO
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // variables.scss 变量
    variables() {
      return variables
    },
    // 侧边栏是否展开
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
