import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

axios.defaults.withCredentials = true
// 配置基础路径
axios.defaults.baseURL = 'http://localhost:3000/'

axios.interceptors.request.use(config =>{
  
  if(config.method == 'post'){
    let str = ''
    for(let key in config.data){
      str += key + '=' + config.data[key] +'&'
    }
    config.data = str.slice(0,-1)
  }
  return config
})

// 歌曲时间过滤
Vue.filter('dateTime',function(value){
  value = Math.floor(value)
  let minute = parseInt(value / 1000 / 60)
  let second = parseInt(value / 1000  - minute * 60)
  second = second < 10 ? '0' + second : second
  
  return minute + ':' + second
})

// 发行日期过滤
Vue.filter('setDate',function(value,format){
  let date = new Date(value)
  let dateObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate()
  }

  for(let key in dateObj){
    let reg = RegExp(`(${key}+)`)
    if(reg.test(format)){
      let content = RegExp.$1
      let value = dateObj[key] > 10 ? dateObj[key] : '0' + dateObj[key]
      format = format.replace(content,value)
    }
  }
  return format
})

// 歌词过滤
Vue.filter('lyric',function(value){
  
  let reg = /\[.+?\]/gi
  if(reg.test(value)){
    return value.replace(reg,'')
  }else{
    return value
  }
  // return value
})

// 搜索结果高亮
Vue.filter('search',((value,keywords) =>{
  let reg = new RegExp(keywords,'gi')
  let lightStr = `<span class='hightLight'>${keywords}</span>`
  if(reg.test(value)){
    console.log(value.replace(reg,lightStr))
    return value = value.replace(reg,lightStr)
  }else{
    return value
  }
}))
  

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
