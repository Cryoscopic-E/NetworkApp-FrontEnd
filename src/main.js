// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import Main from './components/layouts/Main.vue'
import vueIO from 'vue-socket.io';
import VueChatScroll from 'vue-chat-scroll'

import {
  store
} from './store/store'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueChatScroll)
Vue.use(VueRouter)
Vue.use(new vueIO({
  debug: true,
  connection: 'http://127.0.0.1:4000',
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}));
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'project',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: {
    Main
  },
  template: '<Main/>'
})
