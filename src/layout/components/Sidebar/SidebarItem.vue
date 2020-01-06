<template>
  <!-- 具体菜单对象 -->
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- link标签 -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!--
          elementUI 菜单项 Menu-Item Attribute
          index : 唯一标志
          route : Vue Router 路径对象
          disabled : 是否禁用
         -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 图标+菜单名 -->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!--
      SubMenu Attribute 子菜单属性
      index : 唯一标志
      popper-class : 弹出菜单的自定义类名
      show-timeout : 展开 sub-menu 的延时	默认300
      hide-timeout : 收起 sub-menu 的延时	默认300
      disabled : 是否禁用
      popper-append-to-body : 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性
                              一级子菜单：true / 非一级子菜单：false
     -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>

      <!-- 父菜单名：图标+菜单名 -->
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>

      <!-- 递归子菜单 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    // item
    /**
     * item
     * @description 一个路由对象
     *
  {
    path: '/store',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/store/index'),
      name: 'Store',
      meta: {
        title: '客户端存储',
        icon: 'international',
        affix: true
      }
    }]
  }
     */
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    /**
     * 基础路径
     */
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function 用渲染函数重构
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          // 临时设置(如果只有一个显示的子节点，则使用临时设置)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // 当只有一个子路由器时，默认显示子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },

    // 解析路径
    resolvePath(routePath) {
      // 传入的路由路径是否是外部拦截
      if (isExternal(routePath)) {
        return routePath
      }
      // 如果基础链接是外部的，直接返回
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      /**
       * Node.js path 模块提供了一些用于处理文件路径的小工具
       * path.resolve([from ...], to)
       * @description 将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，
       * 后面每个 path 被依次解析，直到构造完成一个绝对路径。
       * 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。
       *
       * path.resolve('/foo/bar', './baz');
       * 返回: '/foo/bar/baz'
       *
       * path.resolve('/foo/bar', '/tmp/file/');
       * 返回: '/tmp/file'
       *
       * path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
       * 如果当前工作目录为 /home/myself/node，
       * 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
       */
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
