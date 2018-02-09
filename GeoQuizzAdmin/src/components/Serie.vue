<template>
  <div>
    <h1> {{series.filter( (ser) => ser._id === idSeries)[0].label}}</h1>
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
      api.get("/series/"+this.idSerie).then((response)=>{
      this.series=response.data
      })
    }
  }
</script>
