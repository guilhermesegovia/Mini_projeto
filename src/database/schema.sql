CREATE TABLE if not EXISTS fornecedor(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome_empresa VARCHAR(100) NOT NULL CHECK(length(nome_empresa)>3),
cnpj VARCHAR(14) NOT NULL CHECK(length(cnpj)>13)
);

CREATE TABLE if not exists cliente (
id INTEGER PRIMARY KEY,
nome VARCHAR(100) NOT NULL CHECK(length(nome)>3),
telefone VARCHAR(11) UNIQUE NOT NULL CHECK(length(telefone)>10),
cpf VARCHAR(11) UNIQUE NOT NULL CHECK(length(cpf)>10),
email VARCHAR(40) UNIQUE NOT NULL,
senha VARCHAR(30) NOT NULL CHECK(length(senha)>7),
endereco VARCHAR(200) NOT NULL,
cep VARCHAR(8) NOT NULL,
data_nascimento DATE
);

CREATE TABLE if not exists funcionario(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(100) NOT NULL CHECK(length(nome)>3),
setor VARCHAR(100) NOT NULL,
cargo VARCHAR(100) NOT NULL CHECK(length(cargo)>4),
data_nascimento DATE,
cpf VARCHAR(11) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE if not exists categoria (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(100) NOT NULL CHECK(length(nome)>3),
descricao VARCHAR(100) NOT NULL
);

CREATE TABLE if not exists produto (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(100) NOT NULL CHECK(length(nome)>3),
id_categoria INT,
tamanho VARCHAR(4) NOT NULL,
cor VARCHAR(50) NOT NULL CHECK(length(cor)>3),
codigo_barras VARCHAR(13) NOT NULL,
custo DECIMAL(10,2) NOT NULL,
venda DECIMAL(10,2) NOT NULL,
estoque INT,
data_cadastro DATE,
descricao VARCHAR(400) NOT NULL,
marca VARCHAR(50) NOT NULL,
id_fornecedor INT,
FOREIGN KEY (id_categoria) REFERENCES categoria(id),
FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id)
);

CREATE TABLE if not exists pedido (
id INTEGER PRIMARY KEY AUTOINCREMENT,
frete DECIMAL(10,2) NOT NULL,
cupom VARCHAR(25) CHECK(length(cupom)>3),
quantidade INT,
total DECIMAL(10,2) NOT NULL,
data_hora DATE,
endereco_entrega VARCHAR(200) NOT NULL CHECK(length(endereco_entrega)>9),
id_cliente INTEGER,
FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE if not exists pagamento(
id INTEGER PRIMARY KEY AUTOINCREMENT,
metodo VARCHAR(20) NOT NULL,
status_pagamento VARCHAR(30) NOT NULL,
data_pagamento DATE,
status_entrega VARCHAR(40) NOT NULL,
valor DECIMAL(10,2) NOT NULL,
id_pedido INT,
FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);

CREATE TABLE if not exists estoque(
id INTEGER PRIMARY KEY AUTOINCREMENT,
tipo VARCHAR(100) CHECK(length(tipo)>3),
quantidade INT CHECK(quantidade > 0),
data_entrada DATE,
data_saida DATE,
id_produto INT,
id_funcionario INT,
FOREIGN KEY (id_produto) REFERENCES produto(id),
FOREIGN KEY (id_funcionario) REFERENCES funcionario(id)
);

CREATE TABLE if not exists item_pedido(
id INTEGER PRIMARY KEY AUTOINCREMENT,
id_produto INT,
id_pedido INT,
quantidade INT,
FOREIGN KEY (id_produto) REFERENCES produto(id),
FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);

CREATE TABLE if not exists avaliacao (
id INTEGER PRIMARY KEY AUTOINCREMENT,
comentario VARCHAR(300),
estrelas DECIMAL(2,1)
);

CREATE TABLE IF NOT EXISTS carrinho (
id INTEGER PRIMARY KEY AUTOINCREMENT,
id_cliente INT NOT NULL,
id_produto INT NOT NULL,
quantidade INT NOT NULL CHECK(quantidade > 0),
FOREIGN KEY (id_cliente) REFERENCES cliente(id),
FOREIGN KEY (id_produto) REFERENCES produto(id),
UNIQUE(id_cliente, id_produto)
);