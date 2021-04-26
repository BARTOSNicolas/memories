<template>
  <ion-page id="home-page">
    <ion-content :fullscreen="true">

      <div id="home">
        <ion-avatar @click="router.push({name: 'Settings'})">
          <img src="assets/icon/settings-sharp.svg" alt="memory card back">
        </ion-avatar>
        <ion-button @click="playDifficult('easy')" color="success">Jouer Facile</ion-button>
        <ion-button @click="playDifficult('medium')" color="warning">Jouer Moyen</ion-button>
        <ion-button @click="playDifficult('hard')" color="danger">Jouer Difficile</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { IonContent, IonPage, IonButton, IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';

import store from '@/store/store'

export default defineComponent({
  name: 'Home',
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonAvatar

  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods:{
    playDifficult(diff){
      if(diff === 'easy'){
        store.state.difficult = 12;
      }else if(diff === "medium"){
        store.state.difficult = 20;
      }else if (diff === 'hard'){
        store.state.difficult = 32;
      }
      store.state.clickToWin = 0;
      store.state.isWin = false;
      store.state.click = true;
      this.router.push({name: "Game"});
    }
  }

});
</script>

<style scoped lang="scss">
@import '../theme/myVariable';
ion-avatar{
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 32px;
  width: 32px;
}
#home {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #153138;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  .button{
    width: 200px;
    height: 60px;
    font-weight: bold;
    margin-bottom: 15px;
  }
}
@media screen and (orientation: portrait) and (min-width: 768px){
  ion-avatar{
    width: 64px;
    height: 64px;
  }
  #home .button{
    width: 250px;
    height: 100px;
    margin-bottom: 20px;
  }
}
@media screen and (orientation: landscape) and (min-width: 1024px){
  #home .button{
    width: 250px;
    height: 100px;
    margin-bottom: 20px;
  }
}

</style>
