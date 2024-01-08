CREATE TABLE usuario (
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(50) PRIMARY KEY,
    senha VARCHAR(300) NOT NULL
);

CREATE TABLE postagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_imagem VARCHAR(300),
    descricao VARCHAR(100),
    dt_criacao DATE,
    fk_usuario_email VARCHAR(50),
    FOREIGN KEY (fk_usuario_email) REFERENCES usuario(email)
);

CREATE TABLE comentario (
    id INT PRIMARY KEY,
    dt_realizada DATE,
    conteudo VARCHAR(300),
    fk_postagem_id INT,
    fk_usuario_email VARCHAR(50),
    FOREIGN KEY (fk_postagem_id) REFERENCES postagem(id),
    FOREIGN KEY (fk_usuario_email) REFERENCES usuario(email)
);

CREATE TABLE curtida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario_email VARCHAR(50),
    fk_postagem_id INT,
    FOREIGN KEY (fk_usuario_email) REFERENCES usuario(email),
    FOREIGN KEY (fk_postagem_id) REFERENCES postagem(id)
);

CREATE TABLE segue (
    fk_usuario_email VARCHAR(50),
    fk_usuario_email_ VARCHAR(50),
    FOREIGN KEY (fk_usuario_email) REFERENCES usuario(email),
    FOREIGN KEY (fk_usuario_email_) REFERENCES usuario(email)
);
