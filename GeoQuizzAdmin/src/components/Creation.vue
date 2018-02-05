<template>
	<div id="formule">
		<h1>Créer une Série</h1>
		<form @submit.prevent="createSer()">
			<div>
				<label for="label">Nom</label>
				<input v-model="serieData.nom" id="nom" type="text">
			</div>
			<div>
				<label for="nom">Ville</label>
				<input v-model="serieData.ville" id="ville" type="text">
			</div>
      <div>
				<label for="nom">latitude</label>
				<input v-model="serieData.latitude" id="latitude" type="text">
			</div>
      <div>
				<label for="nom">Ville</label>
				<input v-model="serieData.longitude" id="longitude" type="text">
			</div>
      <div>
				<label for="nom">Images</label>

			</div>
			<div><input type="submit" value="Create"></div>
		</form>
	</div>
</template>

<script>
import ls from '@/services/ls'
import api from '@/api'
export default {
	data () {
		return {
			serieData: {nom: '', ville: '',latitude:'',longitude:''}
		}
	},
	methods: {
		createSer () {
			/*
			this.$store.dispatch('Ser/createSer', this.serieData).then(response => {
				this.$router.push({path: '/'})
			})
			*/arguments
			let params = {
                token: ls.get('token'),
                nom: this.serieData.nom,
                ville: this.serieData.ville,
                latitude: this.serieData.latitude,
                longitude: this.serieData.longitude
            }
            api.post('/series', params).then(response => { // route a changer
				this.$router.push({path: '/' + response.data._id})
			}).catch(error => {
				alert("Une série  ayant déjà ce nom existe déjà !")
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
	color:deepskyblue;
}
input[type=text] {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		box-sizing: border-box;
}
input[type=submit] {
		background-color: deepskyblue;
		color: white;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		cursor: pointer;
		width: 100%;
}
</style>
