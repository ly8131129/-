<template>
  <!-- 分页栏 -->
  <div class="pagination" v-if="!!totalItem">
    <el-pagination
      layout="prev, pager, next"
      background
      :page-size='35'
      :current-page='page'
      :total="totalItem"
      @current-change='sendPage'
      ref="page">

    </el-pagination>
  </div>
</template>

<script>
  export default {
    props:{
      totalItem:{
        type:Number
      }
    },
    data(){
      return{
        page:""
      }
    },

    created(){
      this.page = Number(this.$route.query.page)
    },

    /* computed:{
      currentPage(){
        if(!!this.$route.query.offset){
          return this.$route.query.offset/35 + 1
        }else{
          return 1
        }
      }
    }, */
    methods:{
      sendPage(data){
        this.$emit('getPage',data)
      }
    }
  }
</script>

<style lang="less" scoped>
/deep/.el-pagination{
  background-color: #f5f5f5;
  ul{
    li:hover{
      color:#000!important;
    }
    .active{
      background-color: #d90e16!important;
    }
    .active:hover{
      color: #fff!important;
    }
    
  }
}
</style>