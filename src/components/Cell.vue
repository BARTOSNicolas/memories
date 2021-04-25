<template>
  <div class="cell" v-on="click && !isWin ? { click: verifyPair } : {}" :class="[isRevert ? 'revert' : '', isWin ? 'win' : '']">
    <div class="front"></div>
    <div class="back"><img :src="image" alt="memory card picture"></div>
  </div>
</template>

<script>
import store from '@/store/store'

export default {
  name: "Cell",
  props:["id"],
  computed:{
    cell(){
      return store.state.cells[this.id];
    },
    image(){
      return "./assets/animal-flat/"+ store.state.cells[this.id].id +".svg";
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
      if (!store.state.isWin) {
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
            }, 1000)
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
  },
}
</script>

<style scoped lang="scss">
.cell{
  position: relative;
  width: 60px;
  height: 60px;
  border: solid 2px #7974ff;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: darken(#7974ff, 70%);
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
  }
  .front{
    background-color: darken(#7974ff, 70%);
  }
  .back{
    text-transform: uppercase;
    background-color: #7974ff;
    color: darken(#7974ff, 70%);
    img{
      width: 100%;
    }
  }
  &.revert{
    box-shadow: 0 0 15px #7974ff;
    transform: rotateY(0deg);
  }
  &.win{
    background-color: #7974ff;
  }
}

</style>