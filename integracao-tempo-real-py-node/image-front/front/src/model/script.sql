CREATE DATABASE integracaoTempoReal;
USE integracaoTempoReal;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45) UNIQUE,
	senha VARCHAR(45)
);

SELECT * FROM usuario;

INSERT INTO usuario (email, senha) VALUES
('teste@gmail.com', 'urubu#100'),
('teste2@gmail.com', 'urubu#100');