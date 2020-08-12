<template>
  <div class="search">
    <!-- 搜索栏 -->
    <div class="input_box">
      <img src="../assets/images/search.png" alt="" class="searchImg" v-if="isResult">
      <input type="text" :placeholder="isResult ? '音乐/视频/电台/用户' : ''"  v-model="searchText" @input='showSearchBox' @blur="hideResult" @keypress="goResult" ref="inp">
      <slot name="icon"></slot>
    </div>
    <!-- 搜索结果 -->
    <div class="result" v-show="visible">
      <p class="top"><span>搜 {{searchText}} 相关用户</span>&gt;</p>
      <div class="content">
        <div v-for="(item,index) in suggestion.order" :key='index' class="item">
          <div class="left">
            <img :src="suggestion.url[index]" alt="" class="image"> 
            <span>{{suggestion.type[index]}}</span>
            </div>
          <div class="right">
            <p v-for="(item1,index1) in suggestion[item]" :key="index1">{{item1.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      visible:false,
      searchText:'',
      suggestion:[]
    }
  },

  props:{
    isResult:{
      type:Boolean,
      default:true
    },
    inpValue:{
      type:String,
      default:''
    }
  },
  methods:{
    // 推荐搜索结果
    showSearchBox(){
      if(this.searchText){
        this.visible  = true

        this.axios({
          method:'GET',
          url:'/search/suggest',
          params:{
            keywords: this.searchText
          }
        }).then(res =>{
          console.log('搜索建议',res)
          this.suggestion = res.data.result
          this.suggestion.type = []
          this.suggestion.url = []
          res.data.result.order.forEach((e,i) =>{
            switch(e){
              case 'songs' :
                this.suggestion.type[i] = '单曲';
                this.suggestion.url[i] = require('../assets/images/music.png')
                break;
              case 'artists' :
                this.suggestion.type[i] = '歌手';
                this.suggestion.url[i] = require('../assets/images/singer.png')
                break;
              case 'albums' :
                this.suggestion.type[i] = '专辑';
                this.suggestion.url[i] = require('../assets/images/album.png')
                break;
              case 'playlists' :
                this.suggestion.type[i] = '歌单';
                this.suggestion.url[i] = require('../assets/images/playlist.png')
                break;
            }
          })
        }).catch(err =>{
          console.log(err)
        })
      }else{
        this.visible  = false
      }
    },

    hideResult(){
      this.visible = false
    },

    goResult(e){
      if(e.keyCode == 13 && this.searchText != ''){
        this.$router.push({name:'SearchResult',query:{keywords:this.searchText,type:1}})
      }
    }
  },
  watch:{
    inpValue(newv,oldv){
      this.searchText = newv
    },
    
    
  }
}
</script>

<style lang='less' scoped>
.search{
  
  .input_box{
    height: 30px;
    background-color: #fff;
    width: 180px;
    padding: 5px 5px;
    box-sizing: border-box;
    border-radius: 15px;
    margin-top: 20px;
    input{
    width: 150px;
    height: 100%;
    border: none;
    outline: none;
    text-indent: 10px;
    }
    .searchImg{
      vertical-align: middle;
    }
  }

  .result{
    position: absolute;
    top: 70px;
    background-color: #fff;
    width: 200px;
    padding: 0 5px;
    box-shadow:  0 2px 5px 1px rgba(0,0,0,0.4);
    z-index: 9999;
    box-sizing: border-box;
    .top{
      font-size: 12px;
      padding: 10px 0;
      border-bottom: 1px solid #e2e2e2;
      span{
        cursor: pointer;
      }
      span:hover{
        background-color: #e3e5e7;
      }
    }

    .content{
      .item{
        display: flex;
        font-size: 12px;

        .left{
          width: 30%;
          padding-top: 5px;
          padding-left: 5px;
          box-sizing: border-box;
          .image{
            vertical-align: bottom;
          }
        }
        .right{
          width: 70%;
          border-left: 1px solid #e2e2e2;
          box-sizing: border-box;
          p{
            padding: 5px 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
          p:hover{
            background-color: #e8e8e8;
          }
        }
      }
    }
    .item:nth-child(even) .right{
      background-color: #f9f8f8;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
    }
  }
}
</style>