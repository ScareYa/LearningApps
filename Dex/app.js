const pokedex = document.getElementById('pokedex');
console.log(pokedex);

const fetchPokemon = () => {

  const promises = [];

  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  };

  Promise.all(promises).then((promiseResults) => {
    const pokemon = promiseResults.map((jsonFormattedData) => ({
      name: jsonFormattedData.name,
      id: jsonFormattedData.id,
      image: jsonFormattedData.sprites['front_default'],
      type: jsonFormattedData.types.map((type) => type.type.name).join(', ')
    }));
    displayPokemon(pokemon);
  });

};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon.map ( pokeItem => `
  <li class="card">
    <img class="card-image" src="${pokeItem.image}"/>
    <h2 class="card-title">${pokeItem.id}.${pokeItem.name}</h2>
    <p class="card-subtitle">Type: ${pokeItem.type}</p>
  </li>
  `).join('');
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
