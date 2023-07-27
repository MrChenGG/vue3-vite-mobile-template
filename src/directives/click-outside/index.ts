export default {
  created() {},
  // 初始化指令
  mounted(el: any, binding: any, vnode: any) {
    function clickHandler(e: any) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (typeof binding.value === 'function') {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler
    document.addEventListener('click', clickHandler)
  },
  updated() {},
  unmounted(el: any) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
