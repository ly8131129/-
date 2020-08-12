<template>
  <div class="player" @mouseleave="setMouseleave" @mouseenter="setMouseenter">

    <!-- 显示播放器 -->
    <div class="transparent"></div>

    

    <div class="control">
      <div class=" wrap">
        <!-- 播放列表 -->
        <list v-show="isShowlist" :lyric='lyric' :time='currentTime' :tlyric='tlyric'/>
      
        <!-- 播放控件 -->
        <div class="left fl">
          <div @click="prevSong"><i class="fa fa-step-backward" aria-hidden="true"></i></div>
          <div @click='start'><i class="fa" :class="isPlay ? 'fa-pause' : 'fa-play'"></i></div>
          <div @click="nextSong"><i class="fa fa-step-forward" aria-hidden="true"></i></div>
        </div>

        <!-- 进度条 -->
        <div class="right fl">
          <div class="block" >
            <el-slider v-model="currentTime" :max="duration" @change='changeCurrentTime' @input='setValue' :format-tooltip='format_tooltip' height="50"></el-slider>
          </div>
        </div>

        <!-- 时间 -->
        <span class="fl time">{{currentTime*1000 | dateTime}} / {{duration*1000 | dateTime}}</span>
        <!-- 随机播放 -->
        <div @click="changeRandom" class="button"><i class="fa "   :class="random? 'fa-random' : 'fa-circle-o-notch'" aria-hidden="true"></i></div>
        <!-- 音乐列表 -->
        <div class="button">
          <i class="fa fa-bars" aria-hidden="true" @click='showList'></i>
        </div>
        <!-- 音量控制 -->
        <div class="button volume">
          <i class="fa fa-volume-up" aria-hidden="true" @click='showVolume'></i>
          <div class="block" v-show="isVolume">
            <el-slider v-model="volume"  @input='setVolume'  height="100px"  vertical input-size='large'></el-slider>
          </div>
        </div>
      </div>
    </div>

    <audio ref='play' muted >
      <source :src="songUrl"/>
    </audio>
  </div>
</template>

<script>
import '../assets/css/player.css'
import list from './List'
 
if(!sessionStorage.getItem('isRandom')){
  sessionStorage.setItem('isRandom',0)
}
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'

// 过滤歌词时间
class Format{
  constructor(value){
    this.value = value
  }

