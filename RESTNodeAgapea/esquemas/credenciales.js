var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var esquemaCliente = mongoose.model('esquemaCliente');

var esquemaCredenciales = new Schema({
    email: {type: String, required: true},
    password:{type: String, required: true},
    cliente: {type: Schema.Types.ObjectId, ref: "esquemaCliente" } 
  //  repassword: String
});


module.exports=mongoose.model("Credenciales", esquemaCredenciales, "credenciales");