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
        return "easy";
      }else if(this.cells.length === 20){
        return "medium";
      }else{
        return "hard";
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
  display: grid;
  grid-gap: 10px;
  &.easy{
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(3, 90px);
  }
  &.medium{
    grid-template-columns: repeat(5, 70px);
    grid-template-rows: repeat(4, 70px);
  }
  &.hard{
    grid-template-columns: repeat(8, 70px);
    grid-template-rows: repeat(4, 70px);
  }
}
@media screen and (orientation: portrait) and (max-height: 570px)  {
  #board {
    &.easy{
      grid-template-columns: repeat(3, 80px);
      grid-template-rows: repeat(4, 80px);
    }
    &.medium{
      grid-template-columns: repeat(4, 60px);
      grid-template-rows: repeat(5, 60px);
    }
    &.hard {
      grid-template-columns: repeat(4, 50px);
      grid-template-rows: repeat(8, 50px);
    }
  }
}

@media screen and (orientation: portrait) and (min-height: 570px)  {
  #board {
    &.easy{
      grid-template-columns: repeat(3, 80px);
      grid-template-rows: repeat(4, 80px);
    }
    &.medium{
      grid-template-columns: repeat(4, 60px);
      grid-template-rows: repeat(5, 60px);
    }
    &.hard {
      grid-template-columns: repeat(4, 50px);
      grid-template-rows: repeat(8, 50px);
    }
  }
}
@media screen and (orientation: portrait) and (min-width: 500px)  {
  #board {
    grid-gap: 15px;
    &.easy{
      grid-template-columns: repeat(3, 120px);
      grid-template-rows: repeat(4, 120px);
    }
    &.medium{
      grid-template-columns: repeat(4, 120px);
      grid-template-rows: repeat(5, 120px);
    }
    &.hard {
      grid-template-columns: repeat(4, 100px);
      grid-template-rows: repeat(8, 100px);
    }
  }
}
@media screen and (orientation: landscape) and (max-width: 812px)  {
  #board {
    grid-gap: 15px;
    &.easy{
      grid-template-columns: repeat(4, 80px);
      grid-template-rows: repeat(3, 80px);
    }
    &.medium{
      grid-template-columns: repeat(5, 60px);
      grid-template-rows: repeat(4, 60px);
    }
    &.hard {
      grid-template-columns: repeat(8, 60px);
      grid-template-rows: repeat(4, 60px);
    }
  }
}
@media screen and (orientation: landscape) and (min-width: 1024px)  {
  #board {
    grid-gap: 20px;
    &.easy{
      grid-template-columns: repeat(4, 120px);
      grid-template-rows: repeat(3, 120px);
    }
    &.medium{
      grid-template-columns: repeat(5, 120px);
      grid-template-rows: repeat(4, 120px);
    }
    &.hard {
      grid-template-columns: repeat(8, 100px);
      grid-template-rows: repeat(4, 100px);
    }
  }
}
</style>
