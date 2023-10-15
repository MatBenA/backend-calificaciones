//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
const express = require("express");
const app = express();

//verificador de token
const security = require("./security");

//importacion de los métodos del modelo curso que se encargará de interactuar con la base de datos
const cursoDB = require("../model/cursoModel");

app.post("/api/curso", security.verifyToken, (req, res) => {
    cursoDB.create(req.body.nombre, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/api/curso", security.verifyToken, (req, res) => {
    cursoDB.readAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/curso/:id_curso", security.verifyToken, (req, res) => {
    cursoDB.update(req.body.nombre, req.params.id_curso, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.detail.affectedRows === 0) {
            res.status(404).send(result);
        } else {
            res.send(result);
        }
    });
});

app.delete("/api/curso/:id_curso", security.verifyToken, (req, res) => {
    cursoDB.delete(req.params.id_curso, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.affectedRows === 0) {
            res.status(404).send(result);
        } else {
            res.send(result);
        }
    });
});

//se exporta app para que pueda ser utilizada en el index
module.exports = app;
