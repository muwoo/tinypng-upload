import Vue from 'vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import App from './App'

Vue.use(iView)

Vue.config.productionTip = false
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
