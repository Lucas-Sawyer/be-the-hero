const express = require('express');
const conexao = require('./db/connection');
const ong_controller = require('./controllers/ong_controller');
const incidente_controller = require('./controllers/incidente_controller');
const profile_controller = require('./controllers/profile_controller');
const sessao_controller = require('./controllers/sessao_controller');

const rotas = express.Router();

rotas.get('/ongs', ong_controller.lista);
rotas.post('/ongs', ong_controller.create);

rotas.post('/incidentes', incidente_controller.create);
rotas.get('/incidentes', incidente_controller.lista);
rotas.delete('/incidentes/:id', incidente_controller.delete);

rotas.get('/profile', profile_controller.lista);

rotas.post('/sessao', sessao_controller.create);

module.exports = rotas;