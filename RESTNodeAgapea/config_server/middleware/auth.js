const _servicioToken = require('../../servicioToken');

//-------funcion q se inserta en la ruta de la api para comprobar el JWT leyendo las cabeceras--------

function isAuth(req, res, next){
   
    if (!req.headers.authorization) { //<--- si el token no es valido 
        return res.status(403).send({ message: 'Debes logarte primero'});
    }
     const _token = req.headers.authorization.split(' ')[1] //<---divido el array de la cabecera y capturo  
                                                            // la segunda parte q contiene el token
     
      _servicioToken.decodeToken(_token) //<---promesa 
                                        .then(response=>{
                                            req._cliente = response; //<---le paso el payload al req
                                            next()
                                        })
                                        .catch(response=>{
                                            res.status(response.status);
                                        })                                                   
        
}


module.exports= isAuth