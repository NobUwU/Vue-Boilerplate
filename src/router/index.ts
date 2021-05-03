import Vue from 'vue'
import VueRouter from 'vue-router'

import BlankLayout from '@/layouts/Blank.vue'

import NotFound from '@/pages/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: (): Promise<typeof import('*.vue')> => import('@/pages/Index.vue'),
  },
  {
    path: '*',
    name: '404',
    layout: BlankLayout,
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
