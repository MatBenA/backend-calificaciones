//El objetivo de este archivo es el de interactuar con
//la base de datos y de la logica para enviar estos datos

//configuracion inicial
const mysql = require("mysql2");
const config = require("../configDB");

//Se inicia la conexion con la base de datos
const connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("cursa conectada a base de datos");
    }
});

//este objeto contendrá los métodos a exportar
const cursaDB = {};

//aca deben ir los métodos para interactuar con la base de datos


//crear 

cursaDB.crear = function (datos, resultado) {
    consulta = "INSERT INTO cursa (nota, id_materia, id_usuario ) VALUES (?,?,?);";
    params = [datos.nota, datos.id_materia, datos.id_usuario];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            resultado({
                message: "Error ",
                detail: err
            });

        } else {
            resultado(undefined, {
                message: "Se cargo la nota",
                detail: rows
            });
        }
    });
}

// ver todas las notas

cursaDB.getAll = function (resultado) {
    var consulta = "SELECT * FROM cursa";
    connection.query(consulta, function (err, rows) {
        if (err) {
            resultado({
                message: "No se pudo mostrar los datos",
                detail: err
            });
        } else {
            resultado(undefined, rows);
        }
    });
}



//ver nota por alumno
cursaDB.getByUser = function (id, resultado) {
    var consulta = "SELECT * FROM cursa where id_usuario = ?";
    connection.query(consulta, id, (err, rows) => {
        if (err) {
            resultado({
                message: "No se pudo mostrar los datos",
                detail: err
            });
        } else {
            resultado(undefined, rows);
        }
    });
}


//ver nota por materia

cursaDB.getByMateria = function (id, resultado) {
    var consulta = "SELECT * FROM cursa where id_materia = ?";
    connection.query(consulta, id, (err, rows) => {
        if (err) {
            resultado({
                message: "No se pudo mostrar los datos",
                detail: err
            });
        } else {
            resultado(undefined, rows);
        }
    });
}



//actualizar

cursaDB.actualizar = function (datos, id_usuario, id_materia, retorno) {
    consulta = "UPDATE cursa SET nota=?, id_materia=?, id_usuario=? WHERE (id_usuario = ? and id_materia=?)";
    params = [datos.nota, datos.id_materia, datos.id_usuario, id_usuario, id_materia];

    connection.query(consulta, params, (err, result) => {

        if (err) {

            retorno({
                message: "Error, analizar codigo error",
                detail: err
            });

        } else if (result.affectedRows == 0) {
            retorno({
                message: "No existe usuario que coincida con el criterio de busqueda",
                detail: result
            });
        } else {
            retorno(undefined, {
                message: "Se modificó la nota",
                detail: result
            });
        }
    });
}


//borrar 

cursaDB.borrar = function (id_usuario, id_materia, resultado) {


    connection.query("DELETE FROM cursa WHERE id_usuario = ? and id_materia=?", id_usuario, id_materia, err => {
        if (err) {
            resultado({ menssage: err.code, detail: err });
        }
    });
}







module.exports = cursaDB;
