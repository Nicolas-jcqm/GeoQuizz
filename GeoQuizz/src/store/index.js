import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
    },
    state: {
        Pseudo:""
    },
    getters: {
    },
    mutations: {
        logGame(state, pseudo){
            state.Pseudo: pseudo
        }
    },
    actions: {
    }
});
