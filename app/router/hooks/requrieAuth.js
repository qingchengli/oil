export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let lang = localStorage.language || 'cn'
    if (localStorage.logged != undefined) {
      if (JSON.parse(localStorage.logged)) {
        next()
      } else {
        next(`/${lang}/login`)
      }
    } else {
      next(`/${lang}/login`)
    }
  } else {
    next()
  }
}
