/**
 * 路由主文件
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules 路由模块 */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * 注意:子菜单只在路由子菜单时出现。长度> = 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 *                                如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 *                                如果设置为真，将始终显示根菜单
 *                                如果不设置alwaysShow，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 *                                如果设置noRedirect将不会在面包屑重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 *                                名称由<keep-alive>(必须设置!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
                                 控制页面角色(您可以设置多个角色)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
                                 名称显示在侧栏和面包屑(推荐设置)
    icon: 'svg-name'             the icon show in the sidebar
                                 图标显示在侧栏中
    noCache: true                if set true, the page will no be cached(default is false)
                                 如果设置为真，页面将不会被缓存(默认为假)
    affix: true                  if set true, the tag will affix in the tags-view
                                 如果设置为真，则标记将附加在标记视图中
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
                                 如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
                                 如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes 常量路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 没有权限要求的基页可以访问所有角色
 */
export const constantRoutes = [
  {
    //
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    desc: '登录页面',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {

    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        alias: 'Dashboard',
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },

  {
    path: '/store',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/store/index'),
      name: 'Store',
      meta: {
        alias: 'store',
        title: '客户端存储',
        icon: 'international',
        affix: true
      }
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: 'Documentation',
      meta: {
        alias: 'Documentation',
        title: '文档',
        icon: 'documentation',
        affix: true
      }
    }]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      component: () => import('@/views/guide/index'),
      name: 'Guide',
      meta: {
        alias: 'Guide',
        title: '引导页',
        icon: 'guide',
        noCache: true
      }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: {
        alias: 'Profile',
        title: '个人中心',
        icon: 'user',
        noCache: true
      }
    }]
  }
]

/**
 * asyncRoutes 异步路由
 * the routes that need to be dynamically loaded based on user roles
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [{
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu 总是显示根菜单吗
  name: 'Permission',
  meta: {
    title: '权限测试页',
    alias: 'Permission',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav 可以在根导航中设置角色
  },
  children: [{
    path: 'page',
    component: () => import('@/views/permission/page'),
    name: 'PagePermission',
    meta: {
      title: '页面权限',
      alias: 'Page Permission',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  },
  {
    path: 'directive',
    component: () => import('@/views/permission/directive'),
    name: 'DirectivePermission',
    meta: {
      title: '指令权限',
      alias: 'Directive Permission'
      // if do not set roles, means: this page does not require permission
    }
  },
  {
    path: 'role',
    component: () => import('@/views/permission/role'),
    name: 'RolePermission',
    meta: {
      alias: 'Role Permission',
      title: '角色权限',
      roles: ['admin']
    }
  }
  ]
},

{
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/icons/index'),
    name: 'Icons',
    meta: {
      alias: 'Icons',
      title: '图标',
      icon: 'icon',
      noCache: true
    }
  }]
},

/**
 * when your routing map is too long, you can split it into small modules
 * 当你的路由图太长时，你可以把它分成小模块
 */
componentsRouter,
chartsRouter,
nestedRouter,
tableRouter,

{
  path: '/example',
  component: Layout,
  redirect: '/example/list',
  name: 'Example',
  meta: {
    alias: 'Example',
    title: '综合实例',
    icon: 'example'
  },
  children: [{
    path: 'create',
    component: () => import('@/views/example/create'),
    name: 'CreateArticle',
    meta: {
      alias: 'Create Article',
      title: '创建文章',
      icon: 'edit'
    }
  },
  {
    path: 'edit/:id(\\d+)',
    component: () => import('@/views/example/edit'),
    name: 'EditArticle',
    meta: {
      alias: 'Edit Article',
      title: '编辑文章',
      noCache: true,
      activeMenu: '/example/list'
    },
    hidden: true
  },
  {
    path: 'list',
    component: () => import('@/views/example/list'),
    name: 'ArticleList',
    meta: {
      title: '文章列表',
      alias: 'Article List',
      icon: 'list'
    }
  }
  ]
},

{
  path: '/tab',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/tab/index'),
    name: 'Tab',
    meta: {
      alias: 'Tab',
      title: '选项卡',
      icon: 'tab'
    }
  }]
},

{
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  meta: {
    alias: 'Error Pages',
    title: '错误页面',
    icon: '404'
  },
  children: [{
    path: '401',
    component: () => import('@/views/error-page/401'),
    name: 'Page401',
    meta: {
      alias: '401',
      title: '401无权限页面',
      noCache: true
    }
  },
  {
    path: '404',
    component: () => import('@/views/error-page/404'),
    name: 'Page404',
    meta: {
      alias: '404',
      title: '404错误页面',
      noCache: true
    }
  }
  ]
},

{
  path: '/error-log',
  component: Layout,
  children: [{
    path: 'log',
    component: () => import('@/views/error-log/index'),
    name: 'ErrorLog',
    meta: {
      alias: 'Error Log',
      title: '异常日志',
      icon: 'bug'
    }
  }]
},

{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'Excel',
  meta: {
    title: 'Excel',
    alias: 'Excel',
    icon: 'excel'
  },
  children: [{
    path: 'export-excel',
    component: () => import('@/views/excel/export-excel'),
    name: 'ExportExcel',
    meta: {
      alias: 'Export Excel',
      title: '导出 Excel'
    }
  },
  {
    path: 'export-selected-excel',
    component: () => import('@/views/excel/select-excel'),
    name: 'SelectExcel',
    meta: {
      alias: 'Export Selected',
      title: '导出已选'
    }
  },
  {
    path: 'export-merge-header',
    component: () => import('@/views/excel/merge-header'),
    name: 'MergeHeader',
    meta: {
      alias: 'Merge Header',
      title: '合并表头'
    }
  },
  {
    path: 'upload-excel',
    component: () => import('@/views/excel/upload-excel'),
    name: 'UploadExcel',
    meta: {
      alias: 'Upload Excel',
      title: '上传 Excel'
    }
  }
  ]
},

{
  path: '/zip',
  component: Layout,
  redirect: '/zip/download',
  alwaysShow: true,
  name: 'Zip',
  meta: {
    title: 'Zip',
    icon: 'zip'
  },
  children: [{
    path: 'download',
    component: () => import('@/views/zip/index'),
    name: 'ExportZip',
    meta: {
      alias: 'Export Zip',
      title: '导出 Zip'
    }
  }]
},

{
  path: '/pdf',
  component: Layout,
  redirect: '/pdf/index',
  children: [{
    path: 'index',
    component: () => import('@/views/pdf/index'),
    name: 'PDF',
    meta: {
      title: 'PDF',
      alias: 'PDF',
      icon: 'pdf'
    }
  }]
},
{
  path: '/pdf/download',
  component: () => import('@/views/pdf/download'),
  hidden: true
},

{
  path: '/theme',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/theme/index'),
    name: 'Theme',
    meta: {
      alias: 'Theme',
      title: '主题',
      icon: 'theme'
    }
  }]
},

{
  path: '/clipboard',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/clipboard/index'),
    name: 'ClipboardDemo',
    meta: {
      alias: 'Clipboard',
      title: '剪贴板',
      icon: 'clipboard'
    }
  }]
},

{
  path: 'external-link',
  component: Layout,
  children: [{
    path: 'https://github.com/PanJiaChen/vue-element-admin',
    meta: {
      alias: 'External Link',
      title: '外部链接',
      icon: 'link'
    }
  }]
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

// 创建路由
/**
 * 方法 创建路由
 */
const createRouter = () => new Router({
  // mode: 'history', // require service support

  scrollBehavior: () => ({
    // 期望滚动到哪个位置
    y: 0
  }),
  // 常量路由
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
/**
 * 方法重置路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
