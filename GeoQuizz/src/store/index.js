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
        question_actuel: 0, //donné en brut
        images: {},
        name: 'test'
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    }
});
