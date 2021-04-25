import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Game from "@/views/Game.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
