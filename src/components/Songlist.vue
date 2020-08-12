<template>
  <div class="songlist" v-if="!!playList && playList.tracks">
      <!-- 头部信息 -->
        <div class="head">
          <div class="fl l">歌曲列表</div>
          <div class="fl m">{{playList.tracks.length}}首歌</div>
          <div class="fl fr r" v-if="playList.playCount">播放：<span>{{playList.playCount}}</span></div>
        </div>

        <div class="main">
          <div class="detail">
            <el-row>
              <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="11"><div class="grid-content bg-purple-light">标题</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">时长</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">歌手</div></el-col>
            </el-row>
          </div>

          <!-- 歌曲列表 -->
          <div class="list" >
            <el-row v-for="(item,index) in playList.tracks" :key='index' class="test" >
              <el-col :span="3"><div class="grid-content bg-purple index" :style='{textAlign : "right",}' >{{index + 1}}</div></el-col>

              <el-col :span="11" ><div class="grid-content bg-purple-light" ><i class="fa fa-play-circle-o" aria-hidden="true" @click='sendUrl(item.id,item.name)' :class="item.id == id ? 'active' : ''"></i>　<a href="javascript:;" @click="goDetail('Song',item.id)">{{item.name}}</a></div></el-col>

              <el-col :span="4"><div class="grid-content bg-purple">{{item.dt | dateTime}}</div></el-col>

              <el-col :span="6"><div class="grid-content bg-purple-light">{{item.ar[0].name}}</div></el-col>
            </el-row>
          </div>
        </div>
      </div>
</template>

<script>
import '../assets/css/songlist.css'
let ids = []

  export default {
    props:{
      playList:{
        type:Object
      }
    },

    methods:{
      // 修改vuex的songs
      sendUrl(id,name){
        let isAdd = true
        if(!!sessionStorage.getItem('songs')){
          ids = JSON.parse(sessionStorage.getItem('songs'))
          ids.forEach((e,i) =>{
            e.current = false
            if(e.id == id){
              e.current = true
              isAdd = false
            }
          })
        }
        if(isAdd){
          ids.push({id:id,name:name,current:true})
        }
        ids = JSON.stringify(ids)
        sessionStorage.setItem('songs',ids)
        this.$store.commit('resetSongs')
      },

      // 前往详情页
      goDetail(name,id){
        this.$router.push({name:name,query:{id:id}})
      }
     
    },
    data(){
      return{
        
      }
    },
    
    computed:{
      id(){
        return this.$store.state.id
      }
    }
    
  }
</script>

<style lang="less" scoped>

</style>