<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="home">
        <ion-button @click="playDifficult('easy')" color="success">Jouer Facile</ion-button>
        <ion-button @click="playDifficult('medium')" color="warning">Jouer Moyen</ion-button>
        <ion-button @click="playDifficult('hard')" color="danger">Jouer Difficile</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

import store from '@/store/store'

export default defineComponent({
  name: 'Home',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton
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
#home {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .button{
    width: 130px;
  }
}

</style>