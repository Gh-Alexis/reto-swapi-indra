'use strict';
const swapi = require('../responses/swapiResponse');
module.exports.detail = async (event) => {
  const url_aws = event.headers.Host;
  return {
    statusCode: 200,
    body: swapi.response({
      film: `https://${url_aws}/dev/api/films/:id`,
      films: `https://${url_aws}/dev/api/films/:id`,
      filmsSubmit: 'https://' + url_aws + '/api/films/submit',
    })
  };
};
