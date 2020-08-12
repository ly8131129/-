<template>
  <div class="playlistDetail" >
    <!-- 详情页信息 -->
    <div class="left fl">
      <img :src="playList.coverImgUrl" class="auto-img" alt="">
    </div>

    <div class="right fl" >
      <div class="head">{{playList.name}}</div>

      <div class="up" v-if="pageType == 'playList' && !!creator">
        <div><img :src="creator.avatarUrl" alt="" ></div>
        <div class="name">{{creator.nickname}}</div>
      </div>

      <div class="singer" v-if="pageType == 'album'">
        <p>歌手：{{playList.artistName}}</p>
        <p>发行时间：{{playList.publishTime | setDate('yyyy-MM-dd')}}</p>
        <p>发行公司：{{playList.company}}</p>
      </div>

      <div class="song" v-if='pageType == "song"'>
        <p>歌手：{{playList.artistName}}</p>
        <p>所属专辑{{playList.album}}</p>
      </div>

      <!-- 中间按钮 -->
      <div class="option">
        <li class="play" @click="playAll()" v-if='pageType != "song"'><div><i class="el-icon-video-play fa"></i>播放</div></li>

        <li class="play" @click="sendUrl(id,playList.name)" v-if='pageType == "song"'><div><i class="el-icon-video-play fa"></i>播放</div></li>
        

        <li v-if="pageType == 'playList'"><i class="el-icon-folder-add fa"></i>({{playList.playCount}})</li>
        <li v-if="pageType == 'album'">
          <i class="el-icon-folder-add fa"></i>收藏
        </li>
        

        <li v-if='pageType != "song"'><i class="fa fa-share-square-o"></i>({{playList.shareCount}})</li>
        <li v-else><i class="fa fa-share-square-o"></i>分享</li>


        <li><i class="el-icon-download fa"></i> 下载</li>
        <li><i class="fa-commenting-o fa"></i>({{playList.commentCount}})</li>
      </div>
      <div class="tags" v-if="pageType == 'playList'">
        <li v-for='(item,index) in playList.tags' :key='index'>{{item}}</li>
      </div>

      <!-- 文字部分 -->

      <div class="desc" v-if='pageType != "song" && playList.description'>
        <span>介绍：</span>
        <p >
          <span>{{desc}}</span>
          <span v-if='playList.description.length > 200 && !isShow'>...</span>
        </p>
        <div class="show" @click="toggleShow" v-if='playList.description.length > 200'><a href="javascript:;">{{isShow? "收起" : "展开"}}</a></div>
        
      </div>

      <div class="lyric" v-if='pageType == "song"'>
        <p v-for='(item,index) in lyric' :key='index'>{{item | lyric}}</p>
        <div class="show" @click="toggleShow" v-if="!!lyric[0]"><a href="javascript:;">{{isShow? "收起" : "展开"}}</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/playlistDetail.css'
let ids = []
  export default {
    created(){
      this.id = this.$route.query.id
    },
    
    data(){
      return{
        description:[],
        isShow:false,
        hasShow:false,

        id:''
      }
    },

   

    props:{
      playList:{
        type: Object
      },
      pageType:{
        type:String,
        default:'playList'
      },

      creator:{
        type:Object
      },
      lyric:{
        type:Array
      },

      desc:{
        type:String
      }
    },
    
    methods:{
      

      toggleShow(){
        if(this.isShow){
          this.isShow = false
        }else{
          this.isShow = true
        }
      },

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

      // 播放全部歌曲
      playAll(){
        let arr = []
        if(!!sessionStorage.getItem('songs')){
          arr = JSON.parse(sessionStorage.getItem('songs'))
          for(let i=arr.length-1; i>=0; i--){
            if(arr[i].current){
              arr[i].current = false
              break
            }
          }
          this.playList.tracks.forEach((e,index) =>{
            for(let i=arr.length-1; i>=0; i--){
              if(arr[i].id == e.id){
                arr.splice(i,1)
                break
              }
            }
          })
        }

        this.playList.tracks.forEach((e,i) =>{
          if(i==0){
            arr.push({id:e.id,name:e.name,current:true})
          }else{
            arr.push({id:e.id,name:e.name,current:false})
          }    
        })
        
        arr = JSON.stringify(arr)
        sessionStorage.setItem('songs',arr)
        this.$store.commit('resetSongs')
      }
    },

    
    watch:{
      isShow(newv,oldv){
        if(newv){
          this.$emit('changeText',newv)
        }else{
          this.$emit('changeText',newv)
        }
      }
    }

  }
</script>

<style lang="less" scoped>

</style>