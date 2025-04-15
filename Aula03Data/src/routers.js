const express = require('express');
const controller = require('../controller/controller');
const routers = express.Router();

routers.post('/cadastrarProduto', controller.clienteController.cadastrarProduto);
routers.get('/lista',controller.clienteController.listaTodos);
routers.get('/listarProduto/:id', controller.clienteController.listarProdutoById);
routers.put('/atualizarProduto/:id', controller.clienteController.atualizarProdutoById);
routers.delete('/deleteProduto/:id', controller.clienteController.deleteProdutoById);

routers.get('/listar/:id', controller.User.listarById);
routers.post('/cadastro', controller.User.criarNewUser);
routers.delete('/delete/:id', controller.User.deleteById);


module.exports = routers;