CREATE TABLE usuario (
    nome VARCHAR,
    email VARCHAR PRIMARY KEY,
    senha VARCHAR
);

CREATE TABLE postagem (
    id NUMERIC PRIMARY KEY,
    url_imagem VARCHAR,
    descricao VARCHAR,
    dt_criacao DATE,
    fk_usuario_email VARCHAR
);

CREATE TABLE comentarios (
    id NUMERIC PRIMARY KEY,
    dt_realizada DATE,
    conteudo VARCHAR,
    fk_postagem_id NUMERIC,
    fk_usuario_email VARCHAR
);

CREATE TABLE conversa (
    id NUMERIC PRIMARY KEY,
    fk_usuario_email VARCHAR
);

CREATE TABLE mensagem (
    remetente VARCHAR,
    id NUMERIC PRIMARY KEY,
    destinatario VARCHAR,
    conteudo VARCHAR,
    hr_enviada DATE,
    fk_conversa_id NUMERIC
);

CREATE TABLE curtidas_curte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario_email VARCHAR,
    fk_postagem_id NUMERIC
);

CREATE TABLE segue (
    fk_usuario_email VARCHAR,
    fk_usuario_email_ VARCHAR
);
 
ALTER TABLE postagem ADD CONSTRAINT FK_postagem_2
    FOREIGN KEY (fk_usuario_email)
    REFERENCES usuario (email)
    ON DELETE SET NULL;
 
ALTER TABLE comentarios ADD CONSTRAINT FK_comentarios_2
    FOREIGN KEY (fk_postagem_id)
    REFERENCES postagem (id)
    ON DELETE SET NULL;
 
ALTER TABLE comentarios ADD CONSTRAINT FK_comentarios_3
    FOREIGN KEY (fk_usuario_email)
    REFERENCES usuario (email)
    ON DELETE SET NULL;
 
ALTER TABLE conversa ADD CONSTRAINT FK_conversa_2
    FOREIGN KEY (fk_usuario_email)
    REFERENCES usuario (email)
    ON DELETE SET NULL;
 
ALTER TABLE mensagem ADD CONSTRAINT FK_mensagem_2
    FOREIGN KEY (fk_conversa_id)
    REFERENCES conversa (id)
    ON DELETE SET NULL;
 
ALTER TABLE curtidas_curte ADD CONSTRAINT FK_curtidas_curte_1
    FOREIGN KEY (fk_usuario_email)
    REFERENCES usuario (email);
 
ALTER TABLE curtidas_curte ADD CONSTRAINT FK_curtidas_curte_2
    FOREIGN KEY (fk_postagem_id)
    REFERENCES postagem (id);
 
ALTER TABLE segue ADD CONSTRAINT FK_segue_1
    FOREIGN KEY (fk_usuario_email)
    REFERENCES usuario (email)
    ON DELETE CASCADE;
 
ALTER TABLE segue ADD CONSTRAINT FK_segue_2
    FOREIGN KEY (fk_usuario_email_)
    REFERENCES usuario (email)
    ON DELETE CASCADE;