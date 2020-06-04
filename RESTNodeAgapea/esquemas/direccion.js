var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var Localidad = mongoose.model('Municipio');
var Provincia = mongoose.model('Provincia');

var esquemaDirecion=new Schema(
    {
        tipovia: { type: String, required: true },
        nombrevia: { type: String , required: true},        
        edificio: { type: String , required: true },
        escalera: { type: String , default:""},
        piso: { type: String, required: true },
        puerta: { type: String, required: true  },       
        cp: {  type: String , required: true},
        provincia: { type: Schema.Types.ObjectId, ref:"Provincia"},        
        localidad: { type: Schema.Types.ObjectId, ref:"Localidad" }
    }
);

module.exports=mongoose.model("Direccion",esquemaDirecion);