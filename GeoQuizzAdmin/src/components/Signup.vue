<template>
  <div class="hello">
    <img id="logo" src="../assets/map.png">
    <h1>{{ msg }}</h1>
    <div id="formulaire">
      <h2>Connexion</h2>
      <form @submit.prevent="signin()">
        <div>
          <label>Mail :</label>
          <input v-model="user.mail" id="mail" type="text" />
        </div>
        <div>
          <label>Password :</label>
          <input  v-model="user.password" id="password" type="password" />
        </div>
        <div ><input class="btn-blue" type="submit" value="Connexion"/></div>
    </form>
  </div>
      <div id="formulaire">
        <h2>Inscription</h2>
        <form @submit.prevent="signup()">
          <div>
            <label>Username :</label>
            <input v-model="user_signup.username" id="username_signup" type="text" />
          </div>
          <div>
            <label>Email :</label>
            <input v-model="user_signup.mail" id="mail_signup" type="text" />
          </div>
          <div>
            <label>Password :</label>
            <input  v-model="user_signup.password" id="password_signup" type="password" />
          </div>
          <div ><input class="btn-blue" type="submit" value="Inscription"/></div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import api from '@/config'
import router from '@/router'
export default {
  name: 'Signup',
  data () {
    return {
      msg: 'GeoQuizzAdmin',
      user:{mail:"",password:""},
      user_signup:{mail:"",password:"",username:""}
    }
    },
    methods: {
      signup (){
        if(this.user_signup.mail=="" || this.user_signup.password=="" || this.user_signup.username==""){
            alert("Tous les champs sont obligatoire");
        }else{
        api.post('/signup',this.user_signup).then((response) =>{
         alert("inscription réussis");
         this.user_signup.mail="";
         this.user_signup.password="";
         this.user_signup.username="";
         router.push({name:"Signup" });
        }).catch((error)=>{
              alert(error.response.data);
           })
           }
			   },
      signin(){
        api.post('/signin',this.user).then((response) =>{
          sessionStorage.setItem('token',response.data.token);
          sessionStorage.setItem("isConnected",true);
          sessionStorage.setItem("mail",this.user.mail)
          sessionStorage.setItem("userid",response.data.userid);
          router.push({name:'Test'})
        }).catch((error)=>{
          alert(error.response.data);
        })
      }
		  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h1{color:Tomato;
}
h2{
  color:LightSteelBlue;
}
#logo{
  height:20vh;
}
#formulaires{
	width:100%;
	height:50vh;
}
#formulaire{
border:3px solid #f1f1f1;
justify-content: center;
flex-direction: column;
text-align: center;
width:49%;
display:inline-flex;
}
.btn-blue {
  background-color: transparent;
  border: 0.16em solid Tomato;
  color: Tomato; }
  .btn-blue a {
    color: Tomato; }
  .btn-blue:hover {
    color: Lightsteelblue;
    border-color: Lightsteelblue; }
    .btn-blue:hover a {
      color: lightsteelblue; }
  .btn-blue:active {
    color: Tomato;
    border-color: Tomato; }
    input[type=text], input[type=password] {
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
</style>
