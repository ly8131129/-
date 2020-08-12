<template>
  <div class="resultList">
    <!-- 列表结果 -->
    <resultListContent   v-if="type == 1 || type == 1000 || type == 1002"/>
    <!-- 图片结果 -->
    <searchcardbox  v-if="type == 100 || type == 10 || type == 1014 || type == 1009"  />
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapState:ms} = createNamespacedHelpers('search')
import '../assets/css/resultList.css'
import resultListContent from './ResultlistContent'
import searchcardbox from './SearchCardbox'
export default {

  components:{
    resultListContent,
    searchcardbox
  },

  

   computed:{
    ...ms(['keywords','type','list'])
  },
}
</script>

<style lang='less'  scoped>
.resultList{
  width: 100%;
}
</style>