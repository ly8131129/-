import Vue from 'vue'
import Vuex from 'vuex'
import {search} from './searchModules/searchModules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 播放组件状态
    songs: JSON.parse(sessionStorage.getItem('songs')),
    isPlay: false,
    id: 0,
    isRandom: sessionStorage.getItem('isRandom'),
    randomList: JSON.parse(sessionStorage.getItem('random')),
  },

  getters:{
    currentSong:(state) =>{
      if(state.songs){
        let str = ''
        state.songs.forEach(e =>{
          if(e.current){
            return str = e.name
          }
        })
        return str
        }
    }
  },
  mutations: {
    resetSongs(state){
      state.songs = JSON.parse(sessionStorage.getItem('songs'))
      
    },

    changePlay(state,bool){
      state.isPlay = bool
    },

    changeId(state,id){
      state.id = id
    },

    changeRandomList(state){
      state.randomList = JSON.parse(sessionStorage.getItem('random'))
    }
  },
  actions: {
  },
  modules: {
    // 搜索组件状态
    search
  }
})
