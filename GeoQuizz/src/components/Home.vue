<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img id="logo" src="../assets/map.png">
    <div v-if="Pseudo==''">
      <form @submit.prevent="log()" class="form-sign">
        <label>Votre pseudo pour cette session de jeu : </label>
        <input ref="pseudo" id="pseudo" />
        <br>
        <br>
        <input type="submit"class="btn-blue" value="Jouer"></input>
      </form>
    </div>
    <div v-else>
    <div v-for></div>
      <h2>Cliquez sur une série pour lancer la partie</h2>
      <label>Difficulté : </label>
      {{Difficulty}}
      <select ref="select">
        <option v-if="Difficulty==1" value=1 selected="selected">Facile</option>
        <option v-else value=1>Facile</option>
        <option v-if="Difficulty==2" value=2 selected="selected">Intermédiaire</option>
        <option v-else value=2>Intermédiaire</option>
        <option v-if="Difficulty==3" value=3 selected="selected">Difficile</option>
        <option v-else value=3>Difficile</option>
      </select>
      <div v-for="serie in OSeries">
        <a v-on:click="createPartie(serie.id)" href="#"><h1>{{serie.ville}}</h1></a>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'  
import api from '@/api'
import Vuex from 'vuex'
import {
  mapActions
} from 'vuex'
import {
  mapState
} from 'vuex'
export default {
  computed:{
    ...mapState(['Pseudo', 'OSeries', 'Difficulty'])
  },

  name: 'Home',
  data () {
    return {
      msg: 'GeoQuizz',
    }
  },
  methods:{

    log(){
      this.$store.dispatch('logStore',this.$refs.pseudo.value);
    },

    createPartie(idserie){
      this.$store.dispatch('setDifficulty', this.$refs.select.value),
      this.$store.dispatch('createPartieStore', idserie)
      this.$router.push({name: "Play"})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
  color: Lightsteelblue; }
  .btn-blue a {
    color: Lightsteelblue; }
  .btn-blue:hover {
    color: Tomato;
    border-color: Tomato; }
    .btn-blue:hover a {
      color: #DDDDDD; }
  .btn-blue:active {
    color: Lightsteelblue;
    border-color: Lightsteelblue; }
</style>
