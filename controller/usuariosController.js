//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
// require("rootpath")();
const express = require("express");
const app = express();

//seguridad para verificacion de usuario
const security = require("./security");

//importacion de los métodos del modelo persona que se encargará de interactuar con la base de datos
const usuariosDB = require("../model/usuariosModel.js");

//se exporta app para que pueda ser utilizada en el index
module.exports = app;

app.get("/api/usuarios", security.verifyToken, getAll);
app.get("/api/usuarios/:id_usuario", security.verifyToken, getUsuarioPorId);
app.post("/api/usuarios", crear);
app.put("/api/usuarios/:id_usuario", security.verifyToken, actualizar);
app.delete("/api/usuarios/:id_usuario", security.verifyToken, borrar);
app.put(
    "/api/usuarios/editar/:id_usuario",
    security.verifyToken,
    actualizarAlumno
);

function getAll(req, res) {
    usuariosDB.getAll(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function crear(req, res) {
    let user = req.body;
    usuariosDB.crear(user, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function actualizar(req, res) {
    let user = req.body;
    let id = req.params.id_usuario;
    usuariosDB.actualizar(user, id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else if (resultado.detail.affectedRows === 0) {
            res.status(404).send(resultado);
        } else {
            res.send(resultado);
        }
    });
}

//actualizar siendo alumno o profesor
function actualizarAlumno(req, res) {
    let user = req.body;
    let id = req.params.id_usuario;
    usuariosDB.actualizarAlumno(user, id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function borrar(req, res) {
    let usuario_eliminar = req.params.id_usuario;
    usuariosDB.borrar(usuario_eliminar, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (resultado.detail.affectedRows == 0) {
                res.status(404).send(resultado.message);
            } else {
                res.send(resultado.message);
            }
        }
    });
}

function getUsuarioPorId(req, res) {
    const id_usuario = req.params.id_usuario;
    usuariosDB.getUsuarioPorId(id_usuario, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else if (!resultado) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.json(resultado);
        }
    });
}
