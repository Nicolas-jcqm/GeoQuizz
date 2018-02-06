import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {},
    state: {
        jeux_finit: 0,
        question_total: 0,
        Pseudo:"",
        OSeries: {"series":[{
            "id": "idNancy",
            "ville": "Nancy"
        },{
            "id": "idParis",
            "ville": "Paris"
        }]
        },
        question_actuel: 0,
        images_actuel: 0,
        serie_actuel: 0,
        score_final: 0,
        coordonne_actuel_lat: 0,
        coordonne_actuel_long: 0,
        jeux: [{
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 10,
                "long": 30,
                image: "http://via.placeholder.com/310x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            },
            {
                "lat": 13,
                "long": 49,
                image: "http://via.placeholder.com/350x200"
            }]
    },

    getters: {},
    mutations: {

        initJeux(state, total) {
            state.jeux_finit = 0
        },
        jeuxEnd(state) {
            state.jeux_finit = 1
        },

        logGame(state, pseudo){
            state.Pseudo= pseudo
        },

        createPartieGame(state, listepartie){
            state.parties=listepartie
        },
  
        initQuestion(state, total) {
            state.question_actuel = 1
            state.question_total = total
        },
        nextQuestion(state) {
            state.question_actuel = state.question_actuel + 1
        },
        changeImage(state) {
            state.images_actuel = state.jeux[state.question_actuel - 1].image;
        },
        changeScore(state, score) {
            state.score_actuel = state.score_actuel + score
        },
        changeCoorLong(state, coor_lat) {
            state.coordonne_actuel_lat = state.jeux[state.question_actuel - 1].long;
        },
        changeCoorLat(state, coor_long) {
            state.coordonne_actuel_long = state.jeux[state.question_actuel - 1].lat;
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
        },

        created_data({
            commit,
            state
        }) {
            console.log("Itinialisation des donnes")
            console.log(state)
            //initialisé la question
            commit('initQuestion', 10)
            //initialisé l'images
            commit('changeImage')
            //initialisé les coordonnées
            commit('changeCoorLong', 30)
            commit('changeCoorLat', 20)

        },

        next_question({
            commit,
            state
        }, distance_calcule) {
            if (state.question_actuel >= state.question_total) {
                console.log("Jeux terminé")
                commit('jeuxEnd')
            } else {
                //calcul le score

                //passé a la question suivante
                commit('nextQuestion')
                //change l'image
                commit('changeImage')
                console.log(state.question_actuel)
                console.log(state.question_total)
                console.log(state.jeux_finit)
                //actualisé les coordonnées du prochain point   
            }

        }
    }
});
