<template>
<!-- 分类卡片盒子 -->
  <div class="cardbox">
    <card :songItem='item' v-for="(item,index) in song" :key='index' class="mycard" @click="goDetail('Playlist',item.id)"/>
  </div>
</template>

<script>
import card from './Card'
  export default {
    
    data(){
      return{
        
      }
    },

    props:{
      song:{
        type:Array
      }
    },


    methods:{
      goDetail(name,id){
        this.$router.push({name:name,query:{id:id}})
      },
      
    },

    components:{
      card
    }
  }
</script>

<style lang="less" scoped>
.cardbox{
  display: flex;
  flex-wrap: wrap;
  .mycard{
    float: left;
    margin-right: calc(~'(100% - 5 * 140px)/4');
    margin-top: 30px;
  }
  .mycard:nth-child(5n) {
  margin-right: 0;
}
}
</style>