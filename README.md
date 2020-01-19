# OmniStack_10

## Introdução

Este projeto faz parte da semana OmniStack 10.0 da RocketSeat. O objetivo desse projeto foi desenvolver um sistema baseado no Maps da Google, porém para achar Desenvolvedores. O projeto é composto por uma UI Web ( FrontEnd ), um App Mobile ( Androi e iOS ) e um Backend ( Node.js e MongoDB ).

Esse projeto utiliza as APIs de Geolocalização do navegador e as bibliotecas de Geolocalização do Expo para o React Native. 

## BackEnd ( Restful API )

O BackEnd utiliza um banco de Dados MongoDB e cria modelos através do Mongoose, todo o roteamento é feito a partir do express, para requisições http, e socketio para requisições em tempo real. Não há banco de dados para observar as conexões atuais. A API construída segue os principios do REST.

O backend recebe o nome de usuario, a latitude e a longitude do FrontEnd e procura no github o usuario para conseguir o nome dele, a bio dele e sua foto. Estes dados são armazenados no Banco de dados do MongoDB.

## FrontEnd

A interface web utiliza ReactJS para o frontend e axios para as requisições com API. Não há muito detalhe aqui, é o ReactJs normal.

## Mobile

O aplicativo possui integração co o Backend através do axios para rotas HTTP e o socketio para protocolos WebSocket. 