<template>
  <ion-page id="game-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Play Game</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="game">
        <board/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {useRouter} from "vue-router";
import store from '@/store/store';
import Board from "@/components/Board";
import { IonContent, IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons, IonTitle, alertController } from '@ionic/vue';
export default defineComponent({
  name: "Game",
  components:{
    Board,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  computed:{
    isWin(){
      return store.state.isWin;
    },
    clickToWin(){
      return store.state.clickToWin;
    }
  },
  watch:{
    isWin(){
      setTimeout(()=>{
        this.winAlert()
      }, 1500)

    }
  },
  methods:{
    async winAlert() {
      const alert = await alertController
          .create({
            cssClass: 'win-alert',
            header: "C'est Gagné",
            subHeader: 'Vous avez gagné.',
            message: 'Vous avez réussi en '+Math.round(this.clickToWin/2)+' coups',
            buttons: ['OK'],
          });
      await alert.present();

      await alert.onDidDismiss();
      await this.router.replace({name: "Home"})
    },
  }
})
</script>

<style scoped lang="scss">
@import '../theme/myVariable';

#game{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: darken($my-secondary, 50%);
}
</style>
