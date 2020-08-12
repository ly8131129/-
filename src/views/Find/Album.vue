<template>
  <div class="album wrap" v-if="!!playList">
     <!-- 歌单详细信息 -->
    <detail :playList='playList' :pageType='"album"' :desc='desc' @changeText='changeDesc'/>
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
        url:'/album',
        params:{
          id: to.query.id
        }
      }).then(res1 =>{
        console.log('获取专辑',res1)
        $axios({
          method:'GET',
          url:'/album/detail/dynamic',
          params:{
            id: to.query.id
          }
        }).then(res2 =>{
          console.log('获取专辑信息',res2)
          next(vm =>{

            // 构建数据
            vm.playList = {}
            vm.album = res1.data.album
            vm.playList.tracks = res1.data.songs
            vm.playList.coverImgUrl = res1.data.album.blurPicUrl
            vm.playList.name = res1.data.album.name
            vm.playList.description = res1.data.album.description
            vm.playList.company = res1.data.album.company
            vm.playList.publishTime = res1.data.album.publishTime
            vm.playList.artistName = res1.data.album.artist.name
            vm.desc = vm.playList.description.substring(0,200)
            vm.playList.shareCount = res2.data.shareCount
            vm.playList.commentCount = res2.data.commentCount
          })
        }).catch(err =>{
          console.log('获取专辑失败',err)
          
        })
       
          
          
         /*  vm.playList.name = res.data.album.name
          vm.playList.playCount = res.data.album.
          vm.playList.description = res.data.album.description */
          // console.log(vm.album)

        
      }).catch(err =>{
        console.log('获取歌单失败',err)
        
      })

      
    },

    data(){
      return{
        playList:{
          coverImgUrl:'',
          name:'',
          shareCount:'',
          commentCount:'',
          description:'',
          company:'',
          publishTime:'',
          artistName:'',
        },

        album:{},

        desc:""

        
      }
    },

    components:{
      detail,
      songlist
    },

    methods:{
        // 显示描述
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
.album{
  padding: 50px 25px;
  width: 750px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
  // 歌单详细信息
  
}
</style>