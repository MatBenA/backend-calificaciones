//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
const express = require("express");
const app = express();

//verificador de token
const security = require("./security");

//importacion de los métodos del modelo materia que se encargará de interactuar con la base de datos
const materiaDB = require("../model/materiaModel");

app.post("/api/materia", security.verifyToken, (req, res) => {
    materiaDB.create(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/api/materia", security.verifyToken, (req, res) => {
    materiaDB.getAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/api/materia/:id_materia", security.verifyToken, (req, res) => {
    materiaDB.delete(req.params.id_materia, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.detail.affectedRows === 0) {
            res.status(404).send(result.message);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/materia/:id_materia", security.verifyToken, (req, res) => {
    materiaDB.update(req.params.id_materia, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.detail.affectedRows === 0) {
            res.status(404).send(result.message);
        } else {
            res.send(result);
        }
    });
});

app.get("/api/materia/profesor-materias/:id_usuario", security.verifyToken, (req, res) => {
    const id_profesor = req.params.id_usuario;
    materiaDB.getMateriaOfProfesor(id_profesor, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send("Not found");
        res.send(result);
    });
});

//se exporta app para que pueda ser utilizada en el index
module.exports = app;
