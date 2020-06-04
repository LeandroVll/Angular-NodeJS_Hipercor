var mongoose=require("mongoose");
var Schema = mongoose.Schema;
//var Direccion = require('./direccion.js');
var Direccion = mongoose.model('Direccion'); //<---
var ListaProductos = mongoose.model('ListaProductos'); //<---


var esquemaPedido=new mongoose.Schema(
    {
        idPedido: { type: String },
        nifcliente: { type: String },        
        fechaPedido: { type: Date },
        estadoPedido: { type: String},
        tipoGastosEnvio: { type: String },
        gastosEnvio: { type: Number },       
        subtotal: { type: Number },
        total: {type: Number},        
        listaProductos: { type: Schema.ObjectId, ref: "ListaProductos" }, 
        Direccion: {  type: Schema.Types.ObjectId, ref:"Direccion" }
    }
);

module.exports=mongoose.model("esquemaPedido",esquemaPedido);