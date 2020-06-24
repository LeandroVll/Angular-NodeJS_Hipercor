require('dotenv').config();
const jwt = require('jwt-simple');
const moment = require('moment');
const _aclaveTokens =  process.env.SECRET_TOKEN;

//-----Esta funcione crea un token que dura 1 hora cuando un usuario se registra 
function createToken(_cliente) { 

    const payload={
        sub: _cliente,
        iat: moment.unix() ,
        exp: moment().add(1, 'hour').unix(),
    }

  return  jwt.encode(payload, _aclaveTokens)
 }

 //---Esta funcion decofica el token y lo lee, si esta caducado o si es valido 
 function decodeToken(token){
     const decode = new Promise((resolve, reject)=>{
        try {
                const payload =  jwt.decode(token, _aclaveTokens); //<---token decodificado
        
                if (payload.exp<=moment().unix()) { //si el payload <= a la fecha actual
                   // res.status(401).send({ message: 'el token ha expirado'})   // sesion invalida
                   reject({
                       status: 401,
                       message: 'El token ha expirado'
                   })
                }else{
                    resolve(payload.sub) //<---el cliente
                }

        } catch (error) {
            reject({
                status: 500,
                message: 'Token invalido'
            })
        }
     })

     return decode
 }

 module.exports = {
                    createToken, 
                    decodeToken
                  }