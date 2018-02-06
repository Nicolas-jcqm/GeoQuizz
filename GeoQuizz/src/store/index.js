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
        Pseudo:"",
        OSeries: {"series":[{
            "id": "idNancy",
            "ville": "Nancy"
        },{
            "id": "idParis",
            "ville": "Paris"
        }]
        },
        question_actuel: 0, //donné en brut
        images: {},
        name: 'test'
    },
    getters: {
    },
    mutations: {
        logGame(state, pseudo){
            state.Pseudo= pseudo
        },
        createPartieGame(state, listepartie){
            state.parties=listepartie
        }
    },
    actions: {
        logStore({
            commit, state
        },pseudo){
            commit('logGame',pseudo)
        },
        createPartieStore({
            commit, state
        },idserie){
            api.get('parties/'+idserie);
            commit('createPartieGame')
        }
    }
});
