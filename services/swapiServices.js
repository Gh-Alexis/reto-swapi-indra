const axios = require('axios');
const maperr = require('../helper/mapping');
const url = 'https://swapi.dev/api/';

module.exports.getPeople = async (id) => {
  const data = await axios
    .get(`${url}people/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return maperr.transform(data);
};

module.exports.getFilms = async (id) => {
  const data = await axios
    .get(`${url}films/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return maperr.transform(data);
};