<template>
<!-- 分类列表 -->
  <div class="classify">
    <div class="title">
      <button class="button" @click='allType'>全部分类</button>
    </div>
    
    <div class="content" v-for='(classifyItem,classifyIndex) in classify' :key='classifyIndex' >
      <!-- 左侧大类别 -->
      <div class="left ">
        <img :src="image[classifyIndex].url" alt="" class="fl"><span class="fl">{{classifyItem.category}}</span>
      </div>
      <!-- 右侧详细分类 -->
      <div class="right ">
        <li v-for='(subItem,subIndex) in classifyItem.sub' :key='subIndex' @click='changeType(subItem.name)' >
          <a href="javascript:;">{{subItem.name}}</a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        classify:[],
        image:[
          {url:require('../assets/images/language.png')},
          {url:require('../assets/images/style.png')},
          {url:require('../assets/images/changjing.png')},
          {url:require('../assets/images/qinggan.png')},
          {url:require('../assets/images/yinyue.png')},
        ],
        
      }
    },
    
    created(){
      // 获取歌单分类
      this.axios({
        method:'GET',
        url:'/playlist/catlist'
      
      }).then(res =>{
        console.log('歌单分类 ==>',res)
        for( let key in res.data.categories ){
          this.classify.push({category:res.data.categories[key]})
        }

        this.classify.forEach((e,i) =>{
          let arr = res.data.sub.filter((item,index) =>{
            return item.category == i
          })
          e.sub = arr
        })

      }).catch(err =>{
        console.log('err ==>',err)
      })


      
    },


    methods:{
      // 更改类别
      changeType(cat){
        this.$emit('sendCat',cat)
        
      },

      allType(){
        this.$router.push({query:{cat:'',page:''}})
        this.$router.go(0)
      }

      
    }
  }
</script>

<style lang="less" scoped>

.classify{

  .title{
    width: 100%;
    height: 50px;
    padding: 11px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #e0e0e0;
    .button{
      padding: 5px 10px;
      font-size: 12px;
      background-color: #fafafa;
      outline: none;
      border: 1px solid #d0d0d0;
      cursor: pointer;
    }
  }

  
.content{
  display: flex;
  
   .left{
      width: 20%;
      border-right: 1px solid #e0e0e0;
      box-sizing: border-box;
      padding-top: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      .fl{
        height: 32px;
        line-height: 32px;
        margin-left: 10px;
        
      }
    }

    .right{
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;
      li{
        padding: 5px ;
        a{
          display: block;
          padding-right: 10px;
          color: #999;
          font-size: 12px;
          text-decoration: none;
          border-right: 1px solid #e0e0e0;
        }
        a:hover{
          text-decoration: underline;
        }
        
      }
    }
}
}
</style>