<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="true">
      <form @submit.prevent="log()" class="form-sign">
        <label>Votre pseudo pour cette session de jeu : </label>
        <input v-model="pseudo" ref="pseudo" v-validate:comment="['required']" id="pseudo" />
        <br>
        <br>
        <input v-if="" type="submit"class="btn-blue" value="Jouer"></input>
      </form>
    </div>
    <div v-else>
      
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    ...mapState(['Pseudo'])
  },

  name: 'Home',
  data () {
    return {
      msg: 'GeoQuizz',
    }
  },
  methods:{
    log(){
      this.$store.commit('logGame',this.$refs.pseudo.value);
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
