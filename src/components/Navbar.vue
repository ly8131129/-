<template>
<!-- 首页导航栏 -->
  <div class="navbar" v-if="!!navbar">
    <div class="wrap">
      <li
        v-for="(navbarItem,navbarIndex) in navbar"
        :key="navbarIndex"
        class="item"
        :class="isActive.indexOf(navbarItem.path) > -1 ? 'active' : '' "
        @click="togglePage(navbarItem.name)"
      >
        {{navbarItem.title}}
        <div class="angle"></div>
      </li>

      <!-- 搜索框 -->
      <search />
    </div>
  </div>
</template>

<script>
import search from './Search'
export default {
  props: {
    navbar: {
      type: Array,
    },
  },

  data() {
    return {
      isActive: window.location.href,
    };
  },

  methods: {
    togglePage(name) {
      this.$router.push({ name: name });
    },
  },
  watch: {
    // 选项卡高亮
    $route(newv) {
      this.isActive = newv.path;
    },
  },

  components:{
    search
  }
};
</script>

<style lang='less' scoped>
.navbar {
  height: 70px;
  background-color: #242424;
  .wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    .item {
      width: 100px;
      margin-right: 50px;
      color: #cccccc;
      height: 100%;
      padding: 10px 20px;
      text-align: center;
      box-sizing: border-box;
      line-height: 50px;
      font-size: 14px;
      position: relative;
      cursor: pointer;
      .angle {
        position: absolute;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        left: 47.5px;
      }
    }
    .item:hover {
      color: #fff;
      background-color: #000;
    }

    .active {
      color: #fff;
      background-color: #000;
      .angle {
        border-bottom-color: #c20c0c;
      }
    }

    .search{
      position: absolute;
      right: 10px;
      top: 0;
      height: 100%;
      
    }
  }
}
</style>