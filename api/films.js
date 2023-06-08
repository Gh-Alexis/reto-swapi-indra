'use strict';
const swapiResponse = require('../responses/swapiResponse');
const { v4: uuidv4 } = require('uuid');
const swapi = require('../services/swapiServices');
const dynamoServices = require('../services/dynamoServices');

const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addFormat('date-time', function (dateTimeString) {
  if (typeof dateTimeString === 'object') {
    dateTimeString = dateTimeString.toISOString();
  }
  return !isNaN(Date.parse(dateTimeString));
});

const schema = {
  description: 'Una historia de Star Wars',
  title: 'Films',
  type: 'object',
  properties: {
    titulo: { type : 'string'},
    episodio_id: { type : 'number'},
    rastreo_de_apertura: { type : 'string'},
    director: { type : 'string'},
    productor: { type : 'string'},
    fecha_lanzamiento: { type : 'string'},
    personajes: { type : 'array'},
    planetas: { type : 'array'},
    naves: { type : 'array'},
    vehiculos: { type : 'array'},
    especies: { type : 'array'},
    creacion: { type : 'string', format: 'date-time'},
    edicion: { type : 'string', format: 'date-time'},
    url: { type : 'string'}
  },
  required: [
    'titulo',
    'episodio_id',
    'rastreo_de_apertura',
    'director',
    'productor',
    'fecha_lanzamiento',
    'personajes',
    'planetas',
    'naves',
    'vehiculos',
    'especies'
  ]
};

module.exports.index = async (event) => {
  const query =
    typeof event.queryStringParameters != 'undefined'
      ? event.queryStringParameters
      : {};
  const search =
    query && typeof query.search != 'undefined' ? query.search : '';

  let params = {
    TableName: process.env.TABLA_PELICULAS
  };
  if (search != '') {
    let condition_stack = [];
    for (let field of schema.required) condition_stack.push(field + ' = :s');
    params.FilterExpression = condition_stack.join(' OR ');

    params.ExpressionAttributeValues = {
      ':s': { S: '77' }
    };
  }
  
  return dynamoServices.find(params)

};

module.exports.id = async (event) => {
  return swapi
    .getFilms(event.pathParameters.id)
    .then((result) => {
      return {
        statusCode: 200,
        body: swapiResponse.response(result)
      };
    })
    .catch((error) => {
      return {
        statusCode: 404,
        body: swapiResponse.response({
          result: 'No encontrado'
        })
      };
    });
};

module.exports.submit = async (event) => {
  const body = JSON.parse(event.body);
  body.id = uuidv4();
  body.creacion = new Date().toISOString();
  body.edicion = new Date().toISOString();

  const valid = ajv.validate(schema, body);

  if (!valid)
    return {
      statusCode: 401,
      body: swapiResponde.response({ result: 'error', error: ajv.errors })
    };

  const filmsInfo = {
    TableName: process.env.TABLA_PELICULAS,
    Item: body
  };

  return dynamoServices.submit(filmsInfo, body);
};

module.exports.schema = async () => {
  return {
    statusCode: 200,
    body: swapiResponse.response(schema)
  };
};
