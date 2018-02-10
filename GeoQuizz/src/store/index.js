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
        distance_tab: [],
        score_tab: [],
        mutliplicateurs: [],
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
            state.serie = objserie;
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

        enrDist(state, payload) {
            if (payload.key1 == 0) {
                state.distance_tab.push('Question passé, 0')
            } else {
                state.distance_tab.push(Math.round(payload.key1))
            }
        },

        enrScore(state, score) {
            state.score_tab.push(score)
        },

        initQuestion(state, total) {
            state.question_actuel = 1
            state.question_total = 10
        },
        nextQuestion(state) {
            state.question_actuel = state.question_actuel + 1
        },
        changeImage(state) {
            state.images_actuel = "http://192.168.99.100:8080/" + state.jeux.photos[state.question_actuel - 1].url
        },
        calculScore(state, payload) {
            let score_inter = 0;
            console.log(payload)
            let multpiplicateur = 0
            if (payload.key2 > 10) {
                multpiplicateur = payload.key2 / 10;
            } else {
                multpiplicateur = 1
            }
            if (payload.key1 === 0) {
                state.score_actuel = state.score_actuel + 1
                state.score_tab.push(1)
                state.mutliplicateurs.push('aucun')
                
            } else {
                
                if ((state.serie.distance / state.Difficulty) / 4 > payload.key1) {
                    score_inter = Math.round((350 * multpiplicateur))
                    state.score_actuel = state.score_actuel + score_inter
                    //enregistre le dernier score
                    state.score_tab.push(score_inter)
                    state.mutliplicateurs.push(multpiplicateur)
                } else {
                    if ((state.serie.distance / state.Difficulty) / 3 > payload.key1) {
                        score_inter = Math.round((250 * multpiplicateur))
                        state.score_actuel = state.score_actuel + score_inter
                        //enregistre le dernier score
                        state.score_tab.push(score_inter)
                        state.mutliplicateurs.push(multpiplicateur)
                    } else {
                        if ((state.serie.distance / state.Difficulty) / 2 > payload.key1) {
                            score_inter = Math.round((200 * multpiplicateur))
                            state.score_actuel = state.score_actuel + score_inter
                            //enregistre le dernier score
                            state.score_tab.push(score_inter)
                            state.mutliplicateurs.push(multpiplicateur)
                        } else {
                            if (state.serie.distance / state.Difficulty > payload.key1) {
                                score_inter = Math.round((100 * multpiplicateur))
                                state.score_actuel = state.score_actuel + score_inter
                                //enregistre le dernier score
                                state.score_tab.push(score_inter)
                                state.mutliplicateurs.push(multpiplicateur)
                            } else {
                                if ((state.serie.distance / state.Difficulty) * 2 > payload.key1) {
                                    score_inter = Math.round((50 * multpiplicateur))
                                    state.score_actuel = state.score_actuel + score_inter
                                    //enregistre le dernier score
                                    state.score_tab.push(score_inter)
                                    state.mutliplicateurs.push(multpiplicateur)
                                } else {
                                    if ((state.serie.distance / state.Difficulty) * 4 > payload.key1) {
                                        score_inter = Math.round((25 * multpiplicateur))
                                        state.score_actuel = state.score_actuel + score_inter
                                        //enregistre le dernier score
                                        state.score_tab.push(score_inter)
                                        state.mutliplicateurs.push(multpiplicateur)
                                    } else {
                                        state.score_tab.push(10)
                                        state.mutliplicateurs.push('aucun')
                                    }
                                }
                            }
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
            state.distance_tab = []
            state.score_tab = []
            state.mutliplicateurs = []
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
                photo: 10
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

        reset_state({
            commit,
            state
        }) {
            commit('reset')
        },

        putScore({
            commit,
            state
        }, score) {
            api.put('parties/score?token=' + state.jeux.partie.token, {
                score: "" + state.score_actuel
            })
        },

        next_question({
            commit,
            state
        }, payload) {
            if (state.question_actuel === state.question_total) {
                console.log("dernier question")
                //calcul le score
                commit('calculScore', payload)
                //enregistre le dernier distance
                commit('enrDist', payload)
                //On passe a la prochaine question pour arreter le jeux
                commit('nextQuestion')
                //on passe la variable jeux a 1
            }
            if (state.question_actuel < state.question_total) {
                //calcul le score
                commit('calculScore', payload)
                //enregistre le dernier distance
                commit('enrDist', payload)
                //passé a la question suivante
                commit('nextQuestion')
                //change l'image
                commit('changeImage')
                //actualisé les coordonnées du prochain point 
                commit('changeCoor')
            }
            if (state.question_actuel > state.question_total) {
                api.put('parties/status', {
                    token: state.jeux.partie.token,
                    estEnCours: false
                })
                commit('jeuxEnd')
            }
        }

    }

});
