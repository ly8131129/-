<template>
<!-- 播放歌单 -->
  <div class="list" >
    <div class="list-left" v-if="!!songs">
      <!-- 歌单 -->
      <div class="list-top">
        播放列表({{songs.length}})
      </div>
      <div class="list-bottom">
        <li
          class="songs"
          v-for="(songsItem,songsIndex) in songs"
          :key="songsIndex"
          @click="toggleSong(songsItem)"
        >
          <i class="fa fa-play" aria-hidden="true" :class="songsItem.current? 'active' : ''"></i>
          <span>{{songsItem.name}}</span>
        </li>
      </div>
    </div>
    <!-- 歌词 -->
    <div class="list-right">
      <div class="list-top">
        {{currentSong}}
      </div>
      <div class="list-bottom " ref="lyricbox">
        <li class="lyric" v-for="(lyricItem,lyricIndex) in lyric" :key='lyricIndex' :id="time>lyricItem.start && time<lyricItem.end ? 'lyricLight' : ''"  ref="lyric">
          <p class="text" v-if="lyric.length != 0">{{lyricItem.text | lyric}}</p>
          <p class="text" v-if="lyric.length != 0">{{lyricItem.tlyric | lyric}}</p>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
var timer;
export default {
  props:{
    lyric:{
      type:Array
    },
    time:{
      type: Number
    },
    tlyric:{
      type:Array
    }
  },
  computed:{
    ...mapState(['songs','isPlay']),
    ...mapGetters(['currentSong'])
   
  },
  methods: {
    // 切换歌曲
    toggleSong(item) {
      for (let i = this.songs.length - 1; i >= 0; i--) {
        if (this.songs[i].current) {
          this.songs[i].current = false;
        }
      }
      item.current = true;
      console.log(item.id);
      sessionStorage.setItem("songs", JSON.stringify(this.songs));
      this.$store.commit("resetSongs");
      this.$store.commit("changePlay", true);
    },
  },

  watch:{
    time(newv){
      // 歌词动态追踪
      for(let i=0; i<this.lyric.length; i++){
        if(this.$refs.lyric[i].id == 'lyricLight' && this.$refs.lyric[i].className.indexOf('light') == -1 ){
          this.$refs.lyric[i].classList.add('light')
          clearInterval(timer);
          console.log(1)
          if(this.isPlay){
            
            let h = i * this.$refs.lyric[0].clientHeight -125
            if(this.$refs.lyricbox.scrollTop > h && this.$refs.lyricbox.scrollTop > 0){
              timer = setInterval(() => {
                
                if(this.$refs.lyricbox.scrollTop - h > 100){
                  this.$refs.lyricbox.scrollTop -= 20
                }else{
                  this.$refs.lyricbox.scrollTop -= 4
                }
                if(this.$refs.lyricbox.scrollTop <= h){
                  clearInterval(timer)
                  this.$refs.lyricbox.scrollTop = h
                }
                if(this.$refs.lyricbox.scrollTop == 0){
                  clearInterval(timer)
                }
                if(!this.isPlay){
                  clearInterval(timer)
                }
              },20)
            }
            if(this.$refs.lyricbox.scrollTop < h ){

              timer = setInterval(() => {

                if(this.$refs.lyricbox.scrollTop - h > -100){
                  this.$refs.lyricbox.scrollTop += 4
                }else{
                  this.$refs.lyricbox.scrollTop += 20
                }
                if(this.$refs.lyricbox.scrollTop >= h){
                  clearInterval(timer)
                  this.$refs.lyricbox.scrollTop = h
                }
                if(!this.isPlay){
                  clearInterval(timer)
                }
                if(this.$refs.lyricbox.scrollTop + this.$refs.lyricbox.clientHeight == this.$refs.lyricbox.scrollHeight){
                  clearInterval(timer)
                }
              },20);
              
            }

            
          }
          if(i>0){
            this.$refs.lyric[i-1].classList.remove('light')
          }
          break
        }
      }
    },

  }
};
</script>

<style lang='less' scoped>
.list {
  position: absolute;
  width: 1000px;
  bottom: 80px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  .list-left {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    .list-top {
      background-color: rgba(0,0,0,0.5);
      width: 100%;
      height: 50px;
      color: #fff;
      line-height: 50px;
      text-align: center;
    }
    .list-bottom {
      width: 100%;
      height: 250px;
      overflow-y: auto;
      li {
        cursor: pointer;
        list-style: none;
        color: #999;
        font-size: 14px;
        padding: 5px 7px;
        .fa {
          color: transparent;
        }
        .active {
          color: #c70c0c;
        }
        span {
          display: inline-block;
          margin-left: 7px;
        }
      }

      li:hover{
        background-color: #000;
        color: #fff;
      }
    }
  }
  .list-right {
    width: 50%;
    height: 100%;
    .list-top {
      background-color: rgba(0,0,0,0.5);
      width: 100%;
      height: 50px;
      color: #fff;
      line-height: 50px;
      text-align: center;
    }
    .list-bottom {
      width: 100%;
      overflow-y: auto;
      height: 250px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
    .lyric{
      padding: 10px 0;
      p{
        height: 20px;
        line-height: 20px;
      }
    }
    
    @keyframes lyric{
      from{
        color: #999; 
      }
      to{
        color: #fff;
      }
    }
    
    #lyricLight{
      animation: lyric 1s ease-in-out forwards;
      
    }
  }
}

.list-bottom::-webkit-scrollbar{
  width: 5px;
}

.list-bottom::-webkit-scrollbar-thumb{
  background-color: #4a4746;
  border-radius: 10px;
  border: 1px solid #625e5d;
}

.list-bottom::-webkit-scrollbar-track{
  background-color: rgba(0,0,0,0.5);
}
</style>