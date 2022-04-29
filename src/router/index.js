import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Board from '@/views/Board'

/* import Auth from '@/components/views/Auth'
import Board from '@/components/Board' */

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board/:id', name: 'board', component: Board, props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
