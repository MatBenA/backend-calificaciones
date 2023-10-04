//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
// require("rootpath")();
const express = require("express");
const app = express();

//importacion de los métodos del modelo persona que se encargará de interactuar con la base de datos

const cursaDB = require("../model/cursaModel.js");

//se exporta app para que pueda ser utilizada en el index
module.exports = app;

app.get('/api/cursa', getAll);
app.post('/api/cursa', crear);
app.put('/api/cursa/:id_usuario/:id_materia', actualizar);
app.delete('/api/cursa/:id_usuario/:id_materia', borrar);
app.get("/api/cursa/:id_usuario", getByUser);
app.get("/api/cursa/:id_materia", getByMateria);
app.get("/api/cursa/:id_materia/:id_usuario", getByAlumnoAndMateria);


//ver todas las notas
function getAll(req, res) {
    cursaDB.getAll(function (err, resultado) {
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
    cursaDB.getByUser(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    })
}

//ver por materia y alumno
function getByAlumnoAndMateria(req, res) {
    let materia = req.params.id_materia;
    let user = req.params.id_usuario;
    cursaDB.getByAlumnoAndMateria(materia, user, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    })
}


//ver las notas por materia

function getByMateria(req, res) {
    let id = req.params.id_materia;
    cursaDB.getByMateria(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    })
}

//crear nota
function crear(req, res) {
    let nota = req.body;
    cursaDB.crear(nota, (err, resultado) => {
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
    let id_usuario = req.params.id_usuario;
    let id_materia = req.params.id_materia;
    cursaDB.actualizar(nota, id_usuario, id_materia, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


//borrar nota
function borrar(req, res) {
    let id = [req.params.id_usuario, req.params.id_materia];

    cursaDB.borrar(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Se eliminó la nota ");
        }

    });
}
