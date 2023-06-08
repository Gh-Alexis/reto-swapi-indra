# Reto Backend
Integración de la API Swapi con node.js, aws Lambda, DynamoDb

## Instalación

Node.js v16.17.1

Ejecutar los Comandos para Instalar las Dependencias de Node.js

```sh
npm install
```

## Aws Serverless

Despliege en local con Serverless Offline

```sh
npm run start
```

Despliege en Aws

```sh
serverless deploy
```

## Swagger

Se implemento libreria serverless-auto-swagger para documentacion de apis, usar en local la siguiente url para visualizar

http://localhost:3000/swagger

## Pruebas Unitarias

Ejecutar las Pruebas Unitarias (Cucumber)

```sh
npm run test
```
