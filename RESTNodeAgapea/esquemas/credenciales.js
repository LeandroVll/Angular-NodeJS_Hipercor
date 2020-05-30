var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaCredenciales = new Schema({
    email: {type: String, required: true},
    password:{type: String, required: true}
  //  repassword: String
});


module.exports=mongoose.model("Credenciales", esquemaCredenciales, "credenciales");