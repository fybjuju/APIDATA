//arquivo para realizar as regras de negócio, comunicação 
//com banco de dados 

const conexao = require('../config/db'); //import da conexão com o banco 
const bcrypt = require("bcrypt")

const Produto = {
    async cadastrarProduto(produto){
        try{
            const {nome,categoria,descricao,preco,marca,data_lancamento} = produto

            const [result] = await conexao.query(
                "INSERT INTO produtos_beleza (nome,categoria, descricao, preco,marca,data_lancamento) VALUES(?,?,?,?,?,?)",
                [nome,categoria,descricao,preco,marca,data_lancamento]
            );
            return result
                
        }
        catch(error){
            throw new Error(`Erro ao criar o produto ${error.message}`)
            //throw new error, forma para realizar o lançamento 
            //de um novo erro e ser tratado pela controller. 
        }
    },

    async getAll(){
        try{
           
            const [result] = await conexao.query(
                "select * from produtos_beleza ",
                
            );
            return result
                
        }
        catch(error){
            throw new Error(`Erro ao criar o produto ${error.message}`)
            //throw new error, forma para realizar o lançamento 
            //de um novo erro e ser tratado pela controller. 
        }
    },
    listarProdutoById: async (id) => {
        try {
            const result = await conexao.query("SELECT * FROM produtos_beleza WHERE id=?", [id])
                
            return result;
        }
        catch (error) {
            console.log(error)
            throw new Error(`Erro ao listar usuário ${error.message}`)
            //throw new Error, forma para realizar o lançamento de um novo erro e ser tratado pela controller.
        }
    },
    atualizarById: async (nome, categoria, descricao, preco, moda, data_lancamento) => {
        try {
            const result = await conexao.query('UPDATE produtos_beleza SET nome=?, categoria=?, descricao=? preco=? moda=? data_lancamento=? WHERE id=?'[nome, categoria, descricao, preco, moda, data_lancamento])
                .catch(erro => console.log(erro));
            return result;
        }
        catch (error) {
            console.log(error)
            throw new Error(`Erro ao atualizar usuário ${error.message}`)
            //throw new Error, forma para realizar o lançamento de um novo erro e ser tratado pela controller.
        }
    },
    deleteProdutoById: async (id) => {
        try {
            const [result] = await conexao.query("DELETE FROM produtos_beleza WHERE id=?", [id])
                .catch(erro => console.log(erro));
            return result;
        }
        catch (error) {
            console.log(error)
            throw new Error(`Erro ao deletar usuário ${error.message}`)
            //throw new Error, forma para realizar o lançamento de um novo erro e ser tratado pela controller.
        }
    }
};

//Model para as regras de negócio do usuário
const Usuario = {
    async cadastrarUsuario(usuario) {
        try {
            const { nome, sobrenome, email, password, status } = usuario;
            const senha = await bcrypt.hash(password, 10);
            const [result] = await conexao.query("INSERT INTO cadastro_usuarios (nome, sobrenome, email, senha, status) VALUES(?,?,?,?,?)",
                [nome, sobrenome, email, senha, status]
            );
            return result
        }
        catch (error) {
            throw new Error(`Erro ao criar o produto ${error.message}`)
            //throw new Error, forma para realizar o lançamento de um novo erro e ser tratado pela controller.
        }
    },
    deletePorID: async (id) => {
        try {
            const [result] = await conexao.query("DELETE FROM cadastro_usuarios WHERE id=?", [id])
            return result;
        } catch (error) {
            throw new Error(`Erro ao deletar usuario ${error.message}`);
        }

    },
    listarById: async (id) => {
        try {
            const [result] = await conexao.query("SELECT * FROM cadastro_usuarios WHERE id=?", [id])
            .catch(erro=> console.log(erro));
            return result;
        }
        catch (error) {
            throw new Error(`Erro ao criar o usuario ${error.message}`);
        }
    },

};






module.exports = {
    Usuario,
    Produto
};