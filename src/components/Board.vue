<template>
  <div id="board" :class="setBoardWidth()">
    <cell v-for="(cell, id) of cells" :key="id" :cell="cell" :id="id"/>
  </div>
</template>

<script>
import store from '@/store/store'
import Cell from "@/components/Cell";

export default{
  name: "Board",
  components:{
    Cell
  },
  computed:{
    cells:{
      get(){
        return store.state.cells;
      },
      set(value){
        store.state.cells = value;
      }
    },
    difficult(){
      return store.state.difficult;
    }
  },
  methods:{
    createGame(nbrCase){
      this.cells = [];
      function setPlace(array, val){
        const rand =  Math.floor(Math.random() * val);
        array.splice(rand, 0, {
          id: "c"+val,
          revert: false,
          isWin: false
        })
      }
      for (let i = 0; i < nbrCase; i = i+2){
        setPlace(this.cells, i);
        setPlace(this.cells, i);
      }
    },
    setBoardWidth(){
      if(this.cells.length === 12){
        return "small";
      }else if(this.cells.length === 20){
        return "medium";
      }else{
        return "big";
      }
    }
  },
  mounted() {
    this.createGame(this.difficult);
  }
}
</script>

<style scoped lang="scss">
#board{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  &.small{
    max-width: 280px;
  }
  &.medium{
    max-width: 350px;
  }
  &.big{
    max-width: 560px;
  }
}
</style>