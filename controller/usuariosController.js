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

//importación para el manejo de archivos
const multer = require('multer');

//express. static para utilizar imagenes del directorio
app.use('/upload', express.static('upload'));


//se exporta app para que pueda ser utilizada en el index
module.exports = app;

app.get("/api/usuarios", security.verifyToken, getAll);
app.get("/api/usuarios/:id_usuario", security.verifyToken, getUsuarioPorId);
app.post("/api/usuarios", security.verifyToken,crear);
app.put("/api/usuarios/:id_usuario", security.verifyToken, actualizar);
app.delete("/api/usuarios/:id_usuario", security.verifyToken, borrar);
app.put(
    "/api/usuarios/editar/:id_usuario",
    security.verifyToken,
    actualizarAlumno
);
app.get(
    "/api/usuarios/materia-alumno/:id_materia",
    security.verifyToken,
    usuarioByMateria
);

app.get("/api/profesor",  security.verifyToken, getProfesor);
app.get("/api/user/:email", security.verifyToken, getUserByEmail);

//se define el almacenamiento de las imagenes 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const upload = multer({ storage: storage });

function crear(req, res) {

    //cargar una imagen 
    upload.single('imagen')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

      
        let user = req.body;
        user.imagen = req.file ? req.file.filename : null; 

        usuariosDB.crear(user, (err, resultado) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(resultado);
            }
        });
    });
}
function getAll(req, res) {
    usuariosDB.getAll(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function getProfesor(req, res) {
    usuariosDB.getProfesor(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}


function actualizar(req, res) {
    upload.single('imagen')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        // Continue with user creation
        let user = req.body;
        user.imagen = req.file ? req.file.filename : null; // Attach the image filename to the user object

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
    });
}


//actualizar siendo alumno o profesor
function actualizarAlumno(req, res) {
    
    upload.single('imagen')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        // Continue with user creation
        let user = req.body;
        user.imagen = req.file ? req.file.filename : null; // Attach the image filename to the user object
        let id = req.params.id_usuario;
        usuariosDB.actualizarAlumno(user,id, (err, resultado) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(resultado);
            }
        });
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

function getUserByEmail(req, res) {
    let email = req.params.email;
    usuariosDB.getUserByEmail(email, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else if (!resultado) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.json(resultado);
        }
    });
}

function usuarioByMateria(req, res) {
    let id_materia = req.params.id_materia;
    usuariosDB.userByMateria(id_materia, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send("Not found");
        return res.send(result);
    });
}
