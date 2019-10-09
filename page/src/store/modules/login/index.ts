import api from '@/api/';
import {MutationTree,ActionTree,GetterTree} from "vuex";
import state,{States} from "./state"


const actions: ActionTree<States, any> = {
    // 登录
    async LOGIN_INFO_ACTIONS({ commit, state: States}, data: object) {
        let token=await api.Login(data);
        commit("LOGIN_TOKEN",token)
    },
    //获取用户信息
    async GETUSERINFO_ACTIONS({ commit, state: States}){
        let getUserInfo=await api.getUserInfo();
        commit("LOGIN_INFO",getUserInfo)
    }
};

const mutations: MutationTree<any> = {
    // 登录
    LOGIN_TOKEN(
        state: any,
        res: any
    ): void {
        if(res!==undefined){
           sessionStorage.setItem("authorization",res.data.token)
        }
    },
    //用户信息
    LOGIN_INFO(
        state: any,
        res: any
    ): void {
        if(res!==undefined){
           sessionStorage.setItem("authorization",res.data.token)

        }
    }

}

const getters: GetterTree<States, any> ={
    // 用户信息
    LOGIN_USERINFO(
        state: any
    ): void {
        return state.userInfo
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};