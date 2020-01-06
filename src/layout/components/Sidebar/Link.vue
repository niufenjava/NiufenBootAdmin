
<template>
  <!-- eslint-disable vue/require-component-is -->
  <!-- 绑定方法linkProps()，返回一个标签 -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    // vue-router to
    // 表示目标路由的链接。
    // 当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * 通过url获取router标签
     * @description 如果是外部链接，返回a标签；如果是内部链接，返回 vue-router标签router-link
     */
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
