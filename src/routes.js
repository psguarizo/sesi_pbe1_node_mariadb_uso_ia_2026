
const express = require('express');
const router = express.Router();

const usuario = require('./controllers/usuario');
const usoia = require('./controllers/usoia');

// Rotas de usuários
router.get('/usuarios', usuario.listar);
router.get('/usuarios/:id', usuario.buscar);
router.post('/usuarios', usuario.cadastrar);
router.put('/usuarios/:id', usuario.editar);
router.delete('/usuarios/:id', usuario.excluir);

// Login
router.post('/login', usuario.login);

// Rotas de usos de IA
router.get('/usoia', usoia.listar);
router.get('/usoia/:id', usoia.buscar);
router.post('/usoia', usoia.cadastrar);
router.put('/usoia/:id', usoia.editar);
router.delete('/usoia/:id', usoia.excluir);

// Resumo dos riscos
router.get('/resumo', usoia.resumo);

module.exports = router;
