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