/**
 * @user monkeywang
 * @author muwoo
 * Date: 2018/6/26
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/page/index').default
    }, {
      path: '/settings',
      name: 'settings',
      component: require('@/page/setting').default
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
