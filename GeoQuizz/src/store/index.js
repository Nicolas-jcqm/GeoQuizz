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
        center: 0,
        serie: 0,
        score_final: 0,
        Difficulty: 1,
        marker: 0,
        jeux: [{
                "lat": 48.6914558,
                "long": 6.1805204,
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

        createQuestionnaire(state, listephotos) {
            for (var i = listephotos.length - 1; i >= 0; i--) {
                state.jeux[i].lat = listephotos[i].lattitude;
                state.jeux[i].long = listephotos[i].longitude;
                state.jeux[i].image = listephotos[i].image;
                //en cours, remplir les données pour play listephotos[i]
            }
        },
        setCurrentSerie(state, objserie) {
            state.serie = objserie;
            state.center = [objserie.map_latitude, objserie.map_longitude];
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

        getSeries(state, listeserie) {
            state.OSeries = listeserie
        },

        createPartieGame(state, listepartie) {
            state.partie = listepartie
        },

        initQuestion(state, total) {
            state.question_actuel = 1
            state.question_total = state.Difficulty * 10
        },
        nextQuestion(state) {
            state.question_actuel = state.question_actuel + 1
        },
        changeImage(state) {
            console.log(state.jeux[state.question_actuel - 1].image);
            state.images_actuel = state.jeux[state.question_actuel - 1].image
        },
        changeScore(state, score) {
            state.score_actuel = state.score_actuel + score
        },

        changeCoor(state) {
            state.serie = {
                lat: 47.413220,
                lng: -1.219482
            }
        },


        setDifficulty(state, difficulty) {
            state.Difficulty = difficulty
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
            api.get('parties/' + idserie, {
                params: {
                    joueur: state.Pseudo,
                    photo: state.Difficulty * 10
                }
            }).then(response => {
                commit('createPartieGame', response.data)
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
            commit('initJeux')
            console.log("Itinialisation des donnes")
            console.log(state)
            //initialisé la question
            commit('initQuestion', 10)
            //initialisé l'images
            commit('changeImage')
            //initialisé les coordonnées
            commit('changeCoor')

        },

        next_question({
            commit,
            state
        }, distance_calcule) {
            if (state.question_actuel >= state.question_total) {
                console.log("Jeux terminé")
                commit('nextQuestion')
                commit('jeuxEnd')
            } else {
                //calcul le score

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
