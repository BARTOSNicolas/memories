import { createApp } from 'vue'
import router from "@/router";
import store from "./store/store";
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { IonicVue } from '@ionic/vue';

/* Component */
import App from './App.vue'
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Router */

const app = createApp(App)
    .provide('store', store)
  .use(IonicVue)
  .use(router)

router.isReady().then(() => {
  app.mount('#app');
});