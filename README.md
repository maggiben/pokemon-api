# pokemon-api
The pokemon api

## Installation

### `npm install`

This project was built and tested with `node v14.15.1`

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the API in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the api browser ie Postman.

The API will reload if you make edits.\
You will also see any errors in the console.

## Endpoints

This API exposes the following endpoints:

### `login`

#### Method `POST`
Given a `username` and a `password` the API will check if valid and issue an authorization token and
return a valid user object

### `signup`

#### Method `POST`
Given a `username`, `email` and a `password` the API will create a user provided the `email` is unique and in return will issue an authorization token an a valid user object

### `pokemons`

#### Method `GET`
Given a valid authorization token the endpoint will return a list of pokemons

### `pokedex`

#### Method `GET`
Given a valid authorization token the endpoint will return the pokemons available in the pokedex list

### `addpokemon`

#### Method `POST`
Given a valid authorization token and a pokemon `id` the endpoint will add the pokemon `id` to the pokedex list and return true or false if the operation was successfull

### `deletepokemon`

#### Method `POST`
Given a valid authorization token and a pokemon `id` the endpoint will remove the pokemon `id` to the pokedex list and return true or false if the operation was successfull

## Configuration & Setup

### `port`
By default the app will listen on port `8080`