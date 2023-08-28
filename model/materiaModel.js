//El objetivo de este archivo es el de interactuar con
//la base de datos y de la logica para enviar estos datos

//configuracion inicial
const mysql = require("mysql");
const config = require("../configDB");

//Se inicia la coneccion con la base de datos
const connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("materia conectada a base de datos");
    }
});

//este objeto contendrá los métodos a exportar
const materiaDB = {};

//aca deben ir los métodos para interactuar con la base de datos

//se exporta el objeto materiaDB con todos sus métodos para ser usado en el controlador
module.exports = materiaDB;