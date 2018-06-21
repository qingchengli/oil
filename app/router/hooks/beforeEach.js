import store from '@/store'
export default (to, from, next) => {
  /* 路由发生变化，检查语言设置参数 */
  let lang = localStorage.language || 'cn'
  if (!to.params.lang) {
    if (to.fullPath === '/') {
      next(`/${lang}/login`)
    } else {
      next(`/${lang}/${to.fullPath}`)
    }
  } else if (store.state.lang.language_list.indexOf(to.params.lang) === -1) {
    store.dispatch('setLanguage', 'cn')
    let oldUrl = to.fullPath
    let newUrl = () => {
      let paths = oldUrl.split('/')
      paths[1] = lang
      return paths.join('/')
    }
    console.log(newUrl)
    next(newUrl)
  } else {
    next()
  }
}
