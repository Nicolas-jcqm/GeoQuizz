<template>
	<div>
			<h1>{{series.filter( (ser) => ser._id === idSerie)[0].label}}
                <button class="button" id="edit-button" @click="showModal()">Edit</button>
            </h1>
        <modal name="modal">//devient modal
            <h2>Modifier serie</h2>
            <form>
                <p>Entrer nouvelles informations:</p>

                <label>Nom <br><input id="new-name" type="text"></label>
                <br>
                <label>Ville <br><input id="new-ville" type="text"></label>
                <br>
                <label>Latitude <br><input id="new-latitude" type="text"></label>
                <br>
                <label>Longitude <br><input id="new-longitude" type="text"></label>
                <br>
                <button  class="button" id="save-button" @click="saveSerData">Save</button>
                <button  class="button" id="cancel-button" @click="hideModal">Cancel</button>
								<button  class="button" id="delete-button" @click="deleteSer()">Delete</button>
            </form>
        </modal>
	</div>
</template>

<script>
import api from '@/api';
import ls from '@/services/ls'
import store from '@/store'
import Vue from 'vue'
export default {
	data () {
		return {
            serieData: [],
            idSerie: '',
            //token: ls.get('token'),
            series: []
		}
    },
    created () {
        this.idSerie = this.$route.params.id
        api.get('/series/' + this.$route.params.id + '/posts').then((response) => {// route à changer
            this.serieData = response.data
        }).catch( (error) => {
            alert("La serie  auquel vous essayez d'accéder n'existe pas !")
        });
        api.get('/series').then((response) => { //route à changer
            this.series = response.data
        })
    },
	methods: {
        deleteSer () {
            api.delete('/series/' + this.idSerie).then((response) => { // route à changer
                this.$router.push({name: 'signup'})
            }).catch( (error) => {
                alert("La série que vous essayez de supprimer n'existe pas !")
            });
        },
        showModal() {
            this.$modal.show('modal')
        },
        hideModal() {
            this.$modal.hide('modal')
        },
        saveSerData(event) {
            let nom = document.getElementById("new-name").value;
            let ville = document.getElementById("new-ville").value;
            let latitude = document.getElementById("new-latitude").value;
            let longitude = document.getElementById("new-longitude").value;
            let params = {
                //token: ls.get('token'),
                nom: nom,
                ville: ville,
                latitude: latitude,
                longitude: longitude
            }
            api.put('/series/' + this.idSerie, params).then((response) => { // route à changer
                api.get('/series').then((response) => { // route à changer
                    this.series = response.data
                })
            }).catch( error => {
                alert("Impossible de modifier cette série !");
            });
            this.hideModal();
        },
	}
}
</script>
/**
.v--modal-overlay[data-modal="modal"] form {
    padding-left: 20px;
}
.v--modal-overlay[data-modal="modal"] h2 {
    background: Tomato;
    padding: 10px;
    margin: 0;
    color: white;
}
.v--modal-overlay[data-modal="modal"] p {
    margin-bottom: 25px;
}
**/
.button{
color: white;
padding: 14px 20px;
margin: 8px 0;
border: none;
cursor: pointer;
margin-top: 25px;
font-weight: bolder;
margin-bottom:1px;
}
.button:hover{
opacity:0.4;
}
#save-button {
    background-color: lightgreen;
}
#edit-button {
    background-color: deepskyblue;
}
#delete-button {
    background-color: red;
}
#cancel-button {
    background-color: grey;
}
</style>
