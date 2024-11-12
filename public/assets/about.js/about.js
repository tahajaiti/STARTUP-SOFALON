// Importer Axios dans un fichier JavaScript

const axios = require('axios');

// Exemple d'utilisation d'Axios pour une requête GET
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data); // Affiche les données de la réponse
  })
  .catch(error => {
    console.error('Il y a eu une erreur avec la requête Axios:', error);
  });