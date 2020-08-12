
<template>
  <div class="songlist wrap">
    <!-- 头部 -->
    <myheader>
      <template v-slot:title>
        <span>{{typeName}}</span>
      </template>

      <template v-slot:user-defined>
        <el-popover
          placement="top"
          width="600"
          trigger="click"
          
          >
          <!-- 导航 -->
          <classify @sendCat='getCat' />

          <el-button slot="reference" >选择分类 ∨</el-button>
        </el-popover>
      </template>

    </myheader>

    <!-- 显示主体内容 -->
    <cardbox :song='song'/>

    <!-- 分页 -->
    <pagination :totalItem='totalItem' @getPage='getPage'/>
  </div>
</template>

<script>
import myheader from '../../components/Header'
import classify from '../../components/Classsssify'
import cardbox from '../../components/Cardbox'
import pagination from '../../components/Pagination'
import $axios from 'axios'
  export default {
    beforeRouteEnter(to,from,next){
      
      $axios({
        method:'GET',
        url:'/top/playlist',
        params:{
          limit:35,
          offset: to.query.page ? (to.query.page - 1) * 35 : 0,
          cat: to.query.cat ? to.query.cat : ""
        }
      }).then(res =>{
        console.log('res ===>',res)
        next(vm =>{
          vm.song = res.data.playlists
          vm.totalItem = res.data.total
          console.log(vm.song,vm.totalItem)
        })
        
      }).catch(err =>{
        console.log('err ==>',err)
        next(false)
      })
      
    },

    data(){
      return{
        totalItem:0,
        song:[],
        typeName: this.$route.query.cat ? this.$route.query.cat : '全部分类'
      }
    },
    methods:{
      //获取歌单类型
      getCat(data){
        this.$router.push({query:{cat:data}})
        this.$router.go(0)
      },

      // 获取路由跳转信息
      getPage(data){
        if(!!this.$route.query.cat){
          this.$router.push({query:{page:data,cat:this.$route.query.cat}})
        }else{
          this.$router.push({query:{page:data}})
        }
        this.$router.go(0)
      },

      //获取热门歌单
      getTopPlaylist(page,cat){
        this.axios({
          method:'GET',
          url:'/top/playlist',
          params:{
            limit:35,
            offset: (page - 1) * 35,
            cat: cat
          }
        }).then(res =>{
          console.log('res ===>',res)
          this.song = res.data.playlists
          this.totalItem = res.data.total
        }).catch(err =>{
          console.log('err ==>',err)
        })
      }
    },

   /*  watch:{
      $route(nValue,oValue){
        if(nValue.query.page != oValue.query.page && nValue.query.cat == oValue.query.cat){
          this.getTopPlaylist(nValue.query.page,nValue.query.cat)
        }
        if(nValue.query.cat != oValue.query.cat){
          this.getTopPlaylist(1,nValue.query.cat)
          this.typeName = nValue.query.cat
        }
      }
    }, */


    components:{
      myheader,
      classify,
      cardbox,
      pagination
    }
  }
</script>

<style lang="less" scoped>
.songlist{
  padding-bottom: 200px;
  .pagination{
    margin:  20px auto;
    text-align: center;
  }
}
</style>