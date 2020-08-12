<template>
  <div class="recommend">

    <!-- 轮播图 -->
    <div class="banner wrap">
      <el-carousel trigger="click" height="340px">
        <el-carousel-item v-for="(item,index) in banner" :key="index">
          <img :src="item.url" alt="" class="auto-img">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 主要内容 -->
    <div class="main wrap">
      <!-- 左侧内容 -->
      <div class="main_left fl">
        <!-- 热门推荐 -->
        <div class="hot">
          <!-- 标签 -->
          <div class="top">
            <span class="fl title">热门推荐</span>
            <ul class="hotItem_box fl">
              <li class="hotItem fl" v-for='(item,index) in playlist' :key='index'><a href="javascript:;">{{item.name}}</a></li>
            </ul>
          </div>

          <!-- 单元格内容 -->

          <div class="bottom">
            <div class="grid" v-for="(item,index) in hot" :key='index'>

              <div class="image" @click="goDetail('Playlist',item.id)">
                <img :src="item.url" alt="" class="auto-img">
                <div class="b_text">
                  <i class="el-icon-headset"></i>
                    {{item.count}}
                  <span class="play"><i class="el-icon-video-play"></i></span>
                </div>
              </div>

              <div class="text">{{item.name}}</div>

            </div>
          </div>
        </div>

        <!-- 新碟上架 -->
        <div class="newCD">

          <!-- 标题 -->
          <div class="top">
            <span class="title">新碟上架</span>
          </div>

          <!-- 内容 -->
          <div class="bottom">
            <div class="banner">
              <el-carousel trigger="click" height="200px" :autoplay='false' arrow='always' >
                <el-carousel-item>
                  <!-- 轮播图卡片内容 -->
                  <div class="grid" v-for="(item,index) in newCD.card1" :key='index' @click="goDetail('Album',item.id)">
                    <img :src="item.url" alt="" class="auto-img">
                    <div class="text">
                      <p>{{item.name}}</p>
                      <p>{{item.singer}}</p>
                    </div>
                  </div>
                </el-carousel-item>

                <el-carousel-item >
                  <div class="grid" v-for="(item,index) in newCD.card2" :key='index' @click="goDetail('Album',item.id)">
                    <img :src="item.url" alt="" class="auto-img">
                    <div class="text">
                      <p>{{item.name}}</p>
                      <p>{{item.singer}}</p>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>

        <!-- 榜单 -->
        <div class="rank">
          <div class="top">
            <span class="title">榜单</span>
          </div>

          <div class="bottom">
            <div class="rankList" v-for='(item,index) in rankList' :key="index">

              <div class="picCover">
                <div class="fl left image">
                  <img :src="item.url" alt="" class="auto-img">
                </div>
                <div class="fl right text">{{item.name}}</div>
              </div>
              
              <ul class="list_box" >
                <li class="list" v-for='(item1,index1) in item.data' :key='index1' @click="goDetail('Song',item1.id)">
                  <span class="index">{{index1+1}}</span>　{{item1.name}}
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="main_right fl">
        <!-- 用户信息 -->
        <div class="userInfo"></div>

        <!-- 入驻歌手 -->
        <div class="singer">
          <div class="head">
            <span class="left">热门主播</span>
            <span class="right">查看全部</span>
          </div>

          <div class="info">
            <li class="list" v-for='(item,index) in singerList' :key='index'>
              <img :src="item.avatarUrl" alt="">
              <div class="text">
                {{item.nickName}}
              </div>
            </li>
          </div>
        </div>

        <!-- 热门主播 -->
        <div class="hot_anchor">
          <div class="head"></div>
          <div class="info"></div>
        </div>
      </div>
    </div>

    
    <router-view></router-view>
  </div>

</template>

