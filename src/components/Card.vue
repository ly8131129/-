<template>
  <!-- 分类卡片 -->
  <div class="card" @click="clickEvent">
    
    <div class="image" >
      <img :src="songItem.coverImgUrl" alt="" class="auto-img">
      <div class="b_text">
        <i class="el-icon-headset"></i>
        {{songItem.playCount}}
        <span class="play"><i class="el-icon-video-play"></i></span>
        </div>
    </div>

    <div class="text">{{songItem.name}}</div>
            
  </div>
</template>

<script>
  export default {
    props:{
      songItem:{
        type:Object
      }
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
    height: 140px;
    position: relative;

    img {
      height: 100%;
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
  }
}


</style>