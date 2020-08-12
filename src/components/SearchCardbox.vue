<template>
  <div class="cardbox">
    <!-- 搜索结果卡片 -->
    <searchCard :cardItem='item' v-for="(item,index) in list" :key='index' class="mycard"  />
  </div>
</template>

<script>
import searchCard from './SearchCard'
import {createNamespacedHelpers} from 'vuex'
const {mapState:ms} = createNamespacedHelpers('search')
  export default {
    
    data(){
      return{
        
      }
    },

    computed:{
      ...ms(['list'])
    },

    methods:{
      goDetail(name,id){
        this.$router.push({name:name,query:{id:id}})
      },
      
    },

    
    components:{
      searchCard
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