<template>
  
  <div class="find">
    <!-- 二级路由导航条 -->
    <div class="sec_nav">
      <div class="sn_content_box">
        <ul class="sn_content wrap">
          <li v-for="(item,index) in sec_nav" :key="index" class="sec_item">
            <span :class=" {'active' : item.pathName == selectName}" @click="toggle(item,item.pathName)">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
    

    <!-- 播放组件 -->
    <player class="footer " ref="player" @mouseleave="hide" @mouseenter="show" @mouseDisabled='mouseDisabled' @showFooter='showFooter'>
    </player>
  </div>
</template>

<script>
import player from '../components/Player'

// 定时器
let timer = ''

  export default {
    data(){
      return{
         sec_nav: [
          { title: "推荐", pathName:'Recommend'},
          { title: "排行榜", pathName:'Rank'},
          { title: "歌单", pathName:'Songlist'},
        ],
        
        
        // 移开鼠标组件是否消失
        canAnimate:true
      }
    },

    computed:{
      selectName(){
        return this.$route.name
      }
    },

    methods:{

      // 切换路由
      toggle(item,name){
        this.$router.push({name:name,query:{name:name}})
      },

      // 移开鼠标组件消失
      hide(){
        if(this.canAnimate){
          timer =setTimeout(() =>{
            this.$refs.player.$el.classList.add('footer1')
            this.$refs.player.$el.classList.remove('footer2')
          },1000)
        }
      },

      // 鼠标进入组件显示
      show(){
        this.$refs.player.$el.classList.remove('footer1')
        this.$refs.player.$el.classList.add('footer2')
        clearTimeout(timer)
      },

     
      // 点击组件歌单后组件不自动消失
      mouseDisabled(bool){
        this.canAnimate = bool
      },

      // 切换歌曲组件自动显示
      showFooter(){
        this.show()
        setTimeout(() =>{
          this.hide()
        },1000)
      }
    },

  /*   watch:{
      $route(newv){
        // 根据路由名称保持选项卡高亮
        this.selectName = newv.name
      },

    
    }, */
    components:{
        player
      }
  }
</script>

<style lang="less" scoped>
.sec_nav {
    background-color: #c20c0c;
    width: 100%;
    padding: 5px 0;

    .sn_content_box {
      background-color: #c20c0c;
      overflow: hidden;

      .sn_content {
        box-sizing: border-box;
        display: flex;
        justify-content: center;

        .sec_item {
          width: 200px;
          font-size: 12px;
          color: #fff;
          box-sizing: border-box;
          text-align: center;

          span {
            display: inline-block;
            padding: 3px 12px;
            border-radius: 12px;

            line-height: 16px;
            cursor: pointer;
          }

          .active {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: -50px;
    left: 0;
  }

  @keyframes show{
  from {
    bottom: -50px;
  }
  to{
    bottom: 0px;
  }
}
@keyframes hide{
  from{
    bottom: 0px;
  }
  to{
    bottom: -50px;
  }
}

.footer1{
  animation: hide 0.3s  linear forwards;
}

.footer2{
  animation: show 0.2s 0.3s linear forwards;
}
</style>