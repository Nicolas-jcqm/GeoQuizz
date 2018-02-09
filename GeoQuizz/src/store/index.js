import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import createPersistedState from 'vuex-persistedstate'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: require('leaflet/dist/images/marker-icon.png')
})


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {},
    state: {
        jeux_finit: 0,
        question_total: 0,
        Pseudo: "",
        OSeries: [],
        question_actuel: 0,
        images_actuel: 0,
        center: L.latLng(0, 0),
        serie: {},
        score_actuel: 0,
        Difficulty: 1,
        marker: 0,
        jeux: []
    },

    getters: {},
    mutations: {

        createQuestionnaire(state, listephotos) {
            state.jeux = listephotos
        },

        setCurrentSerie(state, objserie) {
            state.serie=objserie;
            state.center = L.latLng(objserie.latitude, objserie.longitude);

        },

        initJeux(state) {
            state.jeux_finit = 0
        },

        jeuxEnd(state) {
            state.jeux_finit = 1
        },

        logGame(state, pseudo) {
            state.Pseudo = pseudo
        },

        resetScore(state) {
            state.score_actuel = 0
        },


        getSeries(state, listeserie) {
            state.OSeries = listeserie

        },

        initQuestion(state, total) {
            state.question_actuel = 1
            state.question_total = state.Difficulty * 10
        },
        nextQuestion(state) {
            state.question_actuel = state.question_actuel + 1
        },
        changeImage(state) {
            console.log(state.question_actuel)
            state.images_actuel = "http://192.168.99.100:8080/"+state.jeux.photos[state.question_actuel - 1].url
        },
        calculScore(state, distance_calcule) {
            if (distance_calcule === 0) {
                state.score_actuel = state.score_actuel + 1
            } else {
                if (state.serie.distance / state.Difficulty > distance_calcule) {
                    state.score_actuel = state.score_actuel + 100
                } else {
                    if ((state.serie.distance / state.Difficulty) * 2 > distance_calcule) {
                        state.score_actuel = state.score_actuel + 50
                    } else {
                        if ((state.serie.distance / state.Difficulty) * 4 > distance_calcule) {
                            state.score_actuel = state.score_actuel + 25
                        }
                    }
                }
            }
        },

        changeCoor(state) {
            state.marker = {
                lat: 47.413220,
                lng: -1.219482
            }
        },


        setDifficulty(state, difficulty) {
            state.Difficulty = difficulty
        },

        reset(state) {

            state.jeux_finit = 0
            state.question_total = 0
            state.Pseudo = ""
            state.OSeries = []
            state.question_actuel = 0
            state.images_actuel = 0
            state.center = L.latLng(0, 0)
            state.score_actuel = 0
            state.marker = 0
        }
    },
    actions: {
        setDifficulty({
            commit,
            state
        }, difficulty) {
            commit('setDifficulty', difficulty)
        },

        logStore({
            commit,
            state
        }, pseudo) {
            api.get('series', {}).then(response => {
                commit('getSeries', response.data)
            })
            commit('logGame', pseudo)
        },
        createPartieStore({
            commit,
            state
        }, idserie) {

            api.get('series/' + idserie, {}).then(response => {
                commit('setCurrentSerie', response.data)
            })
            api.post('parties/', {
                serie: idserie,
                joueur: state.Pseudo,
                photo: state.Difficulty * 10
            }).then(response => {
                commit('createQuestionnaire', response.data)
                commit('initQuestion', state.Difficulty * 10)
                commit('initJeux')
                console.log("Itinialisation des donnes")
                //initialisé l'images
                commit('resetScore')
                //reset score
                commit('changeImage')
                //initialisé les coordonnées
                commit('changeCoor')
                //console
                console.log(state)
            })
            /*
            api.get('series/'+idserie,{
            }).then(response=>{
                commit('createQuestionnaire', response.data)
            })*/

        },

        created_data({
            commit,
            state
        }) {

        },

        reset_state({
            commit,
            state
        }) {
            commit('reset')
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
                commit('calculScore', distance_calcule)
                //passé a la question suivante
                commit('nextQuestion')
                //change l'image
                commit('changeImage')
                //actualisé les coordonnées du prochain point 
                commit('changeCoor')
            }

        }
    }

});
