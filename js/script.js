const pokemonList = document.getElementById("pokemon-list");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const paginationNumbers = document.getElementById("pagination-numbers");

const limit = 151;
const maxGenerations = 7;
let currentPage = 1;

function fetchPokemonList(offset) {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      pokemonList.innerHTML = "";

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
    // Código para mostrar detalles del Pokémon
  });

  // Formatear el número de ID del Pokémon
  let pokeId = pokemon.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const typesContainer = document.createElement("div");
  typesContainer.classList.add("pokemons-type-container");

  pokemon.types.forEach(type => {
    const typeElement = document.createElement("div");
    typeElement.textContent = type.type.name;
    typeElement.classList.add("pokemons-type", type.type.name);
    typesContainer.appendChild(typeElement);
  });

  pokemonCard.innerHTML = `
    <div class="pokemons btn-pokemons">
      <p class="pokemon-id-back">#${pokeId}</p>
      <div class="pokemon-img">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
      </div>
      <div class="pokemon-info">
        <div class="info-container">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="pokemon-name">${pokemon.name}</h2>
        </div>
      </div>
    </div>
  `;

  pokemonCard.appendChild(typesContainer);
  pokemonList.appendChild(pokemonCard);
}


function updatePaginationButtons(totalPokemonCount) {
  const totalPages = Math.min(Math.ceil(totalPokemonCount / limit), maxGenerations);
  paginationNumbers.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageNumberButton = document.createElement("button");
    pageNumberButton.textContent = i;
    pageNumberButton.addEventListener("click", () => {
      currentPage = i;
      const newOffset = (currentPage - 1) * limit;
      fetchPokemonList(newOffset);
    });
    paginationNumbers.appendChild(pageNumberButton);
  }
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    const newOffset = (currentPage - 1) * limit;
    fetchPokemonList(newOffset);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < maxGenerations) {
    currentPage++;
    const newOffset = (currentPage - 1) * limit;
    fetchPokemonList(newOffset);
  }
});

fetchPokemonList(0);
