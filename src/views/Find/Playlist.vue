<template>
  <div class="playlist wrap">
     <!-- 歌单详细信息 -->
    <detail :playList='playList' :creator='playList.creator' :desc='desc' @changeText='changeDesc'/>
    
    <!-- 歌曲列表 -->
    <songlist :playList='playList'/>
  </div>
</template>

<script>
import detail from '../../components/PlaylistDetail'
import songlist from '../../components/Songlist'
import $axios from 'axios'
  export default {
    beforeRouteEnter(to,from,next){
      $axios({
        method:'GET',
        url:'/playlist/detail',
        params:{
          id: to.query.id
        }
      }).then(res =>{
        console.log('获取歌单',res)
        next(vm =>{
          vm.playList = res.data.playlist
          vm.desc = vm.playList.description.substring(0,200)
        })
      }).catch(err =>{
        console.log('获取歌单失败',err)
        
      })
    },

    data(){
      return{
        playList:{},
        desc:""
        
      }
    },

    components:{
      detail,
      songlist
    },

    methods:{
      // 简介展开 收起
      changeDesc(bool){
            if(bool){
                this.desc = this.playList.description
            }else{
                this.desc = this.playList.description.substring(0,200)
            }
        }
    }

   
  }
</script>

<style lang="less" scoped>
.playlist{
  padding: 50px 25px;
  width: 750px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
  // 歌单详细信息
  
}
</style>