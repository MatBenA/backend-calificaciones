//El objetivo de este archivo controlador es el
//de recibir solicitudes y enviar respuestas

//configuracion inicial
// require("rootpath")();
const express = require("express");
const app = express();

//importacion de los métodos del modelo persona que se encargará de interactuar con la base de datos
const materiaDB = require("../model/materiaModel");


//se exporta app para que pueda ser utilizada en el index
module.exports = app;
