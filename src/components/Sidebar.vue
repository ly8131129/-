<template>
  <!-- 排行榜侧边栏 -->
    <div class="fl sideBar">
      <!-- 上半部分 -->
      <div class="type">
        <div class="text">
          {{sideList[0].title}}
        </div>
        <div class="list_box">
          <li class="list" v-for="(item,index) in sideList[0].data" :key='index' @click="toggleRank(item.id)" :class='{"active" : item.id == id} '>
            <div class="image">
              <img :src="item.coverImgUrl" alt="" class="auto-img">
            </div>
            <div class="list_text">
              <p>{{item.name}}</p>
            </div>
          </li>
        </div>
      </div> 

      <!-- 下半部分 -->
      <div class="type">
        <div class="text">
          {{sideList[1].title}}
        </div>
        <div class="list_box">
          <li class="list" v-for="(item,index) in sideList[1].data" :key='index' @click="toggleRank(item.id)" :class='{"active" : item.id == id}'>
            <div class="image">
              <img :src="item.coverImgUrl" alt="" class="auto-img">
            </div>
            <div class="list_text">
              <p>{{item.name}}</p>
            </div>
          </li>
        </div>
      </div> 
    </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },

  props:{
    sideList:{
      type:Array
    }
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },

  methods:{
      
    //切换榜单
    toggleRank(id){
      
      this.$router.push({query:{id:id}})
    }
  },
}
</script>

<style lang='less' scoped>


.sideBar{
  width: 25%;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  .type{
    margin-bottom: 20px;
    .text{
      font-size: 16px;
      padding: 10px 0px 10px 20px;
      font-weight: bold;
    }
    .list_box{
      cursor: pointer;
      .list{
        overflow: hidden;
        list-style: none;
        padding: 5px 0px 5px 20px;
        
        div{
          float: left;
        }
        .image{
          display: block;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        .list_text{
          line-height: 40px;
          p{
            font-size: 14px;
          }
        }
      }

      .list:hover{
        background-color: #e8e8e8;
      }
      .active{
        background-color: #e8e8e8;
      }
    }
  }
}
</style>