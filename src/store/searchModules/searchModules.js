export const search = {
  namespaced:true,

  state:{
    keywords:'',
    type:1,
    list:[]
  },

  getters:{
    
  },

  mutations:{
    getKey(state,key){
      let reg = /\<script\>.+?\<\/script\>/gi
      if(reg.test(key)){
        key = key.replace(reg,'')
      }
      state.keywords = key
    },

    getType(state,type){
      state.type = type
    },

    getList(state,data){
      state.list = []
      state.list = data
      
    }
  }
}