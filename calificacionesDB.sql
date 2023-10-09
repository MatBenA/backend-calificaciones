CREATE DATABASE CALIFICACIONES;
USE CALIFICACIONES;
CREATE TABLE ROL
(
  id_rol INT NOT NULL auto_increment,
  nombre VARCHAR(80) NOT NULL,
  PRIMARY KEY (id_rol)
);

CREATE TABLE CURSO
(
  id_curso INT NOT NULL auto_increment,
  nombre VARCHAR(80) NOT NULL,
  
  PRIMARY KEY (id_curso)
);

CREATE TABLE MATERIA
(
  id_materia INT NOT NULL auto_increment,
  nombre VARCHAR(80) NOT NULL,
  id_usuario INT NOT NULL,
  id_curso INT NOT NULL,
  FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso),
  FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
  PRIMARY KEY (id_materia)
);

CREATE TABLE USUARIO
(

  id_usuario INT NOT NULL auto_increment,
  email VARCHAR(80) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  dni VARCHAR(80) NOT NULL,
  password VARCHAR(255) NOT NULL,
  id_rol INT NOT NULL,
  id_curso INT,
  PRIMARY KEY (id_usuario),
  FOREIGN KEY (id_rol) REFERENCES ROL(id_rol),
  FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso)
);

CREATE TABLE NOTAS
(
  periodo_1 DECIMAL(4, 2),
  periodo_2 DECIMAL(4, 2),
  periodo_3 DECIMAL(4, 2),
  id_materia INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_materia, id_usuario),
  FOREIGN KEY (id_materia) REFERENCES MATERIA(id_materia),
  FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

INSERT INTO ROL (nombre) VALUES ("admin");
INSERT INTO ROL (nombre) VALUES ("estudiante");
INSERT INTO ROL (nombre) VALUES ("profesor");

INSERT INTO CURSO (nombre) VALUES ("Programación I");

INSERT INTO MATERIA (nombre) VALUES ("Introduccion a Prog.");