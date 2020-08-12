<template>
  <div class="searchContent">
    <!-- 搜索导航 -->
    <div class="nav">
      <li v-for="(item,index) in nav" :key='index' class="navItem" :class="{'active' : item.type == type}" @click="toggle(item.type)">{{item.title}}</li>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      nav:[
        {title:'单曲',type:1},
        {title:'歌手',type:100},
        {title:'专辑',type:10},
        {title:'视频',type:1014},
        {title:'歌单',type:1000},
        {title:'用户',type:1002},
      ],
      
    }
  },
  
  props:{
    type:{
      type: Number,
      default: 1
    },
    keywords:{
      type:String
    }
  },
  methods:{
    toggle(type){
      this.$router.push({query:{keywords:this.keywords,type:type}})
    }
  },
  /* watch:{
    type(newv,oldv){
      console.log(newv,oldv)
    }
  } */
}
</script>

<style lang='less' scoped>
.searchContent{

  .nav{
    display: flex;
    
    .navItem{
      list-style: none;
      flex: 1;
      text-align: center;
      border-top: 2px solid #cecece;
      border-bottom: 1px solid #cecece;
      padding: 10px 0;
      font-size: 14px;
      cursor: pointer;
    }
    .navItem:hover{
      border-top: 2px solid #d13030;
      // border-bottom: none;
    }
    .navItem:first-child{
      border-left: 1px solid #cecece;
    }
    .navItem:last-child{
      border-right: 1px solid #cecece;
    }
    .active{
      border-top: 2px solid #d13030;
      border-bottom: none;
      border-left: 1px solid #cecece;
      border-right: 1px solid #cecece;
    }
  }
}
</style>