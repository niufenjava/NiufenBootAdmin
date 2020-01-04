/**
 * 用于生成页面标题的方法
 * */

// 导入默认配置文件
import defaultSettings from '@/settings'
// 设置标题
const title = defaultSettings.title || 'Vue Element Admin'
// 动态页面生成标题方法
export default function getPageTitle(pageTitle) {
  // 如果页面标题存在
  if (pageTitle) {
    // 标题拼接 当前页面 - 默认标题
    return `${pageTitle} - ${title}`
  }
  // 如果不存在，那么还是配置文件中的title
  return `${title}`
}
