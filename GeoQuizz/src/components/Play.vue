<template>
  <div class="play">
        <div class="windows">
            <p>question actuel : {{ question_actuel }} / 10</p>
            <p>{{ name }}</p>
            <div class="image"></div>
            <div class="map"></div>
        </div>
  </div>
</template>

<script>
    import api from '@/api'
    import Vuex from 'vuex'
    import {
        mapActions
    } from 'vuex'
    import {
        mapState
    } from 'vuex'

    export default {

        computed: {
            ...mapState(['name'])
        },

        created() {

        },
        methods: {}

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
