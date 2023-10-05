const mysql = require("mysql2");
const configDB = require("../configDB.json");

const connection = mysql.createConnection(configDB.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Tabla curso conectada a la base de datos");
    }
});

const cursoDB = {};

cursoDB.create = function (nombre, callBack) {
    const request = "INSERT INTO curso (nombre) VALUES (?);";
    connection.query(request, nombre, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                callBack("Error: Ya existe un curso con este ID");
            } else {
                callBack(err);
            }
        } else {
            callBack(undefined, {
                message: "Se agregó el nuevo curso exitosamente",
                detail: result,
            });
        }
    });
};

cursoDB.readAll = function (callBack) {
    const request = "SELECT * FROM curso;";
    connection.query(request, (err, result) => {
        if (err) {
            callBack(err);
        } else {
            callBack(undefined, result);
        }
    });
};

cursoDB.update = function (nombre, id_curso, callBack) {
    const request = "UPDATE curso SET nombre = ? WHERE id_curso = ?;";
    connection.query(request, [nombre, id_curso], (err, result) => {
        if (err) {
            callBack(err);
        } else if (result.affectedRows === 0) {
            callBack(undefined, {
                message: "No se encontró curso con este ID",
                detail: result,
            });
        } else {
            callBack(undefined, {
                message: "Se actualizó el curso correctamente",
                detail: result,
            });
        }
    });
};

cursoDB.delete = function (id_curso, callBack) {
    const request = "DELETE FROM curso WHERE id_curso = ?;";
    connection.query(request, id_curso, (err, result) => {
        if (err) {
            callBack(err);
        } else if (result.affectedRows === 0) {
            callBack(undefined, "No se encontró curso con este ID");
        } else {
            callBack(undefined, {
                message: "Curso borrado correctamente",
                detail: result,
            });
        }
    });
};

module.exports = cursoDB;