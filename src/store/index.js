import Vue from 'vue'
import Vuex from 'vuex'
import {
    ADD_USER,
    ADD_USER_ORDER_LIST,
    change_LOGIN_STATUS,
}from './mutations-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
    curUser:''
  },


  mutations: {
    //给新用户添加登录状态，历史订餐信息属性，并添加新用户
    [ADD_USER](state,obj){
      obj.isLogin = false;
      obj.historyList = [];
      Vue.set(state.userInfo,obj.user,obj);
      console.log(state.userInfo);
    },
    //给用户添加订单
    [ADD_USER_ORDER_LIST](state,obj){
      state.userInfo.historyList.push(obj);
    },
    [change_LOGIN_STATUS](state,obj){
      state.userInfo[obj.user].isLogin = obj.isLogin;
      state.curUser = obj.user;
    }
  },
  getters:{
    //拿到用户账号，返回该账号信息
    getUserInfo:(state) => (username) =>{
      if(!state.userInfo){
        return {};
      }
      return state.userInfo[username];
    }
  }
})
