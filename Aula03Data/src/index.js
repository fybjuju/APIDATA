const express = require('express');
const conexao = require('../config/db');
const routers = require('../src/routers');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(routers);

PORT = process.env.PORT || 3001

conexao.query("select 1")
.then(()=>{
    console.log("conectado com sucesso")
    app.listen(PORT, function(){
        console.log("Servidor executando na url:http://localhost:3001")
    });
})
.catch(erro => console.log("Falha na conexão"));

