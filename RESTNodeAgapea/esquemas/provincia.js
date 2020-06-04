var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaProvincia = new Schema({
    codpro: {type: Number, default:""},
    nombreProv:{type: String, required: true}
});


module.exports=mongoose.model("Provincia", esquemaProvincia, "provincia");