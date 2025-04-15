const clienteModel = require('../models/models');
const verificarData = require('../src/moment')

const clienteController = {
    async cadastrarProduto(req, res) {
        let dataFormatada = null; //com o let pois pode ser alterada

        try {
            const { nome, categoria, descricao, preco, marca, data_lancamento } = req.body

            //verificar se os campos obrigatórios estão preenchidos
            if (!nome || !categoria || !preco) { //verificando se o usuário cololcou os campos obrigatórios
                return res.status(400).json({ mensagem: "Os campos são obrigatórios" });
            }

            const categoriaValida = ['maquiagem', 'acessorio', 'perfume', 'moda', 'cabelo'] //verificando se o que o usuário escolheu, é igual as escolha que são permitidos
            if (!categoriaValida.includes(categoria)) {
                return res.status(400).json({ mensagem: "Categoria inválida" });
            }

            //Validação do formato da data recebida do objeto na variável
            //data_lancamento
            //yyyy-mm-dd
            if (data_lancamento) {
                dataFormatada = verificarData(data_lancamento);
                if (!dataFormatada) //se o retorno for nulo/vazio
                    return res.status(400).json({ mensagem: "Data inválida, use o formato DD/MM/YYYY ou YYYY-MM-DD" });
            }

            //Fazer a chamada da model para cadastrar na tabela do banco
            const novoProduto = await clienteModel.Produto.cadastrarProduto({
                nome,
                categoria,
                descricao,
                preco,
                marca,
                data_lancamento: dataFormatada //data formatada
            });
            res.status(201).json(novoProduto);

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message })
        }
    },
     
    async listaTodos(req, res) {
        try{
            const sql = await clienteModel.Produto.getAll()
            res.status(200).json(sql[0])
        }
        catch(error) {
            res.status(500).json({ mensagem: error.message })
        }
    },
    listarProdutoById: async (req, res) => {
        try {
            const sql = await clientModel.Produto.listarProdutoById(req.params.id)

            if (sql.length > 0) {
                res.status(200).json(sql[0])
            }
            else {
                res.status(404).json({ msg: 'Não existe registro no Banco de Dados' })
            }

        }
        catch (erro) {
            console.log(erro);
        }
    },
    atualizarProdutoById: async (req, res) => {
        const { nome, categoria, descricao, preco, marca, data_lancamento } = req.body
        try {
            const sql = await clientModel.atualizarProdutoById(req.params.id)
            if (sql) {
                await clientModel.atualizarById(nome, categoria, descricao, preco, marca, data_lancamento)
                res.status(200).json({ msg: "Produto atualizado com sucesso" })
            }
            else {
                res.status(404).json({ msg: "id nao existente no banco de dados" })
            }
        }
        catch {
            res.status(500);
        }
    },
    deleteProdutoById: async (req, res) => {
        console.log(req.params.id);
        try {
            const consulta = await clientModel.Produto.deleteProdutoById(req.params.id)

            if (consulta) {
                await clientModel.Produto.deleteProdutoById(req.params.id)

                res.status(200).json({ msg: "Deletado com sucesso!!!" })
            }

            else {
                res.status(404).json({ msg: "ID não existe o banco de dados" })
            }
        }
        catch (erro) {
            console.log(erro)
            res.status(500).json({ msg: "Erro servidor" })
        }
    }

};



//Objeto para funções do usuário
const User = {
    async criarNewUser(req, res) {
        try {
            const { nome, sobrenome, email, password, status } = req.body

            if (!nome || !sobrenome || !email || !password) {
                return res.status(400).json({ mensagem: "Os campos são obrigatorios" });
            }
            
            const statusValido = ['ativo', 'inativo']
            if (!statusValido.includes(status)) {
                return res.status(400).json({ mensagem: "status inválidado" });
            }
            const novoUsuario = await clienteModel.Usuario.cadastrarUsuario({
                nome, sobrenome, email, password, status 
            });

            res.status(201).json(novoUsuario)
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
            console.log(error)
        }
    },
    listarById: async (req, res) => {
        try {
            const sql = await clienteModel.Usuario.listarById(req.params.id)
            if (sql.length > 0) {
                res.status(200).json(sql);
            }
            else {
                res.status(404).json({ msg: "Não existe registro no banco de dados" })
                
            }

        }
        catch (erro) {
            res.status(500).json({ msg: "Erro servidor" });console.log(erro)
        }
    },
    deleteById: async (req, res) => {
        try {
            const sql = await clienteModel.User.deleteById(req.params.id)
            if (sql.length > 0) {
                await clienteModel.User.deletePorID(req.params.id)
                res.status(200).json({ msg: "Deletado com sucesso" });
            }
            else {
                res.status(404).json({ msg: "ID não existe no banco de dados" })

            }
        } catch (erro) {
            res.status(500).json({ msg: "Erro no servidor" });
            console.log(erro)
        }
    }
};



module.exports = {
    User,
    clienteController
};
