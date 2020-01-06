// 系统全局配置文件
module.exports = {

  /**
   * @description 设置当前窗口标题
   */
  title: 'XXXX管理系统',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   * @description 是否显示左侧全局设置面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   * @description 是否需要横向标签列表
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   * @description 是否固定 Header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   * @description 是否显示 Logo
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   * @description 需要显示err日志组件。
   * 默认值只在生产环境中使用如果你想在dev中使用它，
   * 你可以传递['production'， 'development']
   */
  errorLog: 'production'
}
