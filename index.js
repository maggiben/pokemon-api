const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const db = require('./db');
const { request } = require('http');

const port = 8080;

passport.use(new Strategy((token, callback) => {
  db.users.findByToken(token, (error, user) => {
    if (error) { 
      return callback(error);
    }
    if (!user) {
      return callback(null, false);
    }
    return callback(null, user);
  });
}));

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', passport.authenticate('bearer', { session: false }), (request, response) => {
  return response.json(pokedex);
});

app.get('/users', (request, response) => {
  return response.json(db.users.getUsers());
});

app.post('/login', (request, response) => {
  const user = db.users.loginUser(request.body);
  if (user) {
    return response.json({
      username: user.username,
      email: user.email,
      token: user.token
    });
  }
  return response.status(401).json({ error: 'invalid email or password' });
});

app.post('/signup', (request, response) => {
  const user = db.users.newUser(request.body);
  if (user) {
    const pokedex = db.pokedex.addPokedexRecord(user);
    return response.json(user);
  }
  return response.status(401).json({ error: 'cannot create user' });
});

app.get('/pokemons_records', (request, response) => {
  const records = db.pokedex.getRecords();
  return response.json(records);
});

app.get('/pokemons', (request, response) => {
  const pokemons = db.pokedex.getPokemons();
  return response.json(pokemons);
});

app.get('/pokedex', passport.authenticate('bearer', { session: false }), (request, response) => {
  const { user } = request;
  const pokemons = db.pokedex.getPokedex(user);
  return response.json(pokemons);
});


app.post('/addpokemon', passport.authenticate('bearer', { session: false }), (request, response) => {
  const { user, body: { id } } = request;
  const result = db.pokedex.addPokedexPokemon(id, user);
  return response.json(result);
});

app.delete('/deletepokemon', passport.authenticate('bearer', { session: false }), (request, response) => {
  const { user, body: { id } } = request;
  const result = db.pokedex.deletePokedexPokemon(id, user);
  return response.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