<script>
import '../../assets/css/recommend.css'
import player from '../../components/Player'
  export default {
     data() {
      return {
        /* navBar: [
          { title: "发现音乐", path: "Find" },
          { title: "我的音乐", path: "My" },
          { title: "朋友", path: "Friend" },
          { title: "音乐人", path: "Singer" }
        ],
        activeIndex: "1",
        sec_nav: [
          { title: "推荐", isActive: true ,pathName:'Find'},
          { title: "排行榜", isActive: false ,pathName:'Rank'},
          { title: "歌单", isActive: false ,pathName:''},
          { title: "主播电台", isActive: false ,pathName:''},
          { title: "歌手", isActive: false,pathName:''},
          { title: "新碟上架", isActive: false ,pathName:''}
        ], */

        banner:[],

        playlist:[],

        hot:[],

        newCD:{
          card1:[],
          card2:[]
        },
        rankList:[],

        singer:[],
        songUrl:''
      };
    },

    components:{
      player
    },

    created() {
      /* this.navBar.forEach((e, index) => {
        if (window.location.href.indexOf(e.path) > -1) {
          this.activeIndex = index + 1 + "";
        }
      }); */

      this.getBanner()
      this.getPlaylist()
      this.getHot()
      this.getCD()
      this.getRank()
      this.singerList()
    },

    methods: {
      goPath(path) {
        this.$router.push({ name: path });
      },


      //  切换二级标签
      toggle(item,name){
        for( let i=0; i<this.sec_nav.length; i++){
          if(this.sec_nav[i].isActive){
            this.sec_nav[i].isActive = false
            break;
          }
        }
          item.isActive = true
          this.$router.push({name:name})
      },

      // 获取轮播图数据
      getBanner(){
        this.axios({
          method:'GET',
          url:'/banner',
          params:{
            type:0
          }
        }).then(res =>{
          console.log('res ==>',res)
          if(res.data.code == 200){
            res.data.banners.forEach(e =>{
              this.banner.push({url:e.imageUrl})
            })
            console.log(this.banner)
          }
        }).catch(err =>{
          console.log('err==>', err)
        })
      },

      // 热门标签
      getPlaylist(){
        this.axios({
          method:'GET',
          url:'/playlist/hot',
          
        }).then(res =>{
          console.log('res==>',res)
          if(res .data.code == 200){
            for( let i=0; i<5; i++){
              this.playlist.push({name:res.data.tags[i].name})
            }
            console.log(this.playlist)
          }
        }).catch(err =>{
          console.log('err ==>',err )
        })
      },

      // 热门推荐
      getHot(){
        this.axios({
          method:'GET',
          url:'/personalized',
          params:{
            limit:8
          }
        }).then(res =>{
          console.log('res==>',res)
          if(res .data.code == 200){
            res.data.result.forEach(e =>{
              this.hot.push({name:e.name,url:e.picUrl,count:e.playCount,id:e.id})
            })
          }
        }).catch(err =>{
          console.log('err ==>',err )
        })
      },

      // 新碟上架数据
      getCD(){
        this.axios({
          method:'GET',
          url:'/top/album',
          params:{
            limit:10
            
          }
        }).then(res =>{
          console.log('res==>',res)
          if(res.data.code == 200){
            res.data.albums.forEach((e,i) =>{
              if(i<5){
                this.newCD.card1.push({name:e.name,singer:e.artist.name,url:e.picUrl,id:e.id})
              }else{
                this.newCD.card2.push({name:e.name,singer:e.artist.name,url:e.picUrl,id:e.id})
              }
            })
          }
        }).catch(err =>{
          console.log('err ==>',err )
        })
      },

      // 获取榜单
      getRank(){
        this.axios({
          method:'GET',
          url:'/toplist'
        }).then(res =>{
          for(let i=0; i<3; i++){
            this.rankList.push({name:res.data.list[i].name,id:res.data.list[i].id,url:res.data.list[i].coverImgUrl,data:[]})
          }

          this.rankList.forEach(e =>{
            this.axios({
            method:'GET',
            url:'/playlist/detail',
            params:{
              id:e.id
            }
          }).then(res =>{
            e.data = res.data.playlist.tracks.slice(0,10)
          }).catch(err =>{
            console.log('err==>',err)
          })
          })
        }).catch(err =>{
          console.log('err==>',err)
        })
      },

     

      // 获取歌手列表
      singerList(){
        this.axios({
          method:'GET',
          url:'/dj/toplist/popular',
          params:{
            limit:8
          }
        }).then(res =>{
          console.log('res==>',res)
          this.singerList = res.data.data.list
        }).catch(err =>{
          console.log('err==>',err)
        })
      },

      // 跳转到详情页
      goDetail(name,id){
      this.$router.push({name:name,query:{id:id}})
      },

    },


  }
</script>

