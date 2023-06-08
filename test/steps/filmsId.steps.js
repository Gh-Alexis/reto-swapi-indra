const { loadFeature, defineFeature } = require('jest-cucumber');
//const mock = require('../util/mock');
const { id } = require('../../api/films');

const swapiFilms = require('../../services/swapiServices');

const axios = require('axios');

axios.get = jest.fn().mockImplementation(async (params) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: 			{
				title: "A New Hope",
				episode_id: 4,
				opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
				director: "George Lucas",
				producer: "Gary Kurtz, Rick McCallum",
				release_date: "1977-05-25",
				characters: [
					"https://swapi.py4e.com/api/people/1/",
					"https://swapi.py4e.com/api/people/2/",
					"https://swapi.py4e.com/api/people/3/",
					"https://swapi.py4e.com/api/people/4/",
					"https://swapi.py4e.com/api/people/5/",
					"https://swapi.py4e.com/api/people/6/",
					"https://swapi.py4e.com/api/people/7/",
					"https://swapi.py4e.com/api/people/8/",
					"https://swapi.py4e.com/api/people/9/",
					"https://swapi.py4e.com/api/people/10/",
					"https://swapi.py4e.com/api/people/12/",
					"https://swapi.py4e.com/api/people/13/",
					"https://swapi.py4e.com/api/people/14/",
					"https://swapi.py4e.com/api/people/15/",
					"https://swapi.py4e.com/api/people/16/",
					"https://swapi.py4e.com/api/people/18/",
					"https://swapi.py4e.com/api/people/19/",
					"https://swapi.py4e.com/api/people/81/"
				],
				planets: [
					"https://swapi.py4e.com/api/planets/1/",
					"https://swapi.py4e.com/api/planets/2/",
					"https://swapi.py4e.com/api/planets/3/"
				],
				starships: [
					"https://swapi.py4e.com/api/starships/2/",
					"https://swapi.py4e.com/api/starships/3/",
					"https://swapi.py4e.com/api/starships/5/",
					"https://swapi.py4e.com/api/starships/9/",
					"https://swapi.py4e.com/api/starships/10/",
					"https://swapi.py4e.com/api/starships/11/",
					"https://swapi.py4e.com/api/starships/12/",
					"https://swapi.py4e.com/api/starships/13/"
				],
				vehicles: [
					"https://swapi.py4e.com/api/vehicles/4/",
					"https://swapi.py4e.com/api/vehicles/6/",
					"https://swapi.py4e.com/api/vehicles/7/",
					"https://swapi.py4e.com/api/vehicles/8/"
				],
				species: [
					"https://swapi.py4e.com/api/species/1/",
					"https://swapi.py4e.com/api/species/2/",
					"https://swapi.py4e.com/api/species/3/",
					"https://swapi.py4e.com/api/species/4/",
					"https://swapi.py4e.com/api/species/5/"
				],
				created: "2014-12-10T14:23:31.880000Z",
				edited: "2014-12-20T19:49:45.256000Z",
				url: "https://swapi.py4e.com/api/films/1/"
			}

    });
  });
});

const feature = loadFeature('../filmsId.feature', {
  loadRelativePath: true,
  errors: true
});

defineFeature(feature, (test) => {
  test('Obteniendo el Paydload para un Id de pelicula', ({
    given,
    when,
    then,
    and
  }) => {
    let filmsIdTest, respuesta;

    given(/^el id de la pelicula (.)$/, (filmsId) => {
      filmsIdTest = filmsId;
    });

    when('estos son consultados en una api externa', async () => {
      const event = {
        pathParameters: {
          id: filmsIdTest
        }
      };
      respuesta = await id(event);
    });

    then('se obtendrá un objeto', () => {
      expect(typeof respuesta).toBe('object');
    });

    then(/^el objeto tendrá tantos elementos: (.*)$/, (cantidadElementos) => {
      expect(Object.keys(respuesta).length).toBe(Number(cantidadElementos));
    });

    then(/^el statusCode: (.*)$/, (statusCode) => {
      expect(respuesta.statusCode).toBe(Number(statusCode));
    });

    then(
      /^el payload tendra la cantidad de elementos: (.*)$/,
      (tamanoPayload) => {
        expect(Object.keys(JSON.parse(respuesta.body)).length).toBe(
          Number(tamanoPayload)
        );
      }
    );
  });
});
