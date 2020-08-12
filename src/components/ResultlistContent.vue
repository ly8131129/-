<template>
  <div class="resultListContent">
    <!-- 搜索结果显示 -->
    
    <!-- 歌曲 -->
    <div class="list" v-if="type == 1">
      <el-row v-for="(item,index) in list" :key='index' class="test" >

        <el-col :span="11" ><div class="grid-content bg-purple-light first" ><i class="fa fa-play-circle-o" aria-hidden="true" @click='sendUrl(item.id,item.name)' :class="item.id == id ? 'active' : ''"></i>　<a href="javascript:;" @click="goDetail('Song',item.id)" v-html="$options.filters.search(item.name,keywords)"></a><span>{{item.alias[0]}}</span></div></el-col>

        <el-col :span="3"><div class="grid-content bg-purple index icon" >
          <i class="el-icon-plus"></i>
          <i class="el-icon-folder-add"></i>
          <i class="el-icon-share"></i>
          <i class="el-icon-download"></i>
        </div></el-col>

        <el-col :span="4"><div class="grid-content bg-purple artist">
          <span v-html="$options.filters.search(item.artists[0].name,keywords)"></span>  
        </div></el-col>

        <el-col :span="4"><div class="grid-content bg-purple-light album">
          《<span v-html="$options.filters.search(item.album.name,keywords)"></span>》  
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">
          {{item.duration | dateTime}}  
        </div></el-col>
      </el-row>
    </div>




    <!-- 用户 -->

    <div class="list user" v-if="type == 1002">
      <el-row v-for="(item,index) in list" :key='index' class="test" >

        <el-col :span="14" ><div class="grid-content bg-purple-light first" >
          
          <img :src="item.avatarUrl" alt="" class="image">

          <a href="javascript:;" :style="{'color' : '#0c73c2','font-size' : '16px'}">
            <span v-html="$options.filters.search(item.nickname,keywords)"></span>
            <img src="../assets/images/vip.png" v-if="item.vipType > 0"/>
            <img :src="item.gender == 1 ? require('../assets/images/male.png') : require('../assets/images/female.png')" alt="" class="sex">
          </a>
          
        </div></el-col>

        
        <el-col :span="4"><div class="grid-content bg-purple artist">
          
          <span></span>  
        </div></el-col>

        <el-col :span="3"><div class="grid-content bg-purple-light album">
          歌单：
        </div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light">
          粉丝：
        </div></el-col>
      </el-row>
    </div>




    <!-- 歌单 -->

    <div class="list" v-if="type == 1000">
      <el-row v-for="(item,index) in list" :key='index' class="test" >

        <el-col :span="11" ><div class="grid-content bg-purple-light first" >
          <i class="fa fa-play-circle-o" aria-hidden="true" @click='sendUrl(item.id,item.name)'>
          </i>

          <img :src="item.coverImgUrl" alt="" class="image">

          <a href="javascript:;" @click="goDetail('Playlist',item.id)">
            <span v-html="$options.filters.search(item.name,keywords)"></span>
          </a>
          
        </div></el-col>

        <el-col :span="3"><div class="grid-content bg-purple index icon" >
          <i class="el-icon-plus"></i>
          <i class="el-icon-folder-add"></i>
          <i class="el-icon-share"></i>
          <i class="el-icon-download"></i>
        </div></el-col>

        <el-col :span="4"><div class="grid-content bg-purple artist">
          
          <span><span :style='{"color" : "#999"}'>{{item.trackCount}}首</span>　　by <span v-html="$options.filters.search(item.creator.nickname,keywords)"></span></span>  
        </div></el-col>

        <el-col :span="3"><div class="grid-content bg-purple-light album">
          收藏：{{item.bookCount}}  
        </div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light">
          收听：{{item.playCount}}  
        </div></el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {createNamespacedHelpers} from 'vuex'
const {mapState:ms} = createNamespacedHelpers('search')
export default {

  computed:{
    ...mapState(['id']),
    ...ms(['keywords','type','list'])
  },

  methods:{
    sendUrl(id,name){
      let ids = []
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

    goDetail(name,id){
      this.$router.push({name:name,query:{id:id}})
    }
  }
}
</script>

<style lang='less' scoped>
.resultListContent{
  .list{
    .el-row {
      padding: 7px 0;
      &:last-child {
        margin-bottom: 0;
      }

      .el-col {
      }
      
      .grid-content {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        padding: 5px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .fa{
          font-size: 20px;
          color: #aaa;
          float: left;
          margin-right: 10px;
          margin-top: 6px;
          cursor: pointer;
          
        }
        .fa:hover{
          color: #666;
          
        }

        .active{
          color: #c20c0c!important;
        }
        a{
          text-decoration: none;
          color:#000;
        }
        a:hover{
          text-decoration:underline;
        }
      }

      .first{
        padding-left: 20px;
        span{
          display:inline-block;
          margin-left: 10px;
          // color: #aeaeae;
        }
        .image{
          width: 32px;
          /* display: block;
          float: left; */
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      .icon{
        
        i{
          margin: 0 3px;
          font-size: 16px;
          cursor: pointer;
          display: none;
          color: #999;
        }
        i:hover{
          color:#666;
        }
      }
      

      

      .artist:hover span{
        text-decoration: underline;
        cursor: pointer;
      }

      .album{
        color: #666;
      }
      .index{
        // padding:5px 30px 5px 5px;
      }
      
    }
    .el-row:nth-child(odd){
      background-color: #f7f7f7;
    }

    .el-row:hover{
      background-color: #f2f2f2;
    }

    .el-row:hover .icon i{
      display: inline-block;
    }
  }
}

.user{
  .grid-content{
    height: 40px;
    line-height: 40px;
  }

  .first{

    a{
      vertical-align: -2px;
      img{
          vertical-align: -2px;
          margin-left: 2px;
      }
      .sex{
        vertical-align: -3px;
      }
    }
  }
  
}


</style>