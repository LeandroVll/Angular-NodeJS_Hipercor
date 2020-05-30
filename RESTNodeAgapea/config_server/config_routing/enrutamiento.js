
var mongoose = require('mongoose');
var credenciales = require('../../esquemas/credenciales');
var bcrypt=require('bcrypt');
var cliente = require('../../esquemas/cliente');
var Producto = require('../../esquemas/producto');
var express= require('express');
var clienteMaiGun = require('../../esquemas/envioMail')
var router=express.Router();// <--- objeto de enrutado q voy a exportar al modulo de lapipe line
//configuramos las diferentes rutas q va a escuchar el objeto de configuracion de enrutamoento
//q va a manejar el modulo de lo pipeline de EXPRESS
var codToken = require('../../servicioToken'); //<--funcion decodif de token 
const auth = require('../middleware/auth');

//------------------------------------------------------------------------------------------------------
router.post('/registroCliente', (req,res,next)=>{

    console.log('datos enviados por el cliente angular en el registro', req.body);

    //--------------------------insercion de cleinte en mongoDB------------------------------------
      var _clienteAinsertar={}; //<---Obj Json q va a contener los datos del cleinte nuevo

        for(var prop in req.body){
            _clienteAinsertar[prop] = req.body[prop]; //<---para cada valor del req.body se gurada en el array
          //  console.log("--------***for var prop****----------"+ _clienteAinsertar[prop]);
        }

        _clienteAinsertar.cuentaActiva=false;   //<---- campo en el objeto q se va insertar para activar cuenta despues la cuenta

        bcrypt.hash(_clienteAinsertar[prop].password,10,(err, hash)=>{ //<--- hasheo la pass q van el request.body
                                                                        //  y la habia guardado como valor del array
            if(!err){   //<---si no da error el hasheo

                const _credenciales = new credenciales({        //<--obj credenciales para insertar en mongo y
                    _id: new mongoose.Types.ObjectId(),         //   crear un Id para relacionar los schemas...
                    email: req.body.credenciales.email,         //   doy valores a las variables email y password
                    password: hash
                });
                console.log('el email desde el form:--->', req.body.credenciales.email);
            //--------------comprobacion si ya hay credenciales con este email 
                        // si el usuario ya existe y no se puede hacer el insert en la BBDD
                        credenciales.findOne(
                            { "email" : _credenciales.email }, // <--- le paso el modelo criteria es decir el Id q quiero buscar en la BBDD
                            (err, resultado)=>{ //<--- el tercer parametro es un callback
                                if (resultado!=null) { //<---esq si hay usuario con ese email
    
                                    console.log('encontro al: ', resultado );
                                    res.send(200,'Ya existe una cuenta con este email: ');
                                
                                }
                                else{ 
            //-----------------> si la busqueda de las credenciales da error no hay clietes con ese email y se puede seguir con el registro                        
                                    _credenciales.save((err, result)=>{ //<--- inserto credenciales primero para relaciodar Id
                                        console.log(`Insercion de credenciales correcta en mongo: ${result}`);
                    
                                        if (!err) {
                                            
                                            _clienteAinsertar.credenciales=_credenciales;    //<--doy valor al campo credenciales en obj Json
                                            _clienteAinsertar.nif=req.body.nif;             //<-- doy valor al unico campo q es require y tiene valor default en el schema y no por el formulario
                                            
             //-------------------------------->insercion del obj cliente en mongoDB                               
                                                cliente.insertMany(_clienteAinsertar, (err, datos)=>{ //<---inserto datos en mongoDB
                                                    if (!err) {
                                                        console.log(`Insercion de datos correcta en mongo: ${datos}`);
                                                    // ahora se amnda email 
                                                    //declaro la variable con valor=(el email del cleinte) en el mensaje de confirmacion html
                                                    var _htmlPart = "<h2>Bienvenido "+ _clienteAinsertar.nombre +"</h2> </br>" + 
                                                                        "<p> Es necesario que actives tu cuenta mediante el siguiente enlace: </p><br>"+
                                                                        "<h2><a href=\"http://localhost:3000/api/activarCuenta?mail=" + _credenciales.email + "\">ACTIVAR MI CUENTA<a/></h2>"+
                                                                        "<br><p>Si no funciona el enlace inetntelo mas tarde.<br>"+
                                                                        " Gracias de parte de Hipercor.SA</p> ";
                                                    
                                                        //----Uso la funcion enviarMail de envioMail.js
                                                                        clienteMaiGun.enviarMail(   _credenciales.email, 
                                                                                    "confirmacion de registro cuenta Hipercor.com", //<--campo titulo del mail String
                                                                                    " ",    //<-- asunto del email
                                                                                    _htmlPart ); //<--- parte html con mensaje 
             //----------------------------> Respuesta  al frontend                               
             //----------------------------> genero un token en la respuesta llamando a la funcion servicioToken
                                            res.status(200).send({Token: codToken.createToken(_clienteAinsertar)});              
                                                   // res.status(200);
                                                   
                                                    
                                                    }else{
                                                        console.log(`Insercion de datos errronea en mongo: ${err}`);
                                                    }
                                                });
                                        }else{
                                            console.log(`------------>el error en el isnert de cleinte ${err} <--------------`);
                                        }                  
                                  
                                    })

                                                                                   // se redirije a la pagina del login
                                }                               
                            }                                   
                        );

             }else{
                console.log(`---eror en el if(err) del hassheo ${err}`)
            }
        }); 
    
   

});

