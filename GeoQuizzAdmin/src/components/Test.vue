<template>
	<div id="container">
		<div id="series">
      <h1>{{user.mail}}</h1>
			<button  v-on:click="logout()">déconnexion</button>
			<h2>Series</h2>
			<p id="add">
					<router-link :to="{ path: '/test' }">Créer une série</router-link>
			</P>
      <p v-for="ser in series" class="serie">
				<router-link :to="{ path: '/test/' + ser.id }">{{ser.nom}}</router-link>
			</p>
		</div>
		<div id="right">
			<router-view :key="$route.fullPath"></router-view>
		</div>
	</div>
</template>
<script>
import api from '@/config'
import router from '@/router'
  export default{
    name:'Test',
    data(){
      return{
      user: {mail:""},
      series:[]
      }
    },
    created(){
      this.user.mail=sessionStorage.getItem("mail");
      api.get('/series/admin?userid='+sessionStorage.getItem("userid")).then((response)=>{
			console.log(response.data);
        this.series= response.data.seriesUser;
      })
    },
    methods: {
      logout(){
      sessionStorage.clear();
      router.push({name:'Signup'});
    }
    }
  }
</script>
<style>
#container {
  height: 100%;
  width: 100%;
  display: flex;
}
#series {
top:0;
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
		border-bottom: 2px solid Tomato;
	}
	#add {
margin:0;
margin-bottom:2px;
}
  button{
	width:60%;
	margin: auto;
	margin-bottom:2px;
}
button,#add a{
	display: block;
color: white;
padding: 8px 16px;
text-decoration: none;
background-color:Tomato;
}
button:hover,#add a:hover{
	background-color:Maroon;
}


.serie {
	margin:0;
	}
	.serie a{
		display: block;
 	color: #000;
 	padding: 8px 16px;
 	text-decoration: none;
	}
 	.serie a:hover{
    background-color:Tomato;
    color: white;
}
#right{
width:75%;
height:100%;
margin-left:25%;
padding:1px 16px;
}
</style>
