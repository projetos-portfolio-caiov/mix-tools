SET NAMES utf8mb4 COLLATE utf8mb4_0900_ai_ci;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

CREATE DATABASE IF NOT EXISTS munition_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;
-- drop database munition_db;
USE munition_db;

CREATE TABLE endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(90) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(90),
    bairro VARCHAR(90) NOT NULL,
    cidade VARCHAR(90) NOT NULL,
    estado VARCHAR(90) NOT NULL,
    cep CHAR(8) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(11) NOT NULL,
    rg VARCHAR(9) NOT NULL,
    telefone CHAR(13) NOT NULL,
    endereco_id INT,
    CONSTRAINT fk_cliente_endereco
        FOREIGN KEY (endereco_id)
        REFERENCES endereco(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE estande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(90) NOT NULL,
    presidente VARCHAR(90) NOT NULL,
    email VARCHAR(45) NOT NULL,
    telefone CHAR(13) NOT NULL,
    endereco_id INT,
    CONSTRAINT fk_estande_endereco
        FOREIGN KEY (endereco_id)
        REFERENCES endereco(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(90) NOT NULL,
    nome VARCHAR(90) NOT NULL,
    cargo TINYINT NOT NULL,
    estande_id INT,
    CONSTRAINT fk_usuario_estande
        FOREIGN KEY (estande_id)
        REFERENCES estande(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE laudo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    estande_id INT NOT NULL,
    dt_hora DATETIME NOT NULL,
    aprovado TINYINT NOT NULL,
    observacoes VARCHAR(270),
    fundamentacao_id TINYINT NOT NULL,
    arma_id TINYINT NOT NULL,
    CONSTRAINT fk_laudo_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_laudo_estande
        FOREIGN KEY (estande_id)
        REFERENCES estande(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES
('RODOVIA ARÃO SAHM', 0, 'NA', 'TERRA PRETA', 'MARIPORÃ', 'SP', '07600000'),
('Rua Anita Malfatti', 522, 'NA', 'Casa Verde', 'São Paulo', 'SP', '02510000');

INSERT INTO estande(nome, presidente, email, telefone, endereco_id) VALUES
('HAWKS SHOOTING CLUBE', 'Volnei Espelocin De Jesus', 'hawks@gmail.com', '5511969003779', 1),
('Clube de Tiro Competition II', 'Leonardo Osvaldo Bertolani de Barros', 'competition@gmail.com', '5511969103779', 2);

INSERT INTO usuario(email, senha, nome, cargo, estande_id) VALUES
('caiovisconti@gmail.com', '$2a$10$qMdTOBI9ScTnfKyIK13dn.4BdEKW8N1nYZlBNZ2ovY5qso1hagfyq', 'Caio Visconti', 2, 1);