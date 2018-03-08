// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)
Vue.use(VueResource)

Vue.config.productionTip = false

// SHAME: is this really necessary?
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
