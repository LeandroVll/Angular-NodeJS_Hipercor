// fichero central de configuracion y punto de entrada a nuestro servicio RESTFULL...
// para agapea en angular

//1º Instalar el paquete Express <--- creamos un servidor web
// usando las clases glovales httpservr y httpclient

var express = require('express');
var configurador = require('./config_server/configurador'); //<--- funcion q se exporta desde un modulo externo (/configurador.js)
var mongoose = require('mongoose');   //<---- Acceso a datos contra MongoDB
//------------------------SERVIDOR WEB EXPRESS----------------------
var servidor = express(); // creaos un servidor web usando express
var bcrypt=require("bcrypt");
configurador(servidor); //<---- para hacer mas comoda la confguracion del servidor creo su conf en un modulo aparte 


servidor.listen(3000, (err)=>{
    if (!err) {
        console.log('...servidor escuchando en el puerto 3000....');
    }else{
        console.log('ERROR FATAL AL LANZAR EL SERVIDOR', err);
    }
});

//--------------------------------------------------------------------


//---------------- CONEXION AL SERVIDOR DE DATOS DE MONGODB -----------
mongoose.connect('mongodb://localhost:27017/hipercorDB', {useNewUrlParser: true, useUnifiedTopology: true} ,(err)=>{

    if(err){
        console.log(`error al intentar conectarnos al servidor de MongoDB ${err}`)
        throw new Error(err);
    }else{
        console.log('...conectados al servidor de BD de MongoDB...')
    }
});