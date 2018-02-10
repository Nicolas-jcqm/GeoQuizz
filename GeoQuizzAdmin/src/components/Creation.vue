<template>
  <div id="formule" @submit="add()">
    <h1> Créer une Série</h1>
    <form>
      <div>
        <label for="nom">Nom de la série</label>
        <input type="text" v-model="series.serie.nom" id="nom" name="ville"  required>
      </div>
      <div>
      <label for="description">Zoom</label>
      <input type="number" v-model="series.serie.zoom" id="zoom" name="zoom"  required>
      </div>
      <div>
        <label for="distance">Distance</label>
       <input type="number" v-model="series.serie.distance" id="distance" name="distance" required>
      </div>
      <div>
        <label for="ville">Ville</label>
       <input type="text" v-model="series.serie.ville" id="ville" name="ville" required>
      </div>
      <div>
        <label for="latitude">Latitude</label>
       <input type="number" step="0.01" v-model="series.serie.latitude" id="latitude" name="latitude" required>
      </div>
      <div>
        <label for="longitude">Longitude</label>
       <input type="number" step="0.01"  v-model="series.serie.longitude" id="longitude" name="longitude" required>
      </div>
      <div>
      <input type="submit" value="Ajouter">
     <p class="text-left">N'oublier pas d'ajouter 10 points à votre série</p>
     </div>
    </form>
  </div>
</template>
<script>
import api from "@/config"
export default {
  name: 'Creation',
  data(){
  return{
    series:{serie:{nom:"",ville:"",latitude:"",longitude:"",userid:"",zoom:"",distance:"",listePhotos:[]}}
  }
  },
  methods:{
    add(){
    userid=sessionStorage.getItem("userid");
      api.post("/series",this.serie,{headers: { 'content-type': 'application/json' }}).then((response)=>{
          console.log(response.data);
      })
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
