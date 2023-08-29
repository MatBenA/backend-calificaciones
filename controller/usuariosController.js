//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
// require("rootpath")();
const express = require("express");
const app = express();

//importacion de los métodos del modelo persona que se encargará de interactuar con la base de datos
const alumnosDB = require("model/usuariosModel.js");
const usuariosDB = require("../model/usuariosModel");

//se exporta app para que pueda ser utilizada en el index
module.exports = app;

app.get('/', getAll);
app.post('/', crear);
app.put('/:dni', actualizar);
app.delete('/:dni', borrar);




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
        } else {
            res.send(resultado);
        }
    });
}



function borrar(req, res) {
    let id_user = req.params.id_usuario;
   usuariosDB.borrar(id_user, (err, resultado) => {
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
