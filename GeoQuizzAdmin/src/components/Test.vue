<template>
	<div id="container">
		<div id="series">
      <h1>{{user.mail}}</h1>
			<button  v-on:click="logout()">déconnexion</button>
			<h2>Series</h2>
      <p v-for="ser in series" class="series">
				<router-link :to="{ path: '/test/' + serie._id }">{{serie.label}}</router-link>
			</p>
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
      api.get('/series/admin',{"userid":sessionStorage.getItem("userid")}).then((response)=>{
        this.series= response.data;

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
  button{
	width:60%;
	margin: auto;
	margin-bottom:2px;
}
button{
	display: block;
color: white;
padding: 8px 16px;
text-decoration: none;
background-color:Tomato;
}
button:hover{
	background-color:Maroon;
}
</style>
