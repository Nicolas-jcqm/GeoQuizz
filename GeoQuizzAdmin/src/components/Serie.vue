<template>
  <div>
    <h1> {{series.filter( (ser) => ser._id === idSeries)[0].nom}}</h1>
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
      alert("test");
      api.get("/series/"+this.idSerie).then((response)=>{
      this.series=response.data
      }).catch((error) =>{
      alert("La serie auquel vous essayez d'accéder n'existe pas !")
      })
    }
  }
</script>
