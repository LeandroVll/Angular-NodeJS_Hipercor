import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { RestfullnodejsService } from "../../servicios/restfullnodejs.service";
import { Router,ParamMap, ActivatedRoute } from "@angular/router";
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { Pedido } from 'src/app/modelos/pedido';
import { cliente } from 'src/app/modelos/cliente';
@Component({
  selector: 'app-tienda',
  templateUrl: '../../vistas/vistasZonaTienda/tienda.component.html',
  styleUrls: ['../../vistas/css/tienda.component.css']
})
export class TiendaComponent implements OnInit  {

  constructor(private _peticionesRest : RestfullnodejsService, private _router:Router, 
              private _rutaActiva: ActivatedRoute,
              private _storage:LocalstorageService)
   {
  //  console.log("-->componet tienda<<<");
   }

  public listaProductos:Producto[];  //<---array q se pinta en la vista
 // public pedido:Pedido; //<-- pedido base 
  


  ngOnInit() {

    this._peticionesRest.RecuperarProductos().subscribe((result)=>{
     // console.log(`Esta es la respeusta del servidor los datos BD: `, result);
      if (result!=null) {
       // console.log(result);        
        var outPutLista=[] ; 
                                  
        console.log(result);
        outPutLista.push(result);//<---paso el result [{result},{result}] al arr de productos
        this.listaProductos=outPutLista; //<--devuelvo el arr de productos a la vista 
  
  
      }
      else{
        console.log("salio mal la subcrpcion a Recuperarproductos");
      }
    });

}

  //--------------------------------------------------------------------------------------------------

   recivir(_Producto: Producto){
     //se recive el objeto producto desde la vista tienda
    //se gurada el obje pedido sesleccionado en el storage  
    this._storage.AlmacenarStorage("Producto", _Producto);
    this._router.navigate(["/Tienda/DetalleProducto"]);
    
  //  this.creaPedido();

   }

  //-----------------------------crea pedido---------------------------------------
  //se crea un pedido inicail q guradara los datos iniciales del cleinte y se guradara en local storage
  //para q despues sea llamados por detalle producto y se agrege el array de prodcto 
/*  creaPedido(){

    var token=  this._storage.RecuperarStorage("token"); //<--recupero el cliente 

    this.pedido.idPedido=Math.random().toString(36).substring(2);
    this.pedido.nifcliente= token.cliente.nif;
    this.pedido.fechaPedido=new Date(Date.now());
    this.pedido.estadoPedido="En proceso"
    this.pedido.gastosEnvio=5.00;
    this.pedido.tipoGastosEnvio="Estandar";
  //  this.pedido.listaElementosPedido=[];//inicializo el array del Pedido
  //--gurado el pedido en el local storage
  this._storage.AlmacenarStorage("pedido", this.pedido);

}*/


}
