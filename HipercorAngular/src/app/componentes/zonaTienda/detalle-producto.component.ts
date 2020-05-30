import { Component, OnInit , Input} from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { RestfullnodejsService } from "../../servicios/restfullnodejs.service";
import { Router,ParamMap, ActivatedRoute } from "@angular/router";
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { cliente } from 'src/app/modelos/cliente';
import { Pedido } from 'src/app/modelos/pedido';
import { promise } from 'protractor';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: '../../vistas/vistasZonaTienda/detalle-producto.component.html',
  styleUrls: ['../../vistas/css/detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  //---------------------------
  public _producto:Producto=new Producto();
  public _cliente:cliente=new cliente();
  public elProducto:Producto[]; 
  public id:string='';
  public pedido:Pedido=new Pedido();
  //  @Input()infoProducto:Producto;
  public producto:Producto=new Producto();
      

  constructor(private _peticionesRest : RestfullnodejsService, private _router:Router, 
    private _rutaActiva: ActivatedRoute,
    private _storage:LocalstorageService) 
    { 
      
    }


  ngOnInit() {
    
        this._producto=this._storage.RecuperarStorage("Producto");
        //this.elProducto.push(this._producto);
            
        if (this._producto.idproducto==="undefined" || this._producto.idproducto===null) {
          console.log("no===>",this._producto);
        //  this.Productoseleccionado();
        } else {
          var x = localStorage.getItem("Producto");
        //  this.Productoseleccionado();
        }
        let lapromesa= new Promise(()=>{
          
        });
        this.Productoseleccionado(this._producto);

        
  }

  

  Productoseleccionado(producto2: Producto){
    console.log("el producto-->", producto2);
   // console.log("----> UN producto", this._producto);
    var cantidad=1; //<---por defecto se gurada 1 luego se modifica
    let pedido:Pedido=new Pedido();
    pedido.idPedido=Math.random().toString(36).substring(2);
    pedido.nifcliente=this._cliente.nif;
    pedido.fechaPedido=new Date(Date.now());
    pedido.estadoPedido="En proceso";
    pedido.gastosEnvio=5.00;
    pedido.tipoGastosEnvio="Estandar";
    pedido.listaElementosPedido.push([producto2, cantidad]); //<---array de arrays
    pedido.subtotal=(this._producto.precio)*cantidad; //<---multiplicar cantidades por precio
    pedido.total=pedido.gastosEnvio+pedido.subtotal;
    this.pedido=pedido;

     //busco el producto en la BD para mostrarlo
     this._peticionesRest.RecuperarUnProducto(producto2).subscribe((result: Producto)=>{

    });

    

    //cerar un pedido vacio para guradar los 
    //los productos en la session cliente...y luego suardarlo en BD
    //se confirmará la compra del pedido despues
 /*   let _cliente:cliente= new cliente(); 
    _cliente=this._storage.RecuperarStorage("cliente") as cliente;

    let pedido:Pedido=new pedido();
    pedido.idPedido=Math.random().toString(36).substring(2);
    pedido.nifcliente=_cliente.nif;
    pedido.fechaPedido=new Date(Date.now());
    pedido.estadoPedido="En proceso";
    pedido.gastosEnvio=5.00;
    pedido.tipoGastosEnvio="Estandar";
    pedido.listaElementosPedido.push([_producto, cantidad]); //<---array de arrays
    pedido.subtotal=(_producto.precio)*cantidad; //<---multiplicar cantidades por precio
    pedido.total=pedido.gastosEnvio+pedido.subtotal;
*/


  }

 
  
}
