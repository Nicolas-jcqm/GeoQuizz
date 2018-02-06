import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {},
    state: {
        question_actuel: 0,
        images_actuel: 0,
        serie_actuel: 0,
        score_final: 0,
        coordonné_actuel: 0,
        images: ["http://via.placeholder.com/350x200", "http://via.placeholder.com/350x150", "http://via.placeholder.com/400x150", "http://via.placeholder.com/350x150"],
        jeux: {},
    },
    getters: {},
    mutations: {
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
        }
    },
    actions: {

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
