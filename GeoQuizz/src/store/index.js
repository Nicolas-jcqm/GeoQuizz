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
        center: L.latLng(48.66686499999999, 6.134240999999999),
        serie: {
            "series": [
                {
                    "id": "1",
                    "ville": "Nancy",
                    "nom": "serie1",
                    "latitude": 48.6880796,
                    "longitude": 6.1559274,
                    "distance": 500,
                    "zoom": 10,
        }
    ]
        },
        score_actuel: 0,
        Difficulty: 1,
        marker: 0,
        jeux: [
            {
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Nancy_-_palais_ducal%2C_façade_%282%29.jpg/280px-Nancy_-_palais_ducal%2C_façade_%282%29.jpg",
                "latitude": 48.697322,
                "longitude": 6.179293,
                "description": "Palais des Ducs de Lorraine"
        },
            {
                "url": "Nancy/stadeMarcelPicot.jpg",
                "latitude": 48.695675,
                "longitude": 6.210751,
                "description": "Stade Marcel Picot"
        },
            {
                "url": "Nancy/jardinBotaniqueJMPelt.jpg",
                "latitude": 48.661103,
                "longitude": 6.155104,
                "description": "Jardin Botanique Jean-Marie Pelt"
        },
            {
                "url": "Nancy/saintSebastien.jpg",
                "latitude": 48.688876,
                "longitude": 6.181254,
                "description": "Centre Commercial Saint Sebeastien"
        },
            {
                "url": "Nancy/parcSainteMarie.jpg",
                "latitude": 48.680357,
                "longitude": 6.170744,
                "description": "Parc Sainte Marie"
        },
            {
                "url": "Nancy/porteDeLaCraffe.jpg",
                "latitude": 48.699058,
                "longitude": 6.177817,
                "description": "Porte de la Craffe"
        },
            {
                "url": "Nancy/placeCarriere.jpg",
                "latitude": 48.695714,
                "longitude": 6.182259,
                "description": "Place Carriere"
        },
            {
                "url": "Nancy/museeBeauxArts.jpg",
                "latitude": 48.69363,
                "longitude": 6.182112,
                "description": "Musee des Beaux-Arts"
        },
            {
                "url": "Nancy/placeStanislas.jpg",
                "latitude": 48.693611,
                "longitude": 6.183156,
                "description": "Place Stanislas"
        },
            {
                "url": "Nancy/cathedraleNancy.jpg",
                "latitude": 48.691525,
                "longitude": 6.186118,
                "description": "Cathédrale de Nancy"
        }]
    },

    getters: {},
    mutations: {

        createQuestionnaire(state, listephotos) {
            state.jeux = listephotos
        },

        setCurrentSerie(state, objserie) {
            state.center = L.latLng(objserie.map_latitude, objserie.map_longitude);

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
            state.images_actuel = state.jeux[state.question_actuel - 1].image
        },
        calculScore(state, distance_calcule) {
            if (distance_calcule === 0) {
                state.score_actuel = state.score_actuel + 1
            } else {
                if (state.serie.series[0].distance / state.Difficulty > distance_calcule) {
                    state.score_actuel = state.score_actuel + 100
                } else {
                    if ((state.serie.series[0].distance / state.Difficulty) * 2 > distance_calcule) {
                        state.score_actuel = state.score_actuel + 50
                    } else {
                        if ((state.serie.series[0].distance / state.Difficulty) * 4 > distance_calcule) {
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
            state.center = L.latLng(48.66686499999999, 6.134240999999999)
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
            commit('resetScore')
            //reset score
            commit('changeImage')
            //initialisé les coordonnées
            commit('changeCoor')

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
