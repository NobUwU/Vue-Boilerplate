import Vue from 'vue'

import './ServiceWorker'

import App from './Index.vue'
import router from './router'
import store from './store'

import { VNode } from 'vue/types/umd'


new Vue({
  el: '#app',
  router, 
  store,
  render (h): VNode {
    return h(App)
  },
})
