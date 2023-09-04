//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
// require("rootpath")();
const express = require("express");
const app = express();

//importacion de los métodos del modelo persona que se encargará de interactuar con la base de datos
const materiaDB = require("../model/materiaModel");

app.post("/api/materia", (req, res) => {
    materiaDB.create(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/api/materia", (req, res) => {
    materiaDB.getAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

//se exporta app para que pueda ser utilizada en el index
module.exports = app;
