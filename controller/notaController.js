//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
// require("rootpath")();
const express = require("express");
const app = express();

//metodo verificar token
const security = require("./security");

//importacion de los métodos del modelo persona que se encargará de interactuar con la base de datos
const notaDB = require("../model/notaModel.js");

//se exporta app para que pueda ser utilizada en el index
module.exports = app;

app.get("/api/nota", security.verifyToken, getAll);
app.post("/api/nota", security.verifyToken, crear);
app.put("/api/nota/:id_materia/:id_usuario", security.verifyToken, actualizar);
app.delete("/api/nota/:id_materia/:id_usuario", security.verifyToken, borrar);
app.get("/api/nota/:id_usuario", security.verifyToken, getByUser);
app.get("/api/nota/:id_materia", security.verifyToken, getByMateria);
app.get(
    "/api/nota/:id_materia/:id_usuario",
    security.verifyToken,
    getByAlumnoAndMateria
);

//ver todas las notas
function getAll(req, res) {
    notaDB.getAll(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

//ver las notas por alumno
function getByUser(req, res) {
    let id = req.params.id_usuario;
    notaDB.getByUser(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

//ver por materia y alumno
function getByAlumnoAndMateria(req, res) {
    let materia = req.params.id_materia;
    let user = req.params.id_usuario;
    notaDB.getByAlumnoAndMateria(materia, user, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

//ver las notas por materia

function getByMateria(req, res) {
    let id = req.params.id_materia;
    notaDB.getByMateria(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

//crear nota
function crear(req, res) {
    let nota = req.body;
    notaDB.crear(nota, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

//editar nota
function actualizar(req, res) {
    let nota = req.body;
    let id_materia = req.params.id_materia;
    let id_usuario = req.params.id_usuario;
    notaDB.actualizar(nota, id_materia, id_usuario, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

//borrar nota
function borrar(req, res) {
    const idMateria = parseInt(req.params.id_materia);
    const idUser = parseInt(req.params.id_usuario);
    notaDB.borrar(idMateria, idUser, (err, resultado) => {
        if (err) return res.status(500).send(err);
        if (resultado.affectedRows === 0)
            return res
                .status(404)
                .send("No se encontró esta nota para este usuario y materia.");
        res.send("Se eliminó la nota ");
    });
}
