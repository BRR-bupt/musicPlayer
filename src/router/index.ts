import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../views/Library.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/User.vue'),
  },
  {
    path: '/trackslist/:id',
    name: 'trackslist',
    component: () => import('../views/Trackslist.vue'),
  },
  {
    path: '/artist/:id',
    name: 'artist',
    component: () => import('../views/Artist.vue'),
  },
  {
    path: '/album/:id',
    name: 'album',
    component: () => import('../views/Album.vue'),
  },
  {
    path: '/search/:keywords',
    name: 'search',
    component: () => import('../views/Search.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (!localStorage.getItem('cookie') && to.name === 'user')
    return { name: 'login' }
})

export default router
