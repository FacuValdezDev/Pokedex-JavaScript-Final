const pokemonList = document.getElementById("pokemon-list");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const paginationNumbers = document.getElementById("pagination-numbers");

const limit = 151;
const maxGenerations = 7;
let currentPage = 1;

/*Llamado a la poke api*/
function fetchPokemonList(offset) {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pokemonList.innerHTML = "";

      data.results.forEach((pokemon) => {
        fetchPokemonData(pokemon.url);
      });
    });
}

function fetchPokemonData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayPokemon(data);
    });
}

function displayPokemon(pokemon) {
  const pokemonCard = document.createElement("button");
  pokemonCard.classList.add("pokemon-card");
  pokemonCard.addEventListener("click", () => {
    openModal(pokemon);
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

  pokemon.types.forEach((type) => {
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
  const totalPages = Math.min(
    Math.ceil(totalPokemonCount / limit),
    maxGenerations,
  );
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

// Función para filtrar Pokémon por tipo

const filterButtons = document.querySelectorAll(".btn-header");
const viewAllButton = document.getElementById("view-all");

const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

// Boton de filtro
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterType = button.id;
    filterPokemonsByType(filterType);
  });
});

viewAllButton.addEventListener("click", () => {
  const allPokemonCards = document.querySelectorAll(".pokemon-card");
  allPokemonCards.forEach((pokemonCard) => {
    pokemonCard.style.display = "block";
  });
});

function filterPokemonsByType(type) {
  const allPokemonCards = document.querySelectorAll(".pokemon-card");

  allPokemonCards.forEach((pokemonCard) => {
    const typesContainer = pokemonCard.querySelector(
      ".pokemons-type-container",
    );
    const typeElements = typesContainer.querySelectorAll(".pokemons-type");

    let hasMatchingType = false;
    typeElements.forEach((typeElement) => {
      if (typeElement.textContent.toLowerCase() === type) {
        hasMatchingType = true;
      }
    });

    if (hasMatchingType || type === "view-all") {
      pokemonCard.style.display = "block";
    } else {
      pokemonCard.style.display = "none";
    }
  });
}
const searchInput = document.getElementById("pokemon");
const searchButton = document.querySelector(".buttonSearch");

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  searchPokemons(searchText);
});

// Función para buscar Pokémon por nombre
function searchPokemons(searchText) {
  const allPokemonCards = document.querySelectorAll(".pokemon-card");

  allPokemonCards.forEach((pokemonCard) => {
    const pokemonName = pokemonCard
      .querySelector(".pokemon-name")
      .textContent.toLowerCase();
    if (pokemonName.includes(searchText)) {
      pokemonCard.style.display = "block";
    } else {
      pokemonCard.style.display = "none";
    }
  });
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchText = searchInput.value.toLowerCase();
  searchPokemons(searchText);
});

/* Funcion para abrir ventana modal */
function openModal(pokemon) {
  const modal = document.getElementById("pokemon-modal");
  const modalContent = document.querySelector(".modal-content");
  const modalName = document.getElementById("modal-pokemon-name");
  const modalDetails = document.getElementById("modal-pokemon-details");
  const stats = pokemon.stats;
  const paddedId = String(pokemon.id).padStart(3, "0");
  const types = pokemon.types
    .map((type) => {
      const typeClass = type.type.name;
      return `<div class="pokemons-types ${typeClass} type">${type.type.name}</div>`;
    })
    .join(" ");

  // Mostrar detalles de pokemon en ventana modal
  const statsHTML = `
    <div class="pokemon-stats-info active">
    <div class="pokeIdmodal">#${paddedId}</div>
    <div class="pokemons-type type-modal">${types}</div>
    <div class="pokemon-img-modal">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
      </div>
      <div>
        <h3 class="modal-title">SKILLS</h3>
        <div class="skills">
          <ul>
            <li class="skills__item">PS → ${stats[0].base_stat}</li>
            <div class="ps-bar progress-bar">
            <div class="bar"></div>
            </div>
            <li class="skills__item">Attack → ${stats[1].base_stat}</li>
            <div class="attack-bar progress-bar">
            <div class="bar"></div>
            </div>
            <li class="skills__item">Defense → ${stats[2].base_stat}</li>
            <div class="defense-bar progress-bar">
            <div class="bar"></div>
            </div>
            <li class="skills__item">Especial Attack → ${stats[3].base_stat}</li>
            <div class="espAtk-bar progress-bar">
              <div class="bar"></div>
            </div>
            <li class="skills__item">Especial Defence → ${stats[4].base_stat}</li>
            <div class="espDfc progress-bar">
            <div class="bar"></div>
           </div>
            <li class="skills__item">Velocity → ${stats[5].base_stat}</li>
            <div class="velocity progress-bar">
            <div class="bar"></div>
            </div>
          </ul>
      </div>
      <div class="modal-stats">
          <h3 class="modal-title">STATS</h3>
          <div>Height: ${pokemon.height}M</div>
          <div>Weight: ${pokemon.weight}KG</div>
        </div>
    </div>
  `;

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  modalName.textContent = pokemon.name;
  modalDetails.innerHTML = statsHTML;

  modal.style.display = "block";
  modalName.textContent = pokemon.name;

  // Boton para cerrar modal
  const closeButton = document.getElementById("modal-close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
