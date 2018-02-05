<template>
	<div id="container">
		<div id="series">
			<button  v-on:click="logout()">déconnexion</button>
			<h2>Séries</h2>
			<p id="add">
					<router-link :to="{ path: '/' }">Créer une Série</router-link>
			</P>
			<p v-for="ser in series" class="ser">
				<router-link :to="{ path: '/' + ser._id }">{{ser.label}}</router-link>
			</p>

		</div>
		<div id="right">
			<router-view :key="$route.fullPath"></router-view>
		</div>
	</div>
</template>
<script>
import api from '@/api'
import ls from '@/services/ls'
export default {
	data () {
		return {
			series: []
		}
	},
	methods:{
		logout(){
				this.$store.dispatch('auth/logout',true);
				this.$router.push({path:'/'});
		}
	},
	created () {
		api.get('/series').then((response) => { // changer le get
			this.series = response.data
		});
	},
	computed: {
		hasSeries () {
			return this.series.length > 0
		}
	}
}
</script>


<style lang="css" scoped>
	#container {
		height: 100%;
		width: 100%;
		display: flex;
	}
	#series {
	list-style-type:none;
 margin: 0;
 padding: 0;
 width: 25%;
 background-color: #f1f1f1;
 position: fixed;
 height: 100%;
 overflow: auto;
	}
	h2 {
		color:grey;
		text-align: center;
		margin: 0;
		padding-bottom: 5px;
		padding-top: 5px;
		border-bottom: 2px solid deepskyblue;
	}

	.ser {
	margin:0;
	}
	.ser a{
		display: block;
 	color: #000;
 	padding: 8px 16px;
 	text-decoration: none;
	}
 	.ser a:hover{
    background-color:deepskyblue;
    color: white;
}
button{
	width:60%;
	margin: auto;
	margin-bottom:2px;
}
#add {
margin:0;
margin-bottom:2px;
}
button,#add a{
	display: block;
color: white;
padding: 8px 16px;
text-decoration: none;
background-color:deepskyblue;
}
button:hover,#add a:hover{
	background-color:dodgerblue;
}
#right{
width:75%;
height:100%;
 margin-left:25%;
 padding:1px 16px;
}
</style>
