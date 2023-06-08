'use strict';
const swapiResponse = require('../responses/swapiResponse');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.find = async (params) => {
  
  return dynamoDb
    .scan(params)
    .promise()
    .then((result) => {
      return {
        statusCode: 200,
        body: swapiResponse.response({
          results: result.Items
        })
      };
    })
    .catch((err) => {
      return {
        statusCode: 401,
        body: swapiResponse.response(
          {
            result: 'error',
            error: err
          },
          params
        )
      };
    });
};

module.exports.submit = async (filmsInfo, body) => {
  await dynamoDb
    .put(filmsInfo)
    .promise()
    .then((res) => { });
  return {
    statusCode: 200,
    body: swapiResponse.response({ result: 'success', item: body })
  };
};