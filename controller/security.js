const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuariosDB = require("../model/usuariosModel");

app.post("/api/login", login);

function login(req, res) {
    console.log(req.body);
    const { nickname, password } = req.body;
    usuariosDB.getPwdByNick(nickname, async (err, result) => {
        if (err)
            return res
                .status(500)
                .send({ message: "Ocurrió un error.", detail: err });
        if (result.length === 0) return res.status(404).send("No existe este usuario.");
        const match = await bcrypt.compare(password, result[0].password);
        if (!match)
            return res.status(403).send("Nombre o contraseña inválida.");
        return res.send("Loged in succesfully");
    });
}

module.exports = app;
