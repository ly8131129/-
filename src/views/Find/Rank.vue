<template>
  <div class="rank wrap">

    <!-- 侧边栏 -->
    <sidebar :id='id' :sideList='sideList'/>
    <!-- 主体内容 -->
    <div class="fl content">
      <!-- 详细信息 -->
      <detail :playList='content' :creator='content.creator'/>
      <!-- 歌曲列表 -->
      <songlist :playList='content'/>
    </div>
  </div>
</template>

<script>
import $axios from 'axios'
import '../../assets/css/rank.css'
import sidebar from '../../components/Sidebar'
import detail from '../../components/PlaylistDetail'
import songlist from '../../components/Songlist'



  export default {
    data(){
      return{
        content:{},
        id:0,
        sideList:[
          {title:'云音乐特色榜',data:[]},
          {title:'云音乐媒体榜',data:[]},
        ],
      }
    },
    // 路由器前获取数据
    beforeRouteEnter(to,from,next){
      if(!to.query.id){
        to.query.id = 19723756
      }
      $axios({
        method:'GET',
        url:'/toplist'
      }).then(result =>{

        $axios({
          method:'GET',
          url:'/playlist/detail',
          params:{
            id:to.query.id,
          }
        }).then(res =>{
          console.log("飙升榜",res)
          next(vm =>{
            vm.content = res.data.playlist
            // 切割上下部分
            vm.sideList[0].data = result.data.list.slice(0,4)
            vm.sideList[1].data = result.data.list.slice(4)
            })
          
        }).catch(err =>{
          console.log('err==>',err)
          next(false)
        })
        
      }).catch(err =>{
        console.log('err==>',err)
        next(false)
      })

      
    },

    // 路由更新
    beforeRouteUpdate(to,from,next){
      this.axios({
          method:'GET',
          url:'/playlist/detail',
          params:{
            id:to.query.id
          }
        }).then(res =>{
          console.log('切换榜单',res)
          this.content = {}
          this.content = res.data.playlist
          next()
        }).catch(err =>{
          console.log('获取榜单失败',err)
          next(false)
        })
    },

    components:{
      detail,
      songlist,
      sidebar
    }

  }
</script>

<style lang="less" scoped>

</style>