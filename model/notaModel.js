//El objetivo de este archivo es el de interactuar con
//la base de datos y de la logica para enviar estos datos

//configuracion inicial
const mysql = require("mysql");
const config = require("../configDB");

//Se inicia la conexion con la base de datos
const connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("notas conectada a base de datos");
    }
});

//este objeto contendrá los métodos a exportar
const notasDB = {};

//aca deben ir los métodos para interactuar con la base de datos

//crear

notasDB.crear = function (datos, resultado) {
    const consulta = `INSERT INTO NOTAS (periodo_1, periodo_2, periodo_3, id_materia, id_usuario ) VALUES (?,?,?,?,?);`;
    const datosArray = [
        datos.periodo_1,
        datos.periodo_2,
        datos.periodo_3,
        datos.id_materia,
        datos.id_usuario,
    ];
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

// ver todas las notass
notasDB.getAll = function (id, resultado) {
    const consulta =
        "SELECT MATERIA.nombre as materia, periodo_1, periodo_2, periodo_3, MATERIA.id_materia, NOTAS.id_usuario as id_usuario, USUARIO.apellido as apellido, USUARIO.nombre as nombre FROM MATERIA INNER JOIN NOTAS  ON MATERIA.id_materia=NOTAS.id_materia INNER JOIN USUARIO ON USUARIO.id_usuario=NOTAS.id_usuario  WHERE MATERIA.id_usuario= ?";
    connection.query(consulta, id, function (err, rows) {
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

//ver notas por alumno
notasDB.getByUser = function (id, resultado) {
    const consulta =
        "SELECT nombre, periodo_1, periodo_2, periodo_3 FROM materia INNER JOIN notas ON materia.id_materia = notas.id_materia WHERE notas.id_usuario = ?";

    connection.query(consulta, id, (err, rows) => {
        if (err) {
            console.error(`Error : ${err}`);
            resultado({ message: "No se pudo mostrar los datos", detail: err });
        } else {
            resultado(undefined, rows);
        }
    });
};

//ver notas por materia

// notasDB.getByMateria = function (id, resultado) {
//     var consulta =
//         "SELECT nickname, notas FROM nota inner join usuario on usuario.id_usuario=cursa.id_usuario where id_materia=? ";

//     connection.query(consulta, id, (err, rows) => {
//         if (err) {
//             resultado({
//                 message: "No se pudo mostrar los datos",
//                 detail: err,
//             });
//         } else {
//             resultado(undefined, rows);
//         }
//     });
// };

//actualizar

notasDB.actualizar = function (datos, resultado) {
    const consulta = `UPDATE NOTAS SET periodo_1=?,periodo_2=?,periodo_3=? WHERE (id_materia = ? and id_usuario=?)`;
    const datosArray = [
        datos.periodo_1,
        datos.periodo_2,
        datos.periodo_3,
        datos.id_materia,
        datos.id_usuario,
    ];
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

//borrar

notasDB.borrar = function (id_materia, id_usuario, callBack) {
    const consulta =
        "DELETE FROM notas WHERE id_materia = ? and id_usuario = ?;";
    connection.query(consulta, [id_materia, id_usuario], (err, result) => {
        if (err) return resultado({ menssage: err.code, detail: err });
        return callBack(null, result);
    });
};

notasDB.getByAlumnoAndMateria = function (id_materia, id_usuario, resultado) {
    const consulta =
        "SELECT periodo_1, periodo_2, periodo_3 FROM notas WHERE id_materia = ? and id_usuario = ?;";
    connection.query(consulta, [id_materia, id_usuario], (err, rows) => {
        if (err) {
            console.error(`Error : ${err}`);
            resultado({ message: "No se pudo mostrar los datos", detail: err });
        } else {
            resultado(undefined, rows[0]);
        }
    });
};

module.exports = notasDB;
