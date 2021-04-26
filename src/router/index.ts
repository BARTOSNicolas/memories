import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Game from "@/views/Game.vue";
import Settings from '@/views/Settings.vue'

const routes: Array<RouteRecordRaw> = [

    {
        path: '/',
        redirect: {name: "Home"}
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/game',
        name: 'Game',
        component: Game
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: {name: "Home"}
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
