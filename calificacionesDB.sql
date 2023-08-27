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
  PRIMARY KEY (id_materia)
);

CREATE TABLE USUARIO
(
  password VARCHAR(80) NOT NULL,
  email VARCHAR(80) NOT NULL,
  nickname VARCHAR(80) NOT NULL,
  id_usuario INT NOT NULL auto_increment,
  id_rol INT NOT NULL,
  id_curso INT NOT NULL,
  PRIMARY KEY (id_usuario),
  FOREIGN KEY (id_rol) REFERENCES ROL(id_rol),
  FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso)
);

CREATE TABLE cursa
(
  nota DECIMAL(3, 2) NOT NULL,
  id_materia INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_materia, id_usuario),
  FOREIGN KEY (id_materia) REFERENCES MATERIA(id_materia),
  FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);