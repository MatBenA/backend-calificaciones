//El objetivo de este archivo es el de interactuar con
//la base de datos y de la logica para enviar estos datos

//configuracion inicial
const mysql = require("mysql2");
const config = require("../configDB");
const bcrypt = require("bcrypt");

//Se inicia la conexion con la base de datos
const connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("usuario conectada a base de datos");
    }
});

//59d345df79ebcfbb12bbcaf228fff709ab3c6756

//este objeto contendrá los métodos a exportar
const usuariosDB = {};

//aca deben ir los métodos para interactuar con la base de datos

//crear

usuariosDB.crear = async function (datos, resultado) {
    const hashedPassword = await bcrypt.hash(datos.password, 10);
    consulta =
        "INSERT INTO usuario (password, email, nickname,  id_rol , id_curso ) VALUES (?,?,?,?,?);";
    params = [
        hashedPassword,
        datos.email,
        datos.nickname,
        datos.id_rol,
        datos.id_curso,
    ];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                resultado({
                    message: "El usuario ya fue registrada anteriormente",
                    detail: err,
                });
            } else {
                resultado({
                    message: "Error diferente",
                    detail: err,
                });
            }
        } else {
            resultado(undefined, {
                message: "Se creo el usuario",
                detail: rows,
            });
        }
    });
};

// ver

usuariosDB.getAll = function (resultado) {
    var consulta = "SELECT * FROM usuario";
    connection.query(consulta, function (err, rows) {
        if (err) {
            resultado({
                message: "No se pudo mostrar los usuarios",
                detail: err,
            });
        } else {
            resultado(undefined, rows);
        }
    });
};

//actualizar

usuariosDB.actualizar = function (datos, id, retorno) {
    consulta =
        "UPDATE usuario SET password = ?, email= ?, nickname= ?,  id_rol= ? , id_curso= ? WHERE id_usuario = ?";
    params = [
        datos.password,
        datos.email,
        datos.nickname,
        datos.id_rol,
        datos.id_curso,
        id,
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
                message: "Se modificó el usuario",
                detail: result,
            });
        }
    });
};


//actualizar siendo alumno o profesor

usuariosDB.actualizarAlumno = function (datos, id, retorno) {
    consulta = "UPDATE usuario SET password = ?, email= ?, nickname= ? WHERE id_usuario = ?";
    params = [datos.password, datos.email, datos.nickname, id];

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
                message: "Se modificó el usuario",
                detail: result
            });
        }
    });
}



//borrar


usuariosDB.borrar = function (id, resultado) {
    connection.query(
        "DELETE FROM usuario WHERE id_usuario = ? ",
        id,
        (err, result) => {
            if (err) {
                resultado({ menssage: err.code, detail: err });
            } else {
                if (result.affectedRows == 0) {
                    resultado(undefined, {
                        message:
                            "No se encontro un usuario con el id ingresado",
                        detail: result,
                    });
                } else {
                    resultado(undefined, {
                        message: "Usuario eliminado",
                        detail: result,
                    });
                }
            }
        }
    );
};


//get contraseña para compararla en la autenticacion
usuariosDB.getPwdByNick = function (nickname, callBack) {
    const consulta = "SELECT password FROM usuario WHERE nickname = ?;";
    connection.query(consulta, nickname, (err, result) => {
        if (err) return callBack(err);
        callBack(null, result);
    });
};

//get usuario y id

module.exports = usuariosDB;
