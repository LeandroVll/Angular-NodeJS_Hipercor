var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaListaProductos = new Schema({
    productos: [{ type: Schema.ObjectId, ref: "Productos" } | { type: Number}]
  //  repassword: String
});


module.exports=mongoose.model("ListaProductos", esquemaListaProductos, "listaProductos");