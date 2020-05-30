var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var esquemaProducto= new mongoose.Schema({

    idproducto: { type: String },
    categoriaProducto: { type: String },
    nombreProducto: { type: String },
    precio: { type: String },
    descripcion: { type: String },
    imagen: { type: String }

});

module.exports=mongoose.model("esquemaProducto",esquemaProducto);
