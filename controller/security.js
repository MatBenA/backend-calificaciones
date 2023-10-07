const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuariosDB = require("../model/usuariosModel");

require("dotenv").config();

app.post("/api/login", login);

function login(req, res) {
    const { email, password } = req.body;

    //validacion de contraseña
    usuariosDB.getPwdByNick(email, async (err, result) => {
        if (err)
            return res
                .status(500)
                .send({ message: "Ocurrió un error.", detail: err });
        if (result.length === 0)
            return res.status(404).send("No existe este usuario.");
        const match = await bcrypt.compare(password, result[0].password);
        if (!match) return res.status(403).send("Email o contraseña inválida.");


        //Generacion de Token JWT
        //entrada <- nickname, correo, user_id
        //salida -> enviar token

        const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
        return res.json({accessToken});
    });
}

module.exports = app;
