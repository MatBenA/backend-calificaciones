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
        console.log(result)
        if (err)
            return res
                .status(500)
                .send({ message: "Ocurrió un error.", detail: err });
        if (result.length === 0)
            return res.status(404).send("No existe este usuario.");
        const match = await bcrypt.compare(password, result[0].password);
        if (!match) return res.status(403).send("Email o contraseña inválida.");
       
         let user={
            id_rol:result.id_rol,
            id_usuario:result.id_usuario,
            email:result.email,
        

         }
        //Generacion de Token JWT
        //entrada <- nickname, correo, user_id
        //salida -> enviar token

        const accessToken = jwt.sign(result[0], process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m"});
        return res.json({ accessToken });
    });
}

function verifyToken(req, res, next) {
    const token = req.get("authorization");
    if (!token) return res.status(401).send("No hay token de acceso");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Ocurrió un error");
        req.user = user;
        next();
    
    });
}

module.exports = { app, verifyToken };
