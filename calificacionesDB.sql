CREATE DATABASE calificaciones;
USE calificaciones;
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
  imagen LONTEXT NULL, 
  PRIMARY KEY (id_usuario),
  FOREIGN KEY (id_rol) REFERENCES ROL(id_rol),
  FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso)
);

CREATE TABLE MATERIA
(
  id_materia INT NOT NULL auto_increment,
  nombre VARCHAR(80) NOT NULL,
  id_usuario INT NOT NULL,
  id_curso INT NOT NULL,
  id_profesor INT,
  PRIMARY KEY (id_materia),
  FOREIGN KEY (id_profesor) REFERENCES USUARIO(id_usuario);
  FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso),
  FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
 
);
 
CREATE TABLE NOTAS
(
  periodo_1 FLOAT,
  periodo_2 FLOAT,
  periodo_3 FLOAT,
  id_materia INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_materia, id_usuario),
  FOREIGN KEY (id_materia) REFERENCES MATERIA(id_materia),
  FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

INSERT INTO ROL (nombre) VALUES ("admin");
INSERT INTO ROL (nombre) VALUES ("estudiante");
INSERT INTO ROL (nombre) VALUES ("profesor");

-- Crea tres usuarios con rol de administrador (admin) 
INSERT INTO USUARIO (email, nombre, apellido, dni, password, id_rol) 
VALUES 
  ('admin@gmail.com', 'Martín', 'González', '12345678A', 'admin', 1),
  ('admin2@gmail.com', 'Lucía', 'Fernández', '87654321B', 'admin2', 1),
  ('admin3@gmail.com', 'Santiago', 'Rodríguez', '11111111C', 'admin3', 1),
  ('maria.rodriguez.profesora@gmail.com', 'María', 'Rodríguez', '30099573', 'profesor', 3), --id 4
  ('martin.gonzalez.profesor@gmail.com', 'Martín', 'González', '31099573', 'profesor', 3),
  ('laura.martinez.profesora@gmail.com', 'Laura', 'Martínez', '32099573', 'profesor', 3),
  ('carlos.lopez.profesor@gmail.com', 'Carlos', 'López', '33099573', 'profesor', 3),
  ('ana.flores.profesora@gmail.com', 'Ana', 'Flores', '34099573', 'profesor', 3),
  ('natalia.gomez.profesora@gmai.com', 'Natalia', 'Gómez', '35099573', 'profesor', 3),



-- Insertar cursos (1er Año A, 1er Año B, 2do Año A, etc.)
INSERT INTO CURSO (nombre) 
VALUES 
  ('1er Año A'),
  ('1er Año B'),
  ('2do Año A'),
  ('2do Año B'),
  ('3er Año A'),
  ('3er Año B'),
  ('4to Año A'),
  ('4to Año B'),
  ('5to Año A'),
  ('5to Año B');

-- Insertar materias correspondientes a cada curso (con las mismas para divisiones del mismo año)
-- Tres materias por año
INSERT INTO MATERIA (nombre, id_usuario, id_curso) 
VALUES 
                             --Ciclo Basico 1er y segundo Año--
  -- 1er Año A
  ('Matemática', 5, 1),
  ('Lengua y Literatura', 4, 1),
  ('Ciencias Naturales', 6, 1),
  ('Ciencias Sociales', 7, 1),
  ('Educación Física', 8, 1),

  -- 1er Año B
   ('Matemática', 5, 1),
  ('Lengua y Literatura', 4, 2),
  ('Ciencias Naturales', 6, 2),
  ('Ciencias Sociales', 7, 2),
  ('Educación Física', 8, 2),

  -- 2do Año A
  ('Matemática II', 5, 1),
  ('Lengua y Literatura II', 4, 3),
  ('Ciencias Naturales II', 6, 3),
  ('Ciencias Sociales II', 7, 3),
  ('Educación Física', 8, 3),

  -- 2do Año B 
  ('Matemática II', 5, 4),
  ('Lengua y Literatura II', 4, 4),
  ('Ciencias Naturales II', 6, 4),
  ('Ciencias Sociales II', 7, 4),
  ('Educación Física', 8, 4),

                                            -- Orientación Común (Tercer Año)--
  -- 3er Año A 
  ('Análisis Matemático', 5, 5),
  ('Lengua y Literatura', 4, 5),
  ('Ciencias Naturales', 6, 5),
  ('Ciencias Sociales', 7, 5),
  ('Educación Física', 8, 5),

  -- 3er Año
  ('Análisis Matemático', 5, 6),
  ('Lengua y Literatura', 4, 6),
  ('Ciencias Naturales', 6, 6),
  ('Ciencias Sociales', 7, 6),
  ('Educación Física', 8, 6),

                        -- Ramas Específicas - Naturales y Sociales (Cuarto Año)
  -- 4to Año A Rama de Ciencias Naturales
  ('Biología', 6, 7),
  ('Química', 2, 7),
  ('Física', 3, 7),
  ('Matemática (nivel avanzado)', 4, 7),
  ('Inglés técnico/científico', 5, 7),

 -- Rama de Ciencias Sociales
 -- 4to Año B
  ('Historia', 7, 8),
  ('Geografía', 7, 8),
  ('Economía', 3, 8),
  ('Sociología', 7, 8),
  ('Inglés técnico/científico', 5, 8),
  
  -- Ramas Específicas - Naturales y Sociales (Quinto Año)
  -- 5to año A Rama de Ciencias Naturales
  ('Biología avanzada', 6, 9),
  ('Química avanzada', 2, 9),
  ('Física avanzada', 3, 9),
  ('Matemáticas avanzadas', 4, 9),
  ('Proyecto de investigación en ciencias naturales', 6, 9),

  -- 5to Año B Rama de Ciencias Sociales
  ('Historia avanzada', 7, 10),
  ('Geografía avanzada', 7, 10),
  ('Economía avanzada', 3, 10),
  ('Sociología avanzada', 7, 10),
  ('Proyecto de investigación en ciencias sociales', 7, 10);

  