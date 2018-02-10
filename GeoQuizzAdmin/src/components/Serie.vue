<template>
  <div>
  <div id="formule">
    <h1> {{series.nom}}</h1>
    <form @submit.prevent="putSerie()" class="form-sign">
        <div>
        <label>Nom de la série : </label>
        <input type="text" ref="nom" :value="series.nom" />
        </div>
        <div>
        <label>Latitude : </label>
        <input type="number" ref="latitude" :value="series.latitude" />
        </div>
        <div>
        <label>Longitude : </label>
        <input type="number" ref="longitude" :value="series.longitude" />
        </div>
        <div>
        <label>Distance : </label>
        <input type="number" ref="distance" :value="series.distance" />
        </div>
        <div>
        <label>Ville : </label>
        <input type="text" ref="ville" :value="series.ville" />
        </div>
        <div>
        <label>Zoom : </label>
        <input type="number" ref="zoom" :value="series.zoom" />
        </div>
        <input type="submit"class="btn btn-5" value="Modifier une des valeurs"></input>
      </form>
      </div>
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
<style>
#formule{
border:3px solid #f1f1f1;
width:50%;
margin:0 auto 0 auto;
text-align:center;
margin-top: 50vh;
 transform: translateY(-50%);
}
#formule h1{
	color:Tomato;
}
input[type=text],input[type=number] {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		box-sizing: border-box;
}
input[type=submit] {
		background-color: Tomato;
		color: white;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		cursor: pointer;
    width: 100%;
}
input[type=submit]:hover{
background-color:Maroon;
}
</style>
