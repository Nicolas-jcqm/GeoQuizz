<template>

  <div class="play">
        <div class="windows" v-if="jeux_finit == 0">
            <div class='info'>
                <div id='info_unique'>question actuel : {{ question_actuel }} / {{ question_total }}</div>
                <div id='info_unique'>Score actuel : {{ score_actuel }}</div>
                <div id='timer'>Timer : {{ affichage_inter }}</div>
            </div>
            <div class="image"><img v-bind:src="jeux[question_actuel-1].url"></div>
            <div id="map">
            <div id="app" style="height: 100%">
            <v-map @l-click="onclick($event)" :zoomControl=false :zoom=13 :center='center'>
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                <v-marker :lat-lng="marker"></v-marker>
                <v-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng" @l-add="$event.target.openPopup()"></v-marker>
            </v-map>
            </div>
            </div>
            <button type="button" class="btn btn-rep btn-3" @click="next()">Question suivante</button>
        </div>
        <div class="windows" v-else>
            <div class="jeux">Jeux terminé</div>
            <button type="button" class="btn btn-4" @click="retour()">Retourner au menu</button>
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
            ...mapState(['question_actuel', 'OSeries', 'question_total', 'images_actuel', 'center', 'score_actuel', 'jeux_finit', 'serie', 'jeux', 'marker'])
        },

        data() {
            return {
                zoom: 13,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                markers: [],
                affichage_inter: 2, // a definir
                inter: 0,
                intervall_souhaite: 2 // a definir
            }
        },


        created() {
            //dispatch
            this.$store.dispatch('created_data')
            this.interval()
        },
        methods: {

            onclick(event) {
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
                //console.log("hello")
                //console.log(this.serie)
                if (this.markers.length == 0) {
                    let conf = confirm("Voulez vous passer cette question!");
                    if (!conf) {
                        //on fait rien
                    } else {
                        this.resetTimer(0)
                    }
                } else {
                    //calculer la distance entre marqueur et les coordonnées
                    //console.log(this.markers[0].latlng.lat)
                    let distance_calcule = this.distance(this.jeux[this.question_actuel].latitude, this.markers[0].latlng.lat, this.jeux[this.question_actuel].longitude, this.markers[0].latlng.lng)
                    //console.log(distance_calcule)
                    //dispatch
                    this.resetTimer(distance_calcule)
                }
                //reset le markeur
                this.markers = []

            },

            distance(lat1, lat2, lon1, lon2) {
                var R = 6378000; //Rayon de la terre en mètre
                var lat_a = (Math.PI * lat1) / 180;
                var lon_a = (Math.PI * lon2) / 180;
                var lat_b = (Math.PI * lat2) / 180;
                var lon_b = (Math.PI * lon2) / 180;
                var d = R * (Math.PI / 2 - Math.asin(Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)))
                return d;
            },

            interval() {
                console.log('null : '+id_timer)
                let id_timer = setInterval(() => {
                    this.inter++
                        this.affichage_inter--
                        this.testEnd(id_timer)
                }, 1000);
            },

            testEnd(id) {
                if (this.inter === this.intervall_souhaite) {
                    if (this.question_actuel > this.question_total) {
                        //Jeux finit 
                        this.inter = 0
                        this.affichage_inter = this.intervall_souhait
                        window.clearInterval(id)
                    } else {
                        //question suivante
                        this.resetTimer(0)
                    }
                }

            },

            resetTimer(dist) {
                this.inter = 0
                this.affichage_inter = this.intervall_souhaite
                this.$store.dispatch('next_question', dist)
            },

            retour() {
                this.$store.dispatch('reset_state')
                this.$router.push({
                    path: '/'
                })
            }

        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../../node_modules/leaflet/dist/leaflet.css";
    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .btn-blue {
        background-color: transparent;
        border: 0.16em solid Lightsteelblue;
        color: Lightsteelblue;
    }

    .btn-blue a {
        color: Lightsteelblue;
    }

    .btn-blue:hover {
        color: Tomato;
        border-color: Tomato;
    }

    .btn-blue:hover a {
        color: #DDDDDD;
    }

    .btn-blue:active {
        color: Lightsteelblue;
        border-color: Lightsteelblue;
    }


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

    .jeux {
        height: 300%;
        width: 100%;
        margin: auto;
        vertical-align: middle;
    }

    .info {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    html,
    body {
        height: 100%;
    }

    body {
        background: #efefef;
        color: #121221;
        font: 700 14px Montserrat, sans-serif;
        letter-spacing: 0.125em;
        text-align: center;
        text-transform: uppercase;
    }

    h1 {
        margin: 3em 0 2em;
    }

    .btn {
        background: none;
        border: 2px solid;
        border-bottom-width: 4px;
        font: inherit;
        letter-spacing: inherit;
        margin: 1em;
        padding: 1em 2em;
        text-transform: inherit;
        transition: color 1s;
    }

    .btn-1 {
        color: #9c89f7;
    }

    .btn-1:hover {
        animation: halftone 1s forwards;
        background: radial-gradient(circle, #9c89f7 0.2em, transparent 0.25em) 0 0 / 1.25em 1.25em, radial-gradient(circle, #9c89f7 0.2em, transparent 0.25em) 6.25em 6.25em / 1.25em 1.25em;
        color: #e4f789;
    }

    @keyframes halftone {
        100% {
            background-size: 2.375em 2.375em, 0.1em 0.1em;
        }
    }

    .btn-2 {
        color: #82f6d8;
    }

    .btn-2:hover {
        animation: stripes-move 0.75s infinite linear;
        background: repeating-linear-gradient(45deg, #82f6d8 0, #82f6d8 0.25em, transparent 0.25em, transparent 0.5em);
        color: #f682a0;
    }

    @keyframes stripes-move {
        100% {
            background-position: 5em 0px;
        }
    }

    .btn-3 {
        color: #d3f169;
    }

    .btn-3:hover {
        animation: sawtooth 0.35s infinite linear;
        background: linear-gradient(45deg, #d3f169 0.5em, transparent 0.5em) 0 0 / 1em 1em, linear-gradient(-45deg, #d3f169 0.5em, transparent 0.5em) 0 0 / 1em 1em;
        color: #8769f1;
    }

    @keyframes sawtooth {
        100% {
            background-position: 1em 0;
        }
    }

    .btn-4 {
        color: #eea163;
    }

    .btn-4:hover {
        animation: zigzag 1s linear infinite;
        background: linear-gradient(135deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) -0.5em 0, linear-gradient(225deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) -0.5em 0, linear-gradient(315deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) 0 0, linear-gradient(45deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) 0 0;
        background-size: 0.75em 0.75em;
        color: #63b0ee;
    }

    @keyframes zigzag {
        100% {
            background-position: 1em 0, 1em 0, -0.75em 0, -0.75em 0;
        }
    }

    .btn-5 {
        color: #7cf07f;
    }

    .btn-5:hover {
        animation: blinds 0.75s linear forwards;
        background: linear-gradient(0deg, #7cf07f 25%, transparent 25%) 0 0 / 0.5em 0.5em, linear-gradient(0deg, #88d6f3 50%, transparent 50%) 0 0 / 1em 1em;
        color: #f07ced;
    }

    @keyframes blinds {
        100% {
            background-position: 0 0, 0 -3em;
            background-size: 0 0, 1em 6em;
        }
    }

    .btn-6 {
        color: #f9879b;
    }

    .btn-rep {
        margin-top: 200px;
    }

    .btn-6:hover {
        animation: pulse 1s ease-in infinite;
        background: radial-gradient(circle, rgba(249, 135, 155, 0.25) 43%, transparent 50%) 0 0 / 1em 1em, radial-gradient(circle, rgba(249, 135, 155, 0.25) 43%, transparent 50%) 0.5em 0.5em / 2em 2em;
        color: #0bdcb7;
    }

    @keyframes pulse {
        50% {
            background-position: 0.66em 0.66em, -0.33em -0.33em;
        }
        100% {
            background-size: 2em 2em, 1em 1em;
            background-position: -1.5em -1.5em, -1em -1em;
        }
    }

</style>
