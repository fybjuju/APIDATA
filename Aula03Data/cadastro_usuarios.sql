CREATE TABLE cadastro_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo', 'pendente') DEFAULT 'pendente'
);



    id, nome, sobrenome, email, senha, data_criacao