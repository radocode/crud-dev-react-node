create database if not exists keiron_db;
GRANT ALL PRIVILEGES ON *.* TO 'keiron'@'localhost' IDENTIFIED BY 'keironpass';
GRANT ALL PRIVILEGES ON * . * TO 'keiron'@'localhost';
CREATE USER 'keiron'@'localhost' IDENTIFIED BY 'keironpass';
ALTER USER 'keiron'@'localhost' IDENTIFIED WITH mysql_native_password BY 'keironpass';

drop table ticket;
drop table usuario;
drop table tipo_usuario;

CREATE TABLE IF NOT EXISTS tipo_usuario (
    id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_usuario_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    FOREIGN KEY (tipo_usuario_id) REFERENCES tipo_usuario(id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS ticket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    ticket_pedido VARCHAR(255) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
)  ENGINE=INNODB;

/*tipos de usuario iniciales*/
insert into tipo_usuario(id,nombre) values (1,"Usuario");
insert into tipo_usuario(id,nombre) values (2,"Admin");

/* insertando al primer admin*/

-- insert into usuario (tipo_usuario_id,nombre,mail,pass)