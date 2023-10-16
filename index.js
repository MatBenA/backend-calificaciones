const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = require("./configDB"); //configuracion de la base de datos


app.use(cors({
    origin:'http://localhost:3000'
}));


/*importamos los controladores que recibirán las solicitudes
del cliente y enviarán resultados*/
const materiaController = require("./controller/materiaController");
const usuariosController = require("./controller/usuariosController");
const cursoController = require("./controller/cursoController");
const notaController = require("./controller/notaController");
const security = require("./controller/security");
//ejecutamos los controladores
app.use(materiaController);
app.use(usuariosController);
app.use(cursoController);
app.use(notaController);
app.use(security.app);

//a la escucha de solicitudes en el puerto configurado
app.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Escuchando en el puerto ${config.server.port}`);
    }
});
