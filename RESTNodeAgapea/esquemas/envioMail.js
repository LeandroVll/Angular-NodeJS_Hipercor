require('dotenv').config();
//console.log(require('dotenv').config())
var api_key =  process.env.Api_key;
var domain = process.env.Domain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 



module.exports = {

    //lo exporto como propiedad 
    enviarMail: function(cleinteMail, tituloMail, txtMail, htmlMail){
      
        var data = {
            from: 'Administracion de Hipercor.SA <d3m0gon@gmail.com>', 
            to: cleinteMail,
            subject: tituloMail,
            text : txtMail ,
            html: htmlMail  
          };
           
          mailgun.messages().send(data, function (error, body) {
              if (error) {
                  console.log( `error en el mailgun  ${error}`);
              }
            console.log(body);
          });
    
    }
}


