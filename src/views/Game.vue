<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Game</ion-title>
        </ion-toolbar>
      </ion-header>

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
      this.winAlert()
    }
  },
  methods:{
    async winAlert() {
      const alert = await alertController
          .create({
            cssClass: 'win-alert',
            header: "C'est Gagné",
            subHeader: 'Vous avez gagné.',
            message: 'Vous avez réussi en '+this.clickToWin+' coups',
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
#game{
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  padding-top: 10px;
}

</style>