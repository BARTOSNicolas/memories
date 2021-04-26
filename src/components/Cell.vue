<template>
  <div class="cell" v-on="click && !isWin ? { click: verifyPair } : {}" :class="[isRevert ? 'revert' : '', isWin ? 'win' : '']" ref="card">
    <div class="front"><img :src="cardImage" alt="memory card back"></div>
    <div class="back" ref="cardBack"><img :src="image" alt="memory card picture"></div>
  </div>
</template>

<script>
import store from '@/store/store'

export default {
  name: "Cell",
  props:["id"],
  data(){
    return{
      publicPath: process.env.BASE_URL
    }
  },
  computed:{
    card(){
      return store.state.card
    },
    cardImage(){
      return this.publicPath+"assets/cards/"+store.state.card+".svg";
    },
    cell(){
      return store.state.cells[this.id];
    },
    image(){
      return this.publicPath+"assets/animal-flat/"+ store.state.cells[this.id].id +".svg";
    },
    clickToWin:{
      get(){
        return store.state.clickToWin;
      },
      set(val){
        store.state.clickToWin = val
      }
    },
    click:{
      get(){
        return store.state.click;
      },
      set(value){
        store.state.click = value;
      }
    },
    isWin:{
      get(){
        return store.state.cells[this.id].isWin;
      },
      set(val){
        store.state.cells[this.id].isWin = val;
      }
    },
    isRevert:{
      get(){
        return store.state.cells[this.id].revert;
      },
      set(val){
        store.state.cells[this.id].revert = val;
      }
    },
    verify:{
      get(){
        return store.state.verify;
      },
      set(value){
        store.state.verify = value;
      }
    },
  },
  methods:{
    verifyPair() {
      if (!store.state.isWin && !this.isRevert) {
        this.isRevert = true;
        this.clickToWin++;
        this.verify.push(this.cell);
        if (this.verify.length === 2) {
          this.click = false;
          if (this.verify[0].id === this.verify[1].id) {
            console.log('Win');
            setTimeout(() => {
              this.isRevert = true;
              this.isWin = true;
              setTimeout(()=>{
                this.click = true;
              },50)
              store.state.cells.forEach(cell => {
                if (cell === this.verify[0]) {
                  cell.isWin = true;
                }
              })
              this.verify = [];
            }, 500)
          } else {
            setTimeout(() => {
              console.log('Lose');
              setTimeout(()=>{
                this.click = true;
              },50)
              store.state.cells.forEach(cell => {
                if (cell === this.verify[0]) {
                  cell.revert = false;
                }
              })
              this.isRevert = false;
              this.verify = [];
            }, 1000)
          }
        }
        let winTotal = 0;
        for (const cell of store.state.cells) {
          if (cell.revert) {
            winTotal++;
            if (winTotal === store.state.cells.length) {
              store.state.isWin = true;
              console.log("c'est gagné");
            }
          }
        }
      }
    },
    checkCard(){
      if(this.card === "card-1"){
        this.$refs.card.style.border = "solid 2px #4FB5D2"
      }else if(this.card === "card-2"){
        this.$refs.card.style.border = "solid 2px #cd5257"
        this.$refs.cardBack.style.backgroundColor = "#911d22"
      }else if(this.card === "card-3"){
        this.$refs.card.style.border = "solid 2px #eec687"
        this.$refs.cardBack.style.backgroundColor = "#c58511"
      }
    }
  },
  mounted(){
    this.checkCard()
  }
}
</script>

<style scoped lang="scss">
@import "../theme/myVariable";
.cell{
  position: relative;
  width: 100%;
  height: 100%;
  border: solid 2px $my-secondary;
  border-radius: 8px;
  background: linear-gradient(45deg, rgba(31,71,82,1) 0%, rgba(79,181,209,1) 50%, rgba(55,126,145,1) 100%);
  transition: 500ms;
  perspective: 1000px;
  transform: rotateY(180deg);
  transform-style: preserve-3d;
  .front, .back{
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateX(0deg)
  }
  .front{
    transform: rotateY(180deg);
    background-color: $my-secondary;
    img{
      width: 100%;
      border-radius: 4px;
    }
  }
  .back{
    text-transform: uppercase;
    background-color: darken($my-secondary, 33%);
    transition: 500ms;
    img{
      width: 100%;
    }
  }
  &.revert{
    border: solid 2px $my-secondary;
    transform: rotateY(0deg);
  }
  &.win{
    border: solid 2px #FBF5B7!important;
    box-shadow: 0 0 8px #FBF5B7;
    .back{
      background: linear-gradient(-45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
    }
  }

}


</style>
