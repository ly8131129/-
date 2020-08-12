<template>
  <div class="searchCard" >

    <!-- 歌手 -->
    <div class="card" @click="clickEvent" v-if="type == 100">
      <div class="image" >
        <div class="artistImg" :style="{'background' : 'url('+ cardItem.img1v1Url +') no-repeat center','backgroundSize' : 'contain'}"></div>
        
      </div>
      <div class="text"><span v-html="$options.filters.search(cardItem.name,keywords)"></span></div>
    </div>


    <!-- 视频 -->
    <div class="card" @click="clickEvent" v-if="type == 1014">
      <div class="image" >
        <img :src="cardItem.coverUrl" alt="" class="auto-img" />
        <div class="t_text">
          <i class="el-icon-video-camera"></i>
          <span>{{cardItem.playTime}}</span>
        </div>
        <div class="b_text">
          {{cardItem.durationms | dateTime}}
        </div>
        
      </div>
      <div class="text"><span v-html="$options.filters.search(cardItem.title,keywords)"></span></div>
    </div>


    <!-- 专辑 -->
    <div class="card" @click="clickEvent" v-if="type == 10">
      <div class="image" >
        <div class="artistImg" :style="{'background' : 'url('+ cardItem.picUrl +') no-repeat center','backgroundSize' : 'contain'}"></div>
        
      </div>
      <div class="text">
        <p v-html="$options.filters.search(cardItem.name,keywords)"></p>
        <p v-html="$options.filters.search(cardItem.artists[0].name,keywords)"></p>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapState:ms} = createNamespacedHelpers('search')
  export default {
    
    props:{
      cardItem:{
        type:Object
      },

    },

    computed:{
      ...ms(['type','keywords'])
    },

    methods:{
      clickEvent(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
.card {
  width: 140px;
  cursor: pointer;
  box-sizing: border-box;
  .image {
    width: 140px;
    // height: 140px;
    position: relative;

    .artistImg {
      height: 140px;
    }
    .t_text{
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      color: #fff;
      padding-left: 10px;
      background-image: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,0.7));
      i{
        margin-right: 3px;
      }
    }

    .b_text {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
      color: rgba(255, 255, 255, 0.8);
      padding: 5px 5px;
      box-sizing: border-box;
      font-size: 10px;

      i {
        font-size: 16px;
      }

      .play {
        float: right;
        cursor: pointer;

      }

      .play:hover {
        color: #fff;
      }
    }
  }

  .text {
    height: 40px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}


</style>