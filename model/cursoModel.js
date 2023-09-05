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

module.exports = cursoDB;
