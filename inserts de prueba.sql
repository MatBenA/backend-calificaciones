-- 3 cursos
INSERT INTO curso (nombre) VALUES ("Historia");
INSERT INTO curso (nombre) VALUES ("Música");
INSERT INTO curso (nombre) VALUES ("Ciencia");


-- 15 Estudiantes, 5 por en cada curso

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("sophia@gmail.com", "Sophia", "Castro", "40833600", "$2a$10$oDwHUaqq6q0aOM8dRGio5ukKmhJuolv93fuyzo3ext9kBTXst/9PK", 2, 1); -- password: guest

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("juan@gmail.com", "Juan", "Hernández", "41753968", "$2a$10$yj4jWrT8cbRSNLAdICggBOhQhiflu7kcK4PyQRmYqN78JUEOTAu0y", 2, 1); -- password: qwerty

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("emma@gmail.com", "Emma", "Rodríguez", "40844159", "$2a$10$MFZ4.wrcFdGJr6OSbOx.TeD.5W4yrkQVTlwxW/P2s7Bn8lkRxBa0W", 2, 1); -- password: 123123

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("jose@gmail.com", "José", "Villalba", "40725551", "$2a$10$4K.9KoiE5UPf3c7EwVmvL.pfPyZ4ZzhVjM6kaOB7yptyZ/kFauIDq", 2, 1); -- password: letmein

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("isabell@gmail.com", "Isabella", "Luna", "43170097", "$2a$10$Wospfqkq.oqJpVCCw1GtnuI3FUnRJZKh2StekLQCSoK.Lcg2TI8Q6", 2, 1); -- password: 12345
-- -----------------------------------------------------------------------------------

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("miguel@gmail.com", "Miguel", "Olivera", "40034647", "$2a$10$RTIzMwTE5/TaI7FAYUf87ejaffQHz6jPCEvfMZyihWbQ4pUiS34wS", 2, 2); -- password: ianhateight

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("oli@gmail.com", "Olivia", "Mansilla", "42156523", "$2a$10$YNHu1RNIr3iAfFp3V8a8NO6HtBcSIBTgv1wZCK2REqF/1mu8SVshq", 2, 2); -- password: contraseña

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("carlos@gmail.com", "Carlos", "Ponce", "43246384", "$2a$10$qwic9SPSjRLbZLwXJ8bDQeoAYMoehBUXjEIteuUe4LpMaPEOfwajy", 2, 2); -- password: abcdef
 
INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("ava@gmail.com", "Ava", "Sosa", "43538694", "$2a$10$5xdnUrTqA/vg4yxKIQ7JouJKe3B.of3ZnDiiKXcCYVUSNpNjsi2pa", 2, 2); -- password: secreto

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("aiden@gmail.com", "Aiden", "Quiroga", "40709497", "$2a$10$LXvI/0oW6gL67vnEYT0DGOndhIaFsVlUvlVWH7fwebb/SFgD/05YC", 2, 2); -- password: keralegonso
-- -----------------------------------------------------------------------------------

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("emily@gmail.com", "Emily", "Ramírez", "43479469", "$2a$10$69/XO3sqzjUNQedZQjiozuC/YGGe/P8A83Ps8Enw8o4cpDgQYgtQe", 2, 3); -- password: mipass

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("liam@gmail.com", "Liam", "Juárez", "40915629", "$2a$10$ZP1ozf0UNYgMyVd.Q2OG4.J/.cBphZkIWypICXz62G57Mxj65qfHW", 2, 3); -- password: password

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("abi@gmail.com", "Abigail", "Fernández", "40517267", "$2a$10$Se2PXFewmFFl6Ub4kFb5xu311/j7yibgUqN8LPFhWQffcDQSQl1ju", 2, 3); -- password: arbolitos

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("lucas@gmail.com", "Lucas", "Acosta", "42228602", "$2a$10$yYd0ZAhSnVbREFU.jSjuFeIEqGG4sH2DUKWY4k/UAUEG5yMOBagUa", 2, 3); -- password: superman

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol, id_curso) 
VALUES ("mia@gmail.com", "Mia", "Campos", "40304829", "$2a$10$4Ui4QZxj//YMRmUQRo2Uv.bv5NAN3DCh0gUnsU103AS55jYfSCIZm", 2, 3); -- password: yocampos


-- 6 Profesores -- -----------------------------------------------------------------------------------
INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol) 
VALUES ("madi@gmail.com", "Madison", "Benítez", "32117215", "$2a$10$t/hm0pIkChd4cqL06hAU1OaV177woyCO3bjbZ9yU3ghipIAFGYWWG", 3); -- password: soyprofe

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol) 
VALUES ("benja@gmail.com", "Benjamín", "Muñoz", "34256503", "$2a$10$89.QK0etJqCo9AiWF0fU0eDbj/HGyeaE/.SpOyxmwEwYmcJMIP2a2", 3); -- password: estudien

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol) 
VALUES ("eli@gmail.com", "Elizabeth", "Paz", "30383816", "$2a$10$m62bzQRw7IWE7L6Fhy.ad.cVw2WDg0XBR4LSInRGFHaDNICMfxlma", 3); -- password: aprobad0s

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol) 
VALUES ("dani@gmail.com", "Daniel", "Vera", "31783731", "$2a$10$A60DPp1FkGOOpjWbHof0wOvLT1487cbFYLL9WISri0/t0NWFSeGd6", 3); -- password: 1234

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol) 
VALUES ("sofi@gmail.com", "Sofía", "Ruiz", "34130021", "$2a$10$al0hHKm.ABUv/7KOXrZ.g.pu1mntv1tmN3omlEmrENMw128d8EbXC", 3); -- password: micontraseña

INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol) 
VALUES ("ale@gmail.com", "Alejandro", "Silva", "31091785", "$2a$10$8YyN2LgPbIgAWOKpv6CyjeQw4MqARldkuEgQM3d2/APOKmw.jZd5G", 3); -- password: estoico


-- 1 Administrador -- -----------------------------------------------------------------------------------
INSERT INTO usuario (email, nombre, apellido, dni, password, id_rol) 
VALUES ("admin@gmail.com", "Matías", "Benegas", "33469008", "$2a$10$PvXkwjVjrRwzsee/UEWlRevccMiYTuN9VsQIG3w5pHoluMtW8w1/K", 1); -- password: admin


-- 6 materias, 2 por curso
INSERT INTO materia (nombre, id_usuario, id_curso) VALUES ("Historia Antigua", 17, 1);
INSERT INTO materia (nombre, id_usuario, id_curso) VALUES ("Edad Media", 18, 1);

INSERT INTO materia (nombre, id_usuario, id_curso) VALUES ("Teoría Musical", 19, 2);
INSERT INTO materia (nombre, id_usuario, id_curso) VALUES ("Orquesta", 20, 2);

INSERT INTO materia (nombre, id_usuario, id_curso) VALUES ("Metodo Científico" , 21, 3);
INSERT INTO materia (nombre, id_usuario, id_curso) VALUES ("Laboratorio" , 22, 3);






