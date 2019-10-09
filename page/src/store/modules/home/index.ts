import {ActionTree,GetterTree,MutationTree} from "vuex";
import state,{State} from "./state";
import api from "@/api/";


const actions:ActionTree<State,any>={
    //获取首页数据
    async allShop_ACTIONS({commit,state:State}){
        let list=await api.allShop();
       commit("allShop_MUTATIONS",list)
    },
    //获取首页banner数据
    async homeShopBanner_ACTIONS({commit,state:State}){
        let bannerList=await api.homeBanner();
       commit("homeShopBanner_MUTATIONS",bannerList)
    },

    //搜索
    async search_ACTION({commit,state:State},obj){
        let res=await api.search(obj)
        commit("allShop_MUTATIONS",res)
    }
    
}

const mutations:MutationTree<any>={
    //获取首页数据
    allShop_MUTATIONS(
        state: any,
        res: any
    ): void {
        if(res!==undefined){
           state.shopList = res.data;
        }
    },
    //获取首页banner数据
    homeShopBanner_MUTATIONS(
        state: any,
        res: any
    ): void {
        if(res!==undefined){
           state.bannerList = res.data;
        }
    }
}

const getters:GetterTree<State,any>={
    // 首页数据
    allShop_GETTERS(
        state: any
    ): void {
        return state.shopList
    },
    // 首页banner数据
    homeShopBanner_GETTERS(
        state: any
    ): void {
        return state.bannerList
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}