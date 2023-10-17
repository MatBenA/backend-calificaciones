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
        datos.id_usuario
    ]
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
notasDB.getAll = function (id,resultado) {
    var consulta = "SELECT  USUARIO.apellido ,USUARIO.nombre  ,MATERIA.nombre as materia ,periodo_1 , periodo_2, periodo_3 FROM NOTAS INNER JOIN USUARIO ON USUARIO.id_usuario=NOTAS.id_usuario INNER JOIN MATERIA ON MATERIA.id_materia=NOTAS.id_materia where materia.id_usuario=?";
    connection.query(consulta,id, function (err, rows) {
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

//consulta del profesor de notas por alumno por materia
notasDB.getByAlumnoAndMateria = function (materia, user, resultado) {
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

//ver notas por alumno
notasDB.getByUser = function (id, resultado) {
    var consulta =
        "  SELECT  MATERIA.nombre as MATERIA, periodo_1,periodo_2, periodo_3 FROM MATERIA INNER JOIN NOTAS  ON MATERIA.id_materia=NOTAS.id_materia INNER JOUN USUARIO ON USUARIO.id_usuario=NOTAS.id_usuario  WHERE USUARIO.id_usuario= ?"

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

//ver notas por materia

notasDB.getByMateria = function (id, resultado) {
    var consulta =
        "SELECT nickname, notas FROM nota inner join usuario on usuario.id_usuario=cursa.id_usuario where id_materia=? ";

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

notasDB.actualizar = function (datos, id_materia, id_usuario, retorno) {
   
    consulta = `UPDATE notas SET periodo_1=?,periodo_2=?,periodo_3=?, id_materia=?, id_usuario=? WHERE (id_usuario = ? and id_materia=?)`;

    const datosArray = [
        datos.periodo_1,
        datos.periodo_2,
        datos.periodo_3
       
    ]

    connection.query(consulta, datosArray,id_materia,id_usuario, (err, result) => {
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
                message: "Se modificó la notas",
                detail: result,
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

module.exports = notasDB;
