const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = require("./configDB"); //configuracion de la base de datos

/*importamos los controladores que recibirán las solicitudes
del cliente y enviarán resultados*/
const materiaController = require("./controller/materiaController");
const usuariosController = require("./controller/usuariosController");
//ejecutamos los controladores
app.use(materiaController);
app.use(usuariosController);

//a la escucha de solicitudes en el puerto configurado
app.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Escuchando en el puerto ${config.server.port}`);
    }
});
