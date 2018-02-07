import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {},
    state: {
        Pseudo:"",
        OSeries: [],
        question_actuel: 0,
        images_actuel: 0,
        serie_actuel: 0,
        score_final: 0,
        coordonné_actuel: 0,
        Difficulty: 1,
        images: ["http://via.placeholder.com/350x200", "http://via.placeholder.com/350x150", "http://via.placeholder.com/400x150", "http://via.placeholder.com/350x150"],
        jeux: {},
    },
    getters: {},
    mutations: {
        createQuestionnaire(state, listephotos){
            for (var i = listephotos.length - 1; i >= 0; i--) {
                //en cours, remplir les données pour play listephotos[i]
            }
        },
        logGame(state, pseudo){
            state.Pseudo= pseudo
        },

        getSerie(state, listeserie){
            state.OSeries=listeserie
        },

        createPartieGame(state, partie){
            state.jeux=partie
        },

        initQuestion(state) {
            state.question_actuel = 1
        },
        nextQuestion(state) {
            state.question_actuel = state.question_actuel + 1
        },
        changeImage(state) {
            state.images_actuel = state.images[state.question_actuel - 1]
        },
        changeScore(state, score) {
            state.score_actuel = state.score_actuel + score
        },
        setDifficulty(state, difficulty){
            state.Difficulty= difficulty
        }
    },
    actions: {
        setDifficulty({commit, state}, difficulty){
            commit('setDifficulty', difficulty)
        },

        logStore({
            commit, state
        },pseudo){
            api.get('series',{}).then(response=>{
                commit('getSerie', response.data)
            })
            commit('logGame',pseudo)
        },
        createPartieStore({
            commit, state
        },idserie){
            api.get('parties/'+idserie,{params:{
                joueur: state.Pseudo,
                photo: state.Difficulty*10
            }}).then(response=>{
                commit('createPartieGame', response.data)    
            })
            api.get('serie/'+idserie,{
                params:{

                }
            }).then(response=>{
                commit('createQuestionnaire', response.data)
            })
        },

        created_data({
            commit,
            state
        }) {
            console.log("Itinialisation des donnes")
            console.log(state.images_actuel)
            //initialisé la question
            commit('initQuestion')
            //initialisé l'images
            commit('changeImage')
            //initialisé les coordonnées

        },

        next_question({
            commit,
            state
        }, distance_calcule) {
            //calcul le score

            //passé a la question suivante
            commit('nextQuestion')
            //change l'image
            commit('changeImage')
            //actualisé les coordonnées du prochain point

        }
    }
});
