//El objetivo de este archivo es el de interactuar con
//la base de datos y de la logica para enviar estos datos

//configuracion inicial
const mysql = require("mysql2");
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
materiaDB.create = function (materiaData, callBack) {
    const request = "INSERT INTO materia (nombre, id_usuario, id_curso) VALUES (?,?,?);";
    materiaData=[materiaData.nombre, materiaData.id_usuario, materiaData.id_curso ];
    connection.query(request, materiaData, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                callBack("Ya existe una materia con esta ID");
            } else {
                callBack(err);
            }
        } else {
            callBack(undefined, {
                message: "Se agregó la materia correctamente",
                detail: result,
            });
        }
    });
};

materiaDB.getAll = function (callBack) {
    
    var request = "SELECT id_materia, materia.nombre , usuario.apellido ,usuario.nombre  ,curso.nombre FROM materia inner join usuario on usuario.id_usuario=materia.id_usuario inner join curso on materia.id_curso=curso.id_curso";

    connection.query(request, (err, result) => {
        if (err) {
            callBack(err);
        } else {
            callBack(undefined, result);
        }
    });
};

materiaDB.delete = function (id_materia, callBack) {
    const request = "DELETE FROM materia WHERE id_materia = ?;";
    connection.query(request, id_materia, (err, result) => {
        if (err) {
            callBack(err);
        } else if (result.affectedRows === 0) {
            callBack(undefined, {
                message: "No se encontró materia con este ID",
                detail: result,
            });
        } else {
            callBack(undefined, {
                message: "Materia eliminada",
                detail: result,
            });
        }
    });
};

materiaDB.update = function (id_materia, newName, callBack) {
    const request = "UPDATE materia SET nombre = ? WHERE id_materia = ?;";
    connection.query(request, [newName.nombre, id_materia], (err, result) => {
        if (err) {
            callBack(err);
        } else if (result.affectedRows === 0) {
            callBack(undefined, {
                message: "No existe materia con este ID",
                detail: result,
            });
        } else {
            callBack(undefined, {
                message: "Se actualizó la materia",
                detail: result,
            });
        }
    });
};

//se exporta el objeto materiaDB con todos sus métodos para ser usado en el controlador
module.exports = materiaDB;
