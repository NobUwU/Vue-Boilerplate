import Vue from 'vue'

import './serviceWorker'

import App from './App.vue'
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
