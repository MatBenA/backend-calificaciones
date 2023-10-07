const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuariosDB = require("../model/usuariosModel");

app.post("/api/login", login);

function login(req, res) {
    const { nickname, password } = req.body;

    //validacion de contraseña
    usuariosDB.getPwdByNick(nickname, async (err, result) => {
        if (err)
            return res
                .status(500)
                .send({ message: "Ocurrió un error.", detail: err });
        if (result.length === 0)
            return res.status(404).send("No existe este usuario.");
        const match = await bcrypt.compare(password, result[0].password);
        if (!match)
            return res.status(403).send("Nombre o contraseña inválida.");


        //funcion que traiga el valor del id del usuario
        //de la base de datos (funcion en usurioModel?)
        usuariosDB

        //Generacion de Token JWT
        //entrada <- nickname, correo, user_id
        //salida -> enviar token

        const token = jwt.sign(nickname, 10);

    });
}

module.exports = app;
