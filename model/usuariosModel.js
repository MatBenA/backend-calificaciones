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

//este objeto contendrá los métodos a exportar
const usuariosDB = {};

//aca deben ir los métodos para interactuar con la base de datos

//crear
usuariosDB.crear = async function (datos, resultado) {
    const hashedPassword = await bcrypt.hash(datos.password, 10);
    consulta =
        "INSERT INTO USUARIO (email, nombre, apellido, dni, password, id_rol, id_curso) VALUES (?,?,?,?,?,?,?);";
    params = [
        datos.email,
        datos.nombre,
        datos.apellido,
        datos.dni,
        hashedPassword,
        datos.id_rol,
        datos.id_curso,
    ];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                resultado({
                    message: "Este email ya fue registrado anteriormente",
                    detail: err,
                });
            } else if (err.code == "ER_NO_REFERENCED_ROW_2") {
                resultado({
                    message: "No existe este curso o rol",
                    detail: err,
                });
            } else {
                resultado({
                    message: "Error",
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
    var consulta =
        "SELECT id_usuario, USUARIO.nombre, USUARIO.apellido, dni, email, ROL.nombre as rol FROM USUARIO INNER JOIN ROL on ROL.id_rol = USUARIO.id_rol ORDER BY id_usuario;";
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
usuariosDB.actualizar = async function (datos, id, retorno) {
    consulta =
        "UPDATE USUARIO SET email = ?, nombre = ?, apellido = ?, dni = ?, password = ?, id_rol = ?, id_curso = ? WHERE id_usuario = ?";

    const hashedPassword = await bcrypt.hash(datos.password, 10);

    params = [
        datos.email,
        datos.nombre,
        datos.apellido,
        datos.dni,
        hashedPassword,
        datos.id_rol,
        datos.id_curso,
        id,
    ];

    connection.query(consulta, params, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                retorno({
                    message: "ya existe un usuario con este mail",
                    detail: err,
                });
            } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
                retorno({
                    message: "No existe este curso o rol",
                    detail: err,
                });
            } else retorno(err);
        } else if (result.affectedRows == 0) {
            retorno(null, {
                message:
                    "No existe usuario que coincida con el criterio de busqueda",
                detail: result,
            });
        } else {
            retorno(null, {
                message: "Se modificó el usuario",
                detail: result,
            });
        }
    });
};

//actualizar siendo alumno o profesor

usuariosDB.actualizarAlumno = async function (datos, id, retorno) {
    consulta =
        "UPDATE USUARIO SET email = ?, nombre = ?, apellido = ?,  password = ? WHERE id_usuario = ?";

    const hashedPassword = await bcrypt.hash(datos.password, 10);

    params = [datos.email, datos.nombre, datos.apellido, hashedPassword, id];

    connection.query(consulta, params, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                retorno({
                    message: "ya existe un usuario con este mail",
                    detail: err,
                });
            } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
                retorno({
                    message: "No existe este curso o rol",
                    detail: err,
                });
            } else retorno(err);
        } else if (result.affectedRows == 0) {
            retorno(null, {
                message:
                    "No existe usuario que coincida con el criterio de busqueda",
                detail: result,
            });
        } else {
            retorno(null, {
                message: "Se modificó el usuario",
                detail: result,
            });
        }
    });
};

//borrar
usuariosDB.borrar = function (id, resultado) {
    connection.query(
        "DELETE FROM USUARIO WHERE id_usuario = ? ",
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

//get contraseña para compararla en la autenticacion con la contraseña recibida
usuariosDB.getPwdByNick = function (email, callBack) {
    const consulta =
        "SELECT password, id_rol, id_usuario, email, nombre, id_curso FROM USUARIO WHERE email = ?;";
    connection.query(consulta, email, (err, result) => {
        if (err) return callBack(err);
        callBack(null, result);
    });
};

//get usuario y id
usuariosDB.getUsuarioPorId = function (id_usuario, resultado) {
    var consulta =
        "SELECT id_usuario, USUARIO.nombre, apellido, dni, email, ROL.nombre as rol FROM USUARIO INNER JOIN ROL ON ROL.id_rol = USUARIO.id_rol WHERE id_usuario = ?;";
    connection.query(consulta, id_usuario, function (err, rows) {
        if (err) {
            resultado({
                message: "No se pudo obtener el usuario",
                detail: err,
            });
        } else {
            if (rows.length === 1) {
                resultado(undefined, rows); // Devuelve el primer usuario encontrado
            } else {
                resultado({ message: "Usuario no encontrado" });
            }
        }
    });
};

usuariosDB.userByMateria = function (id_materia, callBack) {
    const request =
        "SELECT USUARIO.apellido as alumno , MATERIA.nombre AS materia, MATERIA.nombre AS curso, id_usuario FROM CURSO INNER JOIN USUARIO ON USUARIO.id_curso=CURSO.id_curso INNER JOIN MATERIA ON MATERIA.id_curso=USUARIO.id_curso WHERE MATERIA.id_materia= ?;";

    connection.query(request, id_materia, (err, result) => {
        if (err) return callBack(err);
        callBack(null, result);
    });
};

usuariosDB.getUserByEmail = function (email, callBack) {
    const consulta =
        "SELECT id_rol, id_usuario, nombre, apellido, id_curso FROM USUARIO WHERE email = ?;";
    connection.query(consulta, email, (err, result) => {
        if (err) return callBack(err);
        callBack(null, result[0]);
  
    });
};

module.exports = usuariosDB;
