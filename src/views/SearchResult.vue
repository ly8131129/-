<template>
  <div class="serachResult">
    <div class="wrap">
      <div class="top">
        <!-- 搜索框 -->
        <search :isResult='false' class="fl" :inpValue='keywords'>
          <template v-slot:icon>
            <button class="fl"><img src="../assets/images/search_large.png" alt=""></button>
          </template>
        </search>
      </div>

      <div class="bottom">
        <!-- 搜索导航栏 -->
        <searchContent :keywords='keywords' :type='type'/>

        <!-- 搜索内容 -->
        <resultList :list='list' :type='type'/>
      </div>
    </div>
  </div>
</template>

<script>
import $axios from 'axios'
import search from '../components/Search'
import searchContent from '../components/SearchContent'
import resultList from '../components/Resultlist'

import {createNamespacedHelpers} from 'vuex'
const {mapState:ms} = createNamespacedHelpers('search')
export default {
  beforeRouteEnter(to,from,next){
    $axios({
      method:'GET',
      url:'/search',
      params:{
        keywords: to.query.keywords,
        type: to.query.type,
        limit:20
      }
    }).then(res =>{
      console.log('搜索结果',res)
      next(vm =>{
        vm.$store.commit('search/getKey',to.query.keywords)
        vm.$store.commit('search/getType',Number(to.query.type))
        
        let key = ''
        switch(Number(to.query.type)){
          case 1:
            key = 'songs'
            break;
          case 10:
            key = 'albums'
            break;
          case 100:
            key = 'artists'
            break;
          case 1014:
            key = 'videos'
            break;
          case 1006:
            key = 'songs'
            break;
          case 1000:
            key = 'playlists'
            break;
          case 1009:
            key = 'djRadios'
            break;
          case 1002:
            key = 'userprofiles'
            break;
        }
        vm.$store.commit('search/getList',res.data.result[key])
      })
    }).catch(err =>{
      console.log('搜索失败')
      next(false)
    })
  },

  beforeRouteUpdate(to,from,next){
    $axios({
      method:'GET',
      url:'/search',
      params:{
        keywords: to.query.keywords,
        type: to.query.type,
        limit:20
      }
    }).then(res =>{
      console.log('搜索结果',res)
      next()
      /* this.keywords = to.query.keywords
      this.type = to.query.type */
      this.$store.commit('search/getKey',to.query.keywords)
      this.$store.commit('search/getType',Number(to.query.type))
      let key = ''
        switch(Number(to.query.type)){
          case 1:
            key = 'songs'
            break;
          case 10:
            key = 'albums'
            break;
          case 100:
            key = 'artists'
            break;
          case 1014:
            key = 'videos'
            break;
          case 1006:
            key = 'lyrics'
            break;
          case 1000:
            key = 'playlists'
            break;
          case 1009:
            key = 'djRadios'
            break;
          case 1002:
            key = 'userprofiles'
            break;
        }
        // this.list = []
        this.$store.commit('search/getList',res.data.result[key])
    }).catch(err =>{
      console.log('搜索失败')
      next(false)
    })
  },

  data(){
    return{
      
      
    }
  },
  computed:{
    ...ms(['keywords','type','list'])
  },

  components:{
    search,
    searchContent,
    resultList
  },

  methods:{
    
  }
}
</script>

<style lang='less' scoped>
.serachResult{
  .wrap{
    background-color: #fff;
    padding: 100px 30px 0 30px;
    box-sizing: border-box;
  }
  .top{
    .search{
      width: 402px;
      margin: 0 auto;
      position: relative;
      
      /deep/.input_box{
        width: 100%;
        border-radius: 7px;
        height: 42px;
        border: 1px solid #cecece;
        margin: 0;
        padding: 0;
        /deep/input{
          text-indent: 2em;
          width: 360px;
          float: left;
          border-radius: 7px;
        }
      }

      /deep/.result{
        top: 50px;
        width: 350px;
      }
    }

    button{
      width: 40px;
      height: 40px;
      border: 1px solid #cecece;
      outline: none;
      float: left;
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
      img{
        display: block;
        width: 100%;
      }
    }
    

    
  }

  .bottom{
    margin-top: 50px;
  }
  /deep/.hightLight{
    color: red;
  }
}
</style>