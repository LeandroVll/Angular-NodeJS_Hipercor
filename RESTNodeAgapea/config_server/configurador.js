var bcrypt = require("bcrypt");
var mongoose = require('mongoose');  
var cookieParser = require('cookie-parser'); //<---modulo de la pipeline para poder usar las cookies
var bodyParser= require('body-parser'); //<---modulo para poder acceder a los datos enviados por un cleinte en las 
                                              // peticiones POST

var enrutamiento = require('./config_routing/enrutamiento'); // modulo de configuracion de enrutamiento de la pipeline
//var hbs=require("express-handlebars"); //modulo generador VISTAS

module.exports=function(servidorExpress){
    //esta funcion es la ejecuta el fichero central de configuracion: server.js
    //como argumento debe recibir uan instacia de un servidor web express ... 


    // Aqui debo configurar la pipeline del servidor express, la PIPELINE es un conjunto de modulos q 
    //van procesando la peticion del cleinte, la transforman y la pasan al siguiente modulo 
    // o pueden  devolver la respuesta al cleinte: 
    //Para configurar los modulos de la pipe line de express se usa el metodo: .use

    //1º modulo de la PIPELINE 
    servidorExpress.use(cookieParser()); 
    //2º modulo de la PIPELINE
    servidorExpress.use(bodyParser.urlencoded({extended: false})); //codificacion de datos UTF-8 
    servidorExpress.use(bodyParser.json()); //poder interpretar datos JSON en el body
   
    //3º Modulo para habilitar CORS (CORS --> evita error en el navegador por usar varios puertos 
    //                                        habilitando unas cabeceras especiales )
    servidorExpress.use(function(req,res,next){
                res.header("Access-Control-Allow-Origin","*");
                res.header("Access-Control-Allow-Credentials",req.headers.origin);
                res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Origin");
                next();
       // res.setHeader("Access-Control-Allow-Origin", "*");
       // res.setHeader("Access-Control-Allow-Credentials", "true");
      //  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
       // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    });

     //4º modulo: segun la ruta q solicite el cliente se ejecutara una determida funcion 
    enrutamiento(servidorExpress);

}