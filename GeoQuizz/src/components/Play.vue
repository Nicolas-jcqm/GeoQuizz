<template>
  <div class="play">
        <div class="windows">
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
        name: 'Play',
        computed: {
            ...mapState([])
        },

        created() {

        },
        methods: {}

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
