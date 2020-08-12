<template>
  <div class="home">
    <!-- 导航栏 -->
    <navbar :navbar='navBar'/>
    

    <router-view></router-view>
  </div>
</template>

<script>
import $axios from 'axios'
import '../assets/css/home.css'
import player from '../components/Player'
import navbar from '../components/Navbar'
export default {
  data() {
    return {
      navBar: [
        { title: "发现音乐", name: "Find" ,path:'/find'},
        // { title: "我的音乐", name: "My" ,path:'/my'},
       
      ],
      activeIndex: "1",
     

    };
  },

  
  methods: {
    // 页面跳转
    goPath(path) {
      this.$router.push({ name: path });
    },


  },

  components:{
    player,
    navbar
  }
};
</script>


<style lang="less" scoped>

</style>


