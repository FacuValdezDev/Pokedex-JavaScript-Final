/* const pokemonList = document.getElementById("pokemon-list");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

let offset = 0;

function fetchPokemonList(offset) {
  const limit = 151;
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      pokemonList.innerHTML = ""; // Limpiar la lista antes de agregar nuevos Pokémon

      data.results.forEach(pokemon => {
        fetchPokemonData(pokemon.url);
      });
    });
}

function fetchPokemonData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayPokemon(data);
    });
}
// Funcion para mostrar todos los pokemon
function displayPokemon(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");
  const types = pokemon.types.map(type => type.type.name).join(", ");
  pokemonCard.innerHTML = `
    <button class="details-button" data-url="${pokemon.url}">
      <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
      <h2>${pokemon.name.toUpperCase()}</h2>
      <p>${pokemon.id}</p>
      <p>${types.toUpperCase()}</p>
    </button>
  `;
  pokemonList.appendChild(pokemonCard);
} */

/* // Funcion para agregar evento para abrir ventana modal
function fetchPokemonDetails(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    showPokemonDetailsModal(data);
  });
}

function displayPokemon(pokemon){
  const pokemonCard = document.createElement("div");
} */



// Funciones para botones de paginacion
/* prevButton.addEventListener("click", () => {
  if (offset > 0) {
    offset -= 151;
    fetchPokemonList(offset);
  }
});

nextButton.addEventListener("click", () => {
  offset += 151;
  fetchPokemonList(offset);
});

fetchPokemonList(offset);
 */