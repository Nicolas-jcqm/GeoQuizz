<template>
  <div>
    <h1> {{series}}</h1>
    <form @submit.prevent="putSerie()" class="form-sign">
        <label>Nom de la série : </label>
        <input ref="nom" :value="series.nom" />
        <label>Latitude : </label>
        <input ref="latitude" :value="series.latitude" />
        <label>Longitude : </label>
        <input ref="longitude" :value="series.longitude" />
        <label>Distance : </label>
        <input ref="distance" :value="series.distance" />
        <label>Ville : </label>
        <input ref="ville" :value="series.ville" />
        <label>Zoom : </label>
        <input ref="zoom" :value="series.zoom" />
        <br>
        <br>
        <input type="submit"class="btn btn-5" value="Modifier une des valeurs"></input>
      </form>
  </div>
</template>
<script>
  import api from "@/config"
  export default{
    data(){
      return{
      idSerie:"",
      series: []
      }
    },
    created(){
      this.idSerie=this.$route.params.id
      console.log("test:"+this.idSerie);
      //alert("test");
      api.get("/series/"+this.idSerie).then((response)=>{
      this.series=response.data
      }).catch((error) =>{
      alert("La serie auquel vous essayez d'accéder n'existe pas !")
      })
    },
    methods : {
      putSerie(){
        console.log(this.$refs)
        //api.put("/series/"+this.idSerie)
      }
    }
  }
</script>
