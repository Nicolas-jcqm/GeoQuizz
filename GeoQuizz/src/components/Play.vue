<template>

  <div class="play">
        <div class="windows">
            <p id='question'>question actuel : {{ question_actuel }} / 10</p>
            <div class="image"><img v-bind:src=images_actuel></div>
            <div id="map">
                <v-map :zoom=13 :center="[47.413220, -1.219482]">
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                <v-marker :lat-lng="[47, 0]"></v-marker>
                </v-map>
            </div>
            <button type="button" class="btn" @click="next()">Question suivante</button>
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

    Vue.component('v-map', Vue2Leaflet.Map);
    Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
    Vue.component('v-marker', Vue2Leaflet.Marker);

    export default {

        computed: {
            ...mapState(['question_actuel','images_actuel','serie_actuel','score_final','coordonné_actuel'])
        },

        created() {
            //dispatch
            this.$store.dispatch('created_data')
        },
        methods: {
            
            next(){
                console.log("next_question")
                //recupere le marqueur
                
                //calculer la distance entre marqueur et les coordonnées
                let distance_calcule = 0
                //dispatch
                this.$store.dispatch('next_question', distance_calcule)
                
                //reset le markeur
            }
        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import "../../node_modules/leaflet/dist/leaflet.css";
    
    #map{
        width: 500px;
        height: 500px;
        margin: auto;
    }
    
    .image{
        width: 500px;
        height: 500px;
        margin: auto;
    }
    
    .windows{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    #question{
        width: 100%;
    }
    
    .btn{
        margin-top : 50px;
        width: 80%;
    }

</style>
