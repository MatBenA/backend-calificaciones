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
        console.log("nota conectada a base de datos");
    }
});

//este objeto contendrá los métodos a exportar
const notaDB = {};

//aca deben ir los métodos para interactuar con la base de datos

//crear

notaDB.crear = function (datos, resultado) {
    const consulta =
        "INSERT INTO nota (calificacion, id_materia, id_usuario ) VALUES (?,?,?);";
    const datosArray = Object.values(datos);
    connection.query(consulta, datosArray, (err, rows) => {
        if (err) {
            resultado({
                message: "Error ",
                detail: err,
            });
        } else {
            resultado(undefined, {
                message: "Se cargo la nota",
                detail: rows,
            });
        }
    });
};

// ver todas las notas

notaDB.getAll = function (resultado) {
    var consulta = "SELECT * FROM nota";
    connection.query(consulta, function (err, rows) {
        if (err) {
            resultado({
                message: "No se pudo mostrar los datos",
                detail: err,
            });
        } else {
            resultado(undefined, rows);
        }
    });
};
//consulta del profesor de nota por alumno por materia

notaDB.getByAlumnoAndMateria = function (materia, user, resultado) {
    var consulta =
        "SELECT  usuario.nickname as alumno,materia.nombre as materia, calificacion FROM materia inner join calificacion inner join usuario on materia.id_materia=cursa.id_materia and usuario.id_usuario=cursa.id_usuario where usuario.id_usuario =? and materia.id_materia=?";

    connection.query(consulta, materia, user, (err, rows) => {
        if (err) {
            resultado({
                message: "No se pudo mostrar los datos",
                detail: err,
            });
        } else {
            resultado(undefined, rows);
        }
    });
};

//ver nota por alumno
notaDB.getByUser = function (id, resultado) {
    var consulta =
        "SELECT  nombre, nota FROM materia inner join nota  on materia.id_materia=cursa.id_materia where id_usuario = ?";

    connection.query(consulta, id, (err, rows) => {
        if (err) {
            resultado({
                message: "No se pudo mostrar los datos",
                detail: err,
            });
        } else {
            resultado(undefined, rows);
        }
    });
};

//ver nota por materia

notaDB.getByMateria = function (id, resultado) {
    var consulta =
        "SELECT nickname, nota FROM nota inner join usuario on usuario.id_usuario=cursa.id_usuario where id_materia=? ";

    connection.query(consulta, id, (err, rows) => {
        if (err) {
            resultado({
                message: "No se pudo mostrar los datos",
                detail: err,
            });
        } else {
            resultado(undefined, rows);
        }
    });
};

//actualizar

notaDB.actualizar = function (datos, id_materia, id_usuario, retorno) {
    consulta =
        "UPDATE nota SET calificacion=?, id_materia=?, id_usuario=? WHERE (id_usuario = ? and id_materia=?)";
    params = [
        datos.nota,
        datos.id_materia,
        datos.id_usuario,
        id_usuario,
        id_materia,
    ];

    connection.query(consulta, params, (err, result) => {
        if (err) {
            retorno({
                message: "Error, analizar codigo error",
                detail: err,
            });
        } else if (result.affectedRows == 0) {
            retorno({
                message:
                    "No existe usuario que coincida con el criterio de busqueda",
                detail: result,
            });
        } else {
            retorno(undefined, {
                message: "Se modificó la nota",
                detail: result,
            });
        }
    });
};

//borrar

notaDB.borrar = function (id_materia, id_usuario, callBack) {
    const consulta = "DELETE FROM nota WHERE id_materia = ? and id_usuario = ?;";
    connection.query(consulta, [id_materia, id_usuario], (err, result) => {
        if (err) return resultado({ menssage: err.code, detail: err });
        return callBack(null, result);
    });
};

module.exports = notaDB;
