SET NAMES utf8mb4 COLLATE utf8mb4_0900_ai_ci;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

CREATE DATABASE IF NOT EXISTS munition_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci


USE munition_db;

CREATE TABLE estande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(90) NOT NULL
    email VARCHAR(45) NOT NULL,
    telefone CHAR(13) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(90) NOT NULL,
    nome VARCHAR(90) NOT NULL
    cargo TINYINT NOT NULL,
    estande_id INT,
    CONSTRAINT fk_usuario_estande
        FOREIGN KEY (estande_id)
        REFERENCES estande(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(90) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(90),
    bairro VARCHAR(90) NOT NULL,
    cidade VARCHAR(90) NOT NULL,
    estado VARCHAR(90) NOT NULL,
    cdp CHAR(8) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(11) NOT NULL,
    rg VARCHAR(9) NOT NULL
    telefone CHAR(13) NOT NULL
    estande_id INT,
    endereco_id INT,
    CONSTRAINT fk_cliente_estande
        FOREIGN KEY (estande_id)
        REFERENCES estande(id),
    CONSTRAINT fk_cliente_endereco
        FOREIGN KEY (endereco_id)
        REFERENCES endereco(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE laudo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cliente_id INT,
    dt_hora DATETIME NOT NULL,
    finalidade VARCHAR(90) NOT NULL,
    arma VARCHAR(90) NOT NULL,
    CONSTRAINT fk_laudo_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_laudo_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;