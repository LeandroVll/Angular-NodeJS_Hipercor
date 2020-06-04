var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaMunicipio = new Schema({
    codpro: {type: String, default: ""},
    codmun:{type: String, default: ""},
    nombreMun:{type: String, required: true}
});


module.exports=mongoose.model("Municipio", esquemaMunicipio, "municipio");