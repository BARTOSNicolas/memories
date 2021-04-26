<template>
  <ion-page id="setting-page">
    <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>Settings</ion-title>
    </ion-toolbar>
  </ion-header>
    <ion-content :fullscreen="true">
      <div id="settings">
        <div class="select-card">
          <p>Choisi un dos de carte : </p>
          <img :src="`${publicPath}assets/cards/card-1.svg`" alt="" @click="setCardBG('card-1')" :class="card === 'card-1' ? 'active' : ''">
          <img :src="`${publicPath}assets/cards/card-2.svg`" alt="" @click="setCardBG('card-2')" :class="card === 'card-2' ? 'active' : ''">
          <img :src="`${publicPath}assets/cards/card-3.svg`" alt="" @click="setCardBG('card-3')" :class="card === 'card-3' ? 'active' : ''">
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { useRouter } from 'vue-router';
import { IonContent, IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons, IonTitle, } from '@ionic/vue';
import { defineComponent } from 'vue';

import store from '@/store/store';

export default defineComponent({
  name: "Settings",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons
  },
  data(){
    return{
      publicPath: process.env.BASE_URL
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  computed:{
    card:{
      get(){
        return store.state.card;
      },
      set(value){
        store.state.card = value;
      }
    }
  },
  methods:{
    setCardBG(card){
      this.card = card;
    }
  },
})
</script>

<style scoped lang="scss">
#settings{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #153138;
  .select-card{
    img{
      width: 64px;
      height: 64px;
      margin-right: 10px;
      border-radius: 4px;
      border: 2px solid transparent;
      &.active{
        border: 2px solid white;
      }
    }
  }
}
@media screen and (orientation: portrait) and (min-width: 768px){
  #settings{
    .select-card{
      p{
        font-size: 24px;
      }
      img{
        width: 120px;
        height: 120px;
      }
    }
  }
}

</style>
