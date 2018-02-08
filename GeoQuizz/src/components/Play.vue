<template>

  <div class="play">
        <div class="windows" v-if="jeux_finit == 0">
            <div class='info'>
                <div id='info_unique'>question actuel : {{ question_actuel }} / {{ question_total }}</div>
                <div id='info_unique'>Score actuel : {{ score_final }}</div>
                <div id='timer'>Timer : {{ affichage_inter }}</div>
                <div class="progress-bar blue"></div>
            </div>
            <div class="image"><img v-bind:src="images_actuel"></div>
            <div id="map">
            <div id="app" style="height: 100%">
            <v-map :zoom=13 :center='center'>
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
            </v-map>
</div>
            </div>
            <button type="button" class="btn" @click="next()">Question suivante</button>
        </div>
        <div class="windows" v-else>
            <p>Jeux terminé</p>
            <button type="button" class="btn" @click="retour()">Retourner au menu</button>
        </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import Vue2Leaflet from 'vue2-leaflet'
    import api from '@/api'
    import Vuex from 'vuex'
    import {
        mapActions
    } from 'vuex'
    import {
        mapState
    } from 'vuex'

    import L from 'leaflet'

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconUrl: require('leaflet/dist/images/marker-icon.png')
    })


    Vue.component('v-map', Vue2Leaflet.Map)
    Vue.component('v-marker', Vue2Leaflet.Marker)
    Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
    Vue.component('v-popup', Vue2Leaflet.Popup);

    export default {
        computed: {
            ...mapState(['question_actuel', 'OSeries', 'question_total', 'images_actuel', 'center', 'score_final', 'jeux_finit', 'marker'])
        },

        data() {
            return {
                zoom: 13,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                markers: [],
                affichage_inter: 5,
                inter: 0,
                id_timer: 0
            }
        },


        created() {
            //dispatch
            this.$store.dispatch('created_data')
            this.interval()
        },
        methods: {

            onclick(event) {
                console.log(event)

                if (this.markers.length >= 1) {
                    this.markers = []
                }

                this.markers.push({
                    id: 1,
                    latlng: event.latlng,
                    content: 'Ma réponse'
                })

            },

            next() {
                console.log("next_question")
                if (this.markers.length == 0) {
                    let conf = confirm("Voulez vous passer cette question!");
                    if (!conf) {
                        //on fait rien
                    } else {
                        this.$store.dispatch('next_question', 0)
                    }
                } else {
                    //calculer la distance entre marqueur et les coordonnées
                    let distance_calcule = this.distance(this.marker.lat, this.markers[0].lat, this.marker.lng, this.markers[0].lng)
                    console.log(distance_calcule)
                    //dispatch
                    this.$store.dispatch('next_question', distance_calcule)
                }
                //reset le markeur
                this.markers = []

            },

            distance(lat1, lat2, lon1, lon2) {
                console.log("la1 : " + lat1 + "la2 : " + lat2 + "lo1 : " + lon1 + "lo2 : " + lon2)
                let R = 6371000; // meter
                let Phi1 = lat1 * Math.PI / 180;
                let Phi2 = lat2 * Math.PI / 180;
                let DeltaPhi = (lat2 - lat1) * Math.PI / 180;
                let DeltaLambda = (lon2 - lon1) * Math.PI / 180;

                let a = Math.sin(DeltaPhi / 2) * Math.sin(DeltaPhi / 2) +
                    Math.cos(Phi1) * Math.cos(Phi2) * Math.sin(DeltaLambda / 2) *
                    Math.sin(DeltaLambda / 2);
                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                let d = R * c;

                return d;
            },

            interval() {
                this.id_timer = setInterval(() => {
                    this.inter++
                        this.affichage_inter--
                        this.testEnd()
                }, 1000);
            },

            testEnd() {
                if (this.inter === 5) {
                    if (this.question_actuel > this.question_total) {
                        this.inter = 0
                        this.affichage_inter = 5

                        window.clearInterval(this.id_timer)
                    } else {
                        this.inter = 0
                        this.affichage_inter = 5
                        this.$store.dispatch('next_question', 0)
                    }
                }

            },

            retour() {
                this.$router.push({
                    path: '/'
                })
            }

        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import "../../node_modules/leaflet/dist/leaflet.css";

    #map {
        width: 500px;
        height: 500px;
        margin: auto;
    }

    .image {
        max-width: 500px;
        max-height: 500px;
        margin: auto;
    }

    .windows {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    #info_unique {
        flex-basis: 30%;
        flex-grow: 1;
    }

    #timer {
        width: 100%
    }

    .btn {
        margin-top: 50px;
        width: 80%;
    }

    .info {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    

</style>
