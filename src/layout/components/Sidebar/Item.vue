<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // Vue 推荐使用在绝大多数情况下使用 template 来创建你的 HTML。
  // 然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，
  // 这就是 render 函数，它比 template 更接近编译器。
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
