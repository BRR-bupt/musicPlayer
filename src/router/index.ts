import { createRouter } from 'vue-router'
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
    path: '/playlistdetail/:id',
    name: 'playlistdetail',
    component: () => import('../views/PlaylistDetail.vue'),
  },
  {
    path: '/search/:keywords',
    name: 'search',
    component: () => import('../views/Search.vue'),
  },
]

export default function (history: any) {
  return createRouter({
    history,
    routes,
  })
}