router.get("/activarCuenta", (req,res,next)=>{
    //para cambiar la propiedad cuentaActiva=true con la propiedad UpdateOne de Mongo
    console.log('datos enviados por la url desde el email', req.query.mail);
    var _email = req.query.mail;   //valor  de la variable enviada por URL desde el email
 //-------promesa con la funcion q busca el email y recive el _id del campo credenciales
 //        de la coleccion. con el _id de credenciales puedo buscar el campo cuantaActiva          
    let _Activacion = new Promise((resolve, reject)=>{
        try {
            credenciales.find(
                        { "email" : _email }, // <--- le paso el modelo creteria es decir el Id q quiero buscar en la BBDD
                        (err, resultado)=>{ //<--- el tercer parametro es un callback
                            if (!err) {

                                resolve({
                                    resultado
                                })
                            
                            }else{   
                                reject({
                                    status: 400,
                                    message: 'fallo la promesa'
                                })                              
                            //  console.log("Fallo en la modificacion del estado de la cuenta", err);                                                   // se redirije a la pagina del login
                            }                               
                        }                                   
            );
        } catch (error) {
            reject({
                status: 400,
                message: 'fallo la promesa',
                error
            }) 
        }

    });
     
    _Activacion
    .then((statusDeActivacion)=>{
            console.log('esta es la respeusta del then ',statusDeActivacion);
            var _idCredenciales = {};
            _idCredenciales = statusDeActivacion; //<-- gurado el arr de obj q me devuelve
            //---------aqui activo la cuenta con el _id de credenciales
            cliente.updateOne(
                { "email" : _idCredenciales[0] }, // <--- le paso el modelo creteria es decir el Id q quiero buscar en la BBDD
                { "cuentaActiva": true }, //<--- el campo que quiero cambiar
                (err, resultado)=>{ //<--- el tercer parametro es un callback
                    if (!err) {
                        console.log("Modificacion del estado de la cuenta OK ", resultado);
                       
                        res.status(200).redirect('http://localhost:4200/Cliente/login'); //<---una vez pincha activar cuenta
                        next();
                    }else{                                 
                       console.log("Fallo en la modificacion del estado de la cuenta", err);                                                   // se redirije a la pagina del login
                    }                               
                }                                   
            );
    })
    .catch((error)=>{
        console.log('Error de la promesa ',error)
    })
    //console.log();
  /*  cliente.updateOne(
                        { "email" : _email }, // <--- le paso el modelo creteria es decir el Id q quiero buscar en la BBDD
                        { "cuentaActiva": true }, //<--- el campo que quiero cambiar
                        (err, resultado)=>{ //<--- el tercer parametro es un callback
                            if (!err) {
                                console.log("Modificacion del estado de la cuenta OK ", resultado);
                               // var string = encodeURIComponent('something that would break');
                                res.status(200).redirect('http://localhost:4200/Cliente/login'); //<---una vez pincha activar cuenta
                              //  next();
                            }else{                                 
                               console.log("Fallo en la modificacion del estado de la cuenta", err);                                                   // se redirije a la pagina del login
                            }                               
                        }                                   
                    );*/
});


router.post('/login', (req, res, next)=>{
    
    // aqui leeria los datos del req.body pasados por el usuario {}
    console.log('datos recividos desde la pagina login: ', req.body);
    
    //aqui deberia comrpobar el estado de la cuenta activa=true or false
    //y si la cuenta esta activa dejarle logarse
    //como busco en monggose credenciales    
    cliente.find({ _email: req.body.credenciales.mail}, (err, _cliente)=>{
        if (err) {
            console.log('Ha ocurrido un error', err);
        }else if (!_cliente) {
            console.log('no se ha encontrado el cliente', _cliente);
        } else {
                console.log('cliente encontrado: ', _cliente[0]); //<---aqui devuelve un array de jsdon
               cliente = _cliente[0];
             //  console.log(".....>",cliente);
               //<--este obj sjon debe ser {}
                res.status(200)
                              .send({  
                                        token: codToken.createToken(_cliente[0]),
                                        cliente:  _cliente[0] //<----
                                    });
        }
        next();
    });
});



//muestra los productos de la BD en la vista tienda
router.get('/productos', (req, res, next)=>{
    
    var listaProductos={};
    Producto.find((err, resultado)=>{
        if (err) {
            console.log("fallo con mongo");
        }
        else{
           // console.log("ok la extraccion",resultado);
                     
            res.status(200).send(resultado);;
            
        }
    })


});


//muestra el detalle producto
router.get('/unProducto',(req, res, next)=>{

    console.log("servidor-req-->", req.query.variableX); //<--es null siempre
    var product = req.query.unProducto;
    //como consigo el id del prodcuto del storage? 

    Producto.findOne({_id: req.query.unProducto},(err, elProducto)=>{
        if (err) {
            console.log("fallo con mongo");
        }
        else{
         //  console.log("ok la extraccion",elProducto);
                     
            res.status(200).send(elProducto);
            
        }
    })


});

 
//--------------lo exporto----------
module.exports = function(servidorExpress){
    servidorExpress.use('/api', router);
}
