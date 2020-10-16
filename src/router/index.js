import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sxlx/',
    name: 'sxlx',
    component: () => import('../views/sxlx.vue'),
    props: true
  },
  {
    path: '/zjlx/',
    name: 'zjlx',
    component: () => import('../views/zjlx.vue'),
    props: true
  },
  {
    path: '/zxlx/',
    name: 'zxlx',
    component: () => import('../views/zxlx.vue'),
    props: true
  },
  {
    path: '/sjlx/',
    name: 'sjlx',
    component: () => import('../views/sjlx.vue')
  },
  {
    path: '/fzmnks/',
    name: 'fzmnks',
    component: () => import('../views/fzmnks.vue')
  },
  {
    path: '/fzks/',
    name: 'fzks',
    component: () => import('../views/fzks.vue')
  },
  {
    path: '/ctb/',
    name: 'ctb',
    component: () => import('../views/ctb.vue')
  },
  {
    path: '/sc/',
    name: 'sc',
    component: () => import('../views/sc.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
