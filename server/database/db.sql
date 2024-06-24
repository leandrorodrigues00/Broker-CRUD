-- Opção 2 

CREATE DATABASE teste_programacao;

USE teste_programacao;


CREATE TABLE corretores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    creci VARCHAR(10) NOT NULL
);


-- inserir dados de exemplo
INSERT INTO corretores (name, cpf, creci) VALUES ('André Nunes', '12345678910', '1234');


SELECT * FROM corretores;
