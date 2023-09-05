//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
const express = require("express");
const app = express();

//importacion de los métodos del modelo curso que se encargará de interactuar con la base de datos
const cursoDB = require("../model/cursoModel");

app.post("/api/curso", (req, res) => {
    cursoDB.create(req.body.nombre, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

//se exporta app para que pueda ser utilizada en el index
module.exports = app;