  time(){
    let reg = /\[.+?\]/
    if(reg.test(this.value)){
      let str = reg.exec(this.value)[0]
      str = str.slice(1,-1)
      if(str.indexOf(':')){
        let str1 = str.split(':')[0]
        let str2 = str.split(':')[1]
        let num = str1 * 60 + str2 *1
        return num
      }
    }
  }
}


  export default {
    mounted(){
      // 获取音乐url
      this.$nextTick(() =>{
        let id = ''
        if(!!this.songs){
          for(let i=this.songs.length-1; i>=0; i--){
            if(this.songs[i].current){
              id = this.songs[i].id
              break
            }
          }
          this.axios({
            method:'GET',
            url:'/song/url',
            params:{
              id:id
            }
          }).then(res =>{
            console.log('song==>',res)
            this.songUrl = res.data.data[0].url
            this.$store.commit('changeId',id)
            this.$refs.play.load()
          }).catch(err =>{
            console.log('err==>',err)
          })

          this.$refs.play.oncanplay = () =>{
            this.duration = this.$refs.play.duration 
            
            // 获取歌词
            this.axios({
              method:'GET',
              url:'/lyric',
              params:{
                id:id
              }
            }).then(res =>{
              console.log('歌词',res)

              // 处理歌词格式
              let arr= res.data.lrc.lyric.split('\n')
              for(let i=0; i<arr.length; i++){
                if(arr[i].indexOf('0') == 1){
                  arr = arr.splice(i)
                  break
                }
              }
              
              // 原歌词
              this.lyric = []
              for(let i=0;i<arr.length-1;i++){
                if(i<arr.length-2){
                  this.lyric.push({text:arr[i],start:new Format(arr[i]).time(),end:new Format(arr[i+1]).time()})
                }else{
                  this.lyric.push({text:arr[i],start:new Format(arr[i]).time(),end:this.duration})
                }
              }

               for(let i=this.lyric.length-1; i>=0; i--){
                let reg = /^\[.+?\]$/
                if(reg.test(this.lyric[i].text)){
                  this.lyric.splice(i,1)
                }
              }


              // 翻译歌词
              if(!!res.data.tlyric.lyric){
                  
                let arr = res.data.tlyric.lyric.split('\n')
                for(let i=0; i<arr.length; i++){

                  for(let j=0; j<this.lyric.length; j++){
                    if(arr[i] != '' && new Format(arr[i]).time() == this.lyric[j].start){
                      this.lyric[j].tlyric = arr[i]
                      break
                    }
                  }
                  
                }
              }
                
                
              
            }).catch(err =>{
              console.log(err)
            })
          }

          
        }
      })
      
      
    },

    updated(){
      if(!this.isPlay){
        this.$refs.play.pause
      }
      
    },
    
    data(){
      return{
        
        songUrl:'',
        random:Boolean(Number(sessionStorage.getItem('isRandom'))),
        duration:0,
        timer:'',
        currentTime:0,
        value:0,
        isShowlist:false,
        lyric:[],
        tlyric:[],
        currentSong:'',
        isVolume:false,
        volume:50
        
      }
    },

    computed:{
      ...mapState(['songs','isPlay','randomList']),
      
    },

    
    methods:{

      // 播放暂停
      start(){
        if(!!this.songUrl){
          if(!this.isPlay){
            this.$refs.play.play()
            this.$store.commit('changePlay',true)
            let vm = this
            clearInterval(this.timer)
            this.timer = setInterval(() =>{
              vm.currentTime = vm.$refs.play.currentTime
              if(vm.$refs.play.ended){
                vm.nextSong()
              }
            },500)
          }else{
            this.$refs.play.pause()
            this.$store.commit('changePlay',false)
            clearInterval(this.timer)
          }
        
        }
        
      },

      // 上一首
      prevSong(){
        // 判断是否为随机播放
        if(this.random){
          /* for(let i=this.randomList.length-1; i>=0; i--){
            if(this.randomList[i].current){
              this.randomList[i].current = false
              if(i == 0){
                this.randomList[this.randomList.length - 1].current = true
              }else{
                this.randomList[i-1].current = true
              }
              
              break
            }
          } */
          let currentId = 0
          for(let i=this.songs.length-1; i>=0; i--){
            if(this.songs[i].current){
              currentId = this.songs[i].id
              this.songs[i].current = false
            }
          }
          for(let i=0; i<this.randomList.length; i++){
            if(this.randomList[i].id == currentId){
              if(i == 0){
                currentId = this.randomList[this.randomList.length-1].id
              }else{
                currentId = this.randomList[i-1].id
              }
              this.songs.forEach(e =>{
                if(e.id == currentId){
                  e.current = true
                  return
                }
              })
              break
            }
          }
          
        }else{
           for(let i=this.songs.length-1; i>=0; i--){
            if(this.songs[i].current){
              this.songs[i].current = false
              if(i == 0){
                this.songs[this.songs.length - 1].current = true
              }else{
                this.songs[i-1].current = true
              }
              
              break
            }
          }
        }

        sessionStorage.setItem('songs',JSON.stringify(this.songs))
        this.$store.commit('resetSongs')
        this.$store.commit('changePlay',true)

      },

      // 下一首
      nextSong(){
        if(this.random){
         /*  for(let i=this.randomList.length-1; i>=0; i--){
            if(this.randomList[i].current){
              this.randomList[i].current = false
              if(i == this.randomList.length - 1){
                this.randomList[0].current = true
                // this.getId(this.randomList[0].id)
              }else{
                this.randomList[i + 1].current = true
                // this.getId(this.randomList[i + 1].id)
              }
              
              break
            }
          } */
          let currentId = 0
          for(let i=this.songs.length-1; i>=0; i--){
            if(this.songs[i].current){
              currentId = this.songs[i].id
              this.songs[i].current = false
            }
          }
          for(let i=0; i<this.randomList.length; i++){
            if(this.randomList[i].id == currentId){
              if(i == this.randomList.length-1){
                currentId = this.randomList[0].id
              }else{
                currentId = this.randomList[i+1].id
              }
              this.songs.forEach(e =>{
                if(e.id == currentId){
                  e.current = true
                  return
                }
              })
              break
            }
          }
          
        }else{
          for(let i=this.songs.length-1; i>=0; i--){
            if(this.songs[i].current){
              this.songs[i].current = false
              if(i == this.songs.length - 1){
                this.songs[0].current = true
              }else{
                this.songs[i + 1].current = true
              }
              
              
              break
            }
          }
        }

        sessionStorage.setItem('songs',JSON.stringify(this.songs))
        this.$store.commit('resetSongs')
        this.$store.commit('changePlay',true)
      },


      // 获取歌曲和歌词
      getId(id){
        this.axios({
            method:'GET',
            url:'/song/url',
            params:{
              id:id
            }
          }).then(res =>{
            console.log('song==>',res)
            
            let vm = this
            this.songUrl = res.data.data[0].url
            this.$store.commit('changeId',id)
            this.$emit('showFooter')
            let promise = new Promise((resolve,reject) =>{
              vm.$refs.play.load(() =>{
                console.log(1)
              });
              resolve()
            }) 
            promise.then(() =>{
              clearTimeout(timer2)
              let timer2 = setTimeout(() =>{
                vm.$refs.play.play()
              },150)
            })
            
            
            this.$refs.play.oncanplay = () =>{
              this.duration = this.$refs.play.duration

              // 获取歌词
              this.axios({
                method:'GET',
                url:'/lyric',
                params:{
                  id:id
                }
              }).then(res =>{
                console.log('歌词',res)
                this.lyric = []
                let arr= res.data.lrc.lyric.split('\n')
                for(let i=0;i<arr.length-1;i++){
                  if(i<arr.length-2){
                    this.lyric.push({text:arr[i],start:new Format(arr[i]).time(),end:new Format(arr[i+1]).time()})
                  }else{
                    this.lyric.push({text:arr[i],start:new Format(arr[i]).time(),end:this.duration})
                  }
                }
                for(let i=this.lyric.length-1; i>=0; i--){
                  let reg = /^\[.+?\]$/
                  if(reg.test(this.lyric[i].text)){
                    this.lyric.splice(i,1)
                  }
                }


                
                if(!!res.data.tlyric.lyric){
                  
                  let arr = res.data.tlyric.lyric.split('\n')
                  for(let i=0; i<arr.length; i++){

                    for(let j=0; j<this.lyric.length; j++){
                      if(arr[i] != '' && new Format(arr[i]).time() == this.lyric[j].start){
                        this.lyric[j].tlyric = arr[i]
                        break
                      }
                    }
                   
                  }
                 
                }
                console.log(this.lyric)
              }).catch(err =>{
                console.log(err)
              })
              clearInterval(this.timer)
              this.timer = setInterval(() =>{
                vm.currentTime = vm.$refs.play.currentTime
                if(vm.$refs.play.ended){
                  vm.nextSong()
                }
              },500)
            }
            
          }).catch(err =>{
            console.log('err==>',err)
          })

          
      },

      // 拖动进度条改时间
      changeCurrentTime(){
        this.$refs.play.currentTime = this.value
        
      },

      setValue(value){
        this.value = value
      },

      // 格式化进度条信息
      format_tooltip(value){
        value = Math.floor(value * 1000)
        let minute = parseInt(value / 1000 / 60)
        let second = parseInt(value / 1000  - minute * 60)
        second = second < 10 ? '0' + second : second
        
        return minute + ':' + second
      },

      // 随机播放状态
      changeRandom(){
        if(this.random){
          sessionStorage.setItem('isRandom',0)
        }else{
          sessionStorage.setItem('isRandom',1)
        }
        this.random = Boolean(Number(sessionStorage.getItem('isRandom')))
      },

      // 设置鼠标事件
      setMouseleave(){
        this.$emit('mouseleave')
      },
      setMouseenter(){
        this.$emit('mouseenter')
      },

      // 通知父组件显示播放器
      showList(){
        if(this.isShowlist){
          this.isShowlist = false
          this.$emit('mouseDisabled',true)
        }else{
          this.isShowlist = true
          this.$emit('mouseDisabled',false)
        }
        
      },

      //显示音量
      showVolume(){
        if(this.isVolume){
          this.isVolume = false
        }else{
          this.isVolume = true
        }
      },

      //调节音量
      setVolume(value){
        this.$refs.play.volume = value/100
      }


      

    
    },

    watch:{
      songs(newv,oldv){
        for(let i=newv.length-1; i>=0; i--){
          if(newv[i].current && i != 0){
            for(let j=oldv.length-1; j>=0; j--){
              if(oldv[j].current){
                if(newv[i].id != oldv[j.id]){
                  this.getId(newv[i].id)
                }
                break
              }
            }
            break
          }
          
          if(newv[i].current && i==0){
            this.getId(newv[0].id) 
            break
          }
        }

        // 随机播放列表
        if(!oldv || newv.length != oldv.length){
          console.log(this.songs)
          let arr = []
          this.songs.forEach((e,i) =>{
            arr[i] = e
          })
          
          arr.sort(() =>{
             return Math.random() - 0.5
          })
           console.log(arr)
          sessionStorage.setItem('random',JSON.stringify(arr))
          this.$store.commit('changeRandomList')
        }
        this.$store.commit('changePlay',true)

      }
    },

    components:{
      list
    }

  
  }
</script>

<style lang="less" scoped>

</style>