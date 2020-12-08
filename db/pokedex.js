const fs = require('fs');
const pokemons = JSON.parse(fs.readFileSync('db/pokedex.json', 'utf-8'));

var records = {
  '1': {
    pokedex: [1, 2, 3, 4, 5]
  },
  '2': {
    pokedex: [2, 4, 6, 8, 10]
  },
  '3': {
    pokedex: [2, 4]
  }
};

exports.addPokedexRecord = (user) => {
  if (!(user.id in records)) {
    records = { ...records, ...{
      [user.id]: {
        pokedex: []
      }
    }}
    return records[user.id];
  }
  return undefined;
};

exports.getRecords = () => {
  return records;
}

exports.addPokedexPokemon = (id, user) => {
  const { pokedex } = records[user.id];
  if (pokedex.length < 5 && pokedex.indexOf(parseInt(id, 10)) === -1) {
    pokedex.push(parseInt(id, 10));
    return true;
  }
  return false;
};

exports.deletePokedexPokemon = (id, user) => {
  const { pokedex } = records[user.id];
  const index = pokedex.indexOf(parseInt(id, 10));
  if (index > -1) {
    pokedex.splice(index, 1);
    return true;
  }
  return false;
};

exports.getPokemonById = (id) => {
  return pokemons.find(pokemon => pokemon.id === id);
};

exports.getPokedex = (user) => {
  const { pokedex } = records[user.id];
  return pokemons.filter(pokemon => pokedex.includes(pokemon.id));
};

exports.getPokemons = () => {
  return pokemons.map(({id, name, type}) => ({id, name, type}));
};