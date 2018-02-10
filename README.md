# GeoQuizz
## A location game on google map with place's image
## Authors
Nicolas Jacquemin - Lucas Marquant - Quentin Parmentier - Thibaud Grepin
LP CISIIE Gr.2
Installation :

Vuejs :

Dans \GeoQuizz\GeoQuizz\src\config\index.js mettre l'url de l'API J2E
Dans \GeoQuizz\GeoQuizz\src\store\index.js a la ligne 93, mettre le lien vers l'api de J2E 

npm install
npm run dev

Trello : 

https://trello.com/b/sZtkeFzn/geoquizz

MARQUANT Lucas : 
Vuejs  :
{
- Jeux entier (front ) avec methode pour passer au questionx suivantes
- interval dans le jeux (question)
- timer dans le jeu
- CSS du jeu et de l'acceuil
- gestion du store et des api (avec mutation et commit)
- gestion des variable jeux et initialisation jeu avec donné API
- gestion des routes
- gestion de la carte leaflet
- gestion dynamique des markers
- gestion dynamique des markers
- calcule des points attribuer en fonction de la difficulté, de la distance et du temps a répondre
- scoreboard et écran de fin (retour acceuil)

j2e :

- aide pour le corps
- debogage

Reste :

- gestion de la bdd
- trello, bitbucker etc ...
}

GREPIN Thibaud
Vuejs front:
{
- Requète vers l'api avec axios pour l'initialisation des données
- Création d'un joueur (juste avec pseudonyme, pas d'inscription) -> page d'acceuil
- Liste des série existantes/Choix difficulté/Création de la partie(requète vers l'api routing vers jeux)
- Calcul du score en fonction de la difficulté et de la distance entre le point cliqué et le point du lieu
- Sauvegarde du score(requète api)/Fin de partie(requète api)
- Gestion du store (avec mutation/commit/action)

Vuejs Back:
- Affichage des détails d'un liste séléctionné avec un formulaire (requète put non implémenté pour la mise a jour)

j2e :
- Débogage


Reste :

- Gestion de la bdd
- Trello, Bitbucker, Etc ...
}