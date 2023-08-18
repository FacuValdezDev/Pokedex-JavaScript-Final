
const pokemonList = document.getElementById("pokemon-list");
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

function displayPokemon(pokemon) {
  const pokemonCard = document.createElement("button");
  pokemonCard.classList.add("pokemon-card");
  pokemonCard.addEventListener("click", () => {
    fetchPokemonDetails(pokemon.url);
  });

  const types = pokemon.types.map(type => type.type.name).join(", ");
  pokemonCard.innerHTML = `
    <div class="pokemons btn-pokemons">
      <p class="pokemon-id-back">#${pokemon.id}</p>
      <div class="pokemon-img">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
      </div>
      <div class="pokemon-info">
        <div class="info-container">
          <p class="pokemon-id">#${pokemon.id}</p>
          <h2 class="pokemon-name">${pokemon.name}</h2>
        </div>
        <div class="pokemons-type">
          ${types}
        </div>
      </div>
    </div>
  `;
  pokemonList.appendChild(pokemonCard);
}


// Funciones para botones de paginación
prevButton.addEventListener("click", () => {
  if (offset > 0) {
    offset -= 151;
    fetchPokemonList(offset);
  }
});

nextButton.addEventListener("click", () => {
  offset += 151;
  fetchPokemonList(offset);
});

// Cargar la lista inicial de Pokémon
fetchPokemonList(offset);
