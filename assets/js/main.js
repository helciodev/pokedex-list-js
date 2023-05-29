const pokemonsContainer = document.getElementById("listParent");

const makePokeCard = (pokemon) => {
  const { type, name, id, abilityOne, abilityTwo } = pokemon;
  return `<li class=${type}>
            <div class="pokeid">
              <h2>${name}</h2>
              <p class="number">${id < 10 ? "00" + id : id}</p>
            </div>
            <div class="details">
              <div class="details-content">
                <span class=${"types-bg-" + type}>${abilityOne}</span> ${
    abilityTwo ? `<span class="types-bg-${type}">${abilityTwo}</span>` : ""
  }
              </div>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg"
                alt="pokemon"
              />
            </div>
          </li>`;
};
async function getPokemonsUrls() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const urlData = await response.json();
  const pokemonsUrls = await urlData.results.map((pokemon) => pokemon.url);

  console.log(pokemonsUrls);
  const promises = pokemonsUrls.map((pokemoUrl) => fetch(pokemoUrl));
  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((response) => response.json()));

  const requiredPokemonData = data.map((pokemon) => {
    const type = pokemon.types[0].type.name;
    const abilityOne = pokemon?.abilities[0]?.ability?.name;
    const abilityTwo = pokemon?.abilities[1]?.ability?.name;
    const id = pokemon.id;
    const name = pokemon.name;

    return { type, abilityOne, abilityTwo, name, id };
  });
  console.log(requiredPokemonData);
  const pokemonsCards = requiredPokemonData.map(makePokeCard);
  console.log("pokemonsCards", pokemonsCards);
  pokemonsContainer.innerHTML = pokemonsCards.join("");
}

getPokemonsUrls();
