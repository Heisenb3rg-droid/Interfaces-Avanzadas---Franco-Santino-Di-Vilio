//Recordatorio: poner un innerHTML vacío dentro de search y poner un estructura condicional para msotrar nombre desconocido en caso de que el personaje no tenga nombre de verdad.

const proxy = "https://cors-anywhere.herokuapp.com/";
    
const apiKey = "d2671ca1d8517baa8e40eee1fc5fc534baee4945"; /*modificado por cuestiones de seguridad*/

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

//index.html

const btn = document.getElementById("charger");

const containerCharacters = document.getElementById("characters");

if(containerCharacters) {
    const urlApi = "https://comicvine.gamespot.com/api/characters/?api_key="+ apiKey + "&format=json";

    const urlFetch = proxy + urlApi;
    
    btn.addEventListener("click", function() {
    
    containerCharacters.innerHTML = "<p>Loading Comic Vine...</p>";

    fetch(urlFetch)
    .then(response => response.json())
    .then(dataJson =>
    {
    console.log(dataJson);

    containerCharacters.innerHTML = "";

    const personajes = dataJson.results;

    for(let i=0; i<personajes.length; i++) {

        const index = personajes[i];

        containerCharacters.innerHTML +=
    "<a href='character.html?id=" + index.id + "'>" +
    "<h2>" + index.name + "</h2>";
    
    if(index.real_name) {
        containerCharacters.innerHTML +=
        "<p>" + index.real_name + "</p>";
    } else {
        containerCharacters.innerHTML +=
        "<p>Unknown real name</p>";
    }

    containerCharacters.innerHTML += "<img src='" + index.image.medium_url + "'>" + "</a>";


    console.log(index.api_detail_url);
    }
    })
    .catch(e => {
        console.error(e);

        containerCharacters.innerHTML =
        "<p>Error. Try again.</p>";
    });
});
}

//character.html

const containerCharacter = document.getElementById("character-info");

if(containerCharacter) {

    const urlPersonaje = "https://comicvine.gamespot.com/api/character/4005-" + id + "/?api_key=" + apiKey + "&format=json";

    const urlFetch = proxy + urlPersonaje;

    fetch(urlFetch)
    .then(response => response.json())
    .then(dataJson =>
    {
        const personaje = dataJson.results;

        containerCharacter.innerHTML += 
        "<h2>" + personaje.name + "</h2>";

    if(personaje.real_name) {
        containerCharacter.innerHTML +=
        "<p>" + personaje.real_name + "</p>";
    } else {
        containerCharacter.innerHTML +=
        "<p>Unknown real name</p>";
    }

        containerCharacter.innerHTML +=
        "<img src='" + personaje.image.medium_url + "'>" +
        "<p>" + personaje.deck + "</p>" +
        "<p>" + personaje.publisher.name + "</p>";
        if(personaje.origin)
    {
        containerCharacter.innerHTML +=
        "<p>Species: " + personaje.origin.name + "</p>";
    }
    else
    {
        containerCharacter.innerHTML +=
        "<p>Species: Unknown</p>";
    }

        containerCharacter.innerHTML += "<p>Count of issue appearances: " + personaje.count_of_issue_appearances + "</p>";
        
        console.log(dataJson);
    })
    .catch(e => console.error(e));
}

//search.html

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");

searchButton.addEventListener("click", function()
{
    const urlApi = "https://comicvine.gamespot.com/api/characters/?api_key="+ apiKey + "&format=json";

    const urlFetch = proxy + urlApi;

    const textoBuscado =
    searchInput.value.toLowerCase();

    searchResults.innerHTML = "";

    fetch(urlFetch)
    .then(response => response.json())
    .then(dataJson =>
    {

        const personajes = dataJson.results;

        console.log(personajes);

        let found = 0;

        for(let i = 0; i < personajes.length; i++)
        {
            const personaje = personajes[i];

            if(personaje.name && personaje.name.toLowerCase().includes(textoBuscado)){
                found++;

                searchResults.innerHTML += "<h2>Encontrado: " + personaje.name + "</h2>";
            }
        }
        
        if(found === 0)
        {
            searchResults.innerHTML = "<p>No characters found.</p>";
        }
    })
    .catch(e => {
        console.error(e);

        searchResults.innerHTML =
        "<p>Error searching characters.</p>";
    });
});