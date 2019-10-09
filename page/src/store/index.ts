import Vuex from 'vuex';
import Vue from 'vue';
import login from './modules/login/';
import type from './modules/type/'
import home from "./modules/home/"
Vue.use(Vuex);

const store =({
   modules:{
        login,
        home,
        type
   }
})

export default new Vuex.Store(store);