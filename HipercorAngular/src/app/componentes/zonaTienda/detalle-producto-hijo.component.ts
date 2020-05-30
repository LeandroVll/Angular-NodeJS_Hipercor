import { Component, OnInit, Input } from '@angular/core';
import { cliente } from 'src/app/modelos/cliente';
import { Pedido } from 'src/app/modelos/pedido';
import { Router,ActivatedRoute } from "@angular/router";
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { Producto } from 'src/app/modelos/producto';
@Component({
  selector: 'app-detalle-producto-hijo',
  templateUrl: '../../vistas/vistasZonaTienda/detalle-producto-hijo.component.html',
  styleUrls: ['../../vistas/css/detalle-producto-hijo.component.css']
})
export class DetalleProductoHijoComponent implements OnInit {

  constructor(private _peticionesRest : RestfullnodejsService, private _router:Router, 
    private _rutaActiva: ActivatedRoute,
    private _storage:LocalstorageService) 
    {


    }


  @Input()elProducto:Producto[]; //<---
  public id:string='';
  public pedido:Pedido=new Pedido();
  public _producto:Producto=new Producto();
  public _cliente:cliente=new cliente();

  ngOnInit() {

     
       // console.log("----> UN producto", this._producto);
       var cantidad=1; //<---por defecto se gurada 1 luego se modifica
       let pedido:Pedido=new Pedido();
       pedido.idPedido=Math.random().toString(36).substring(2);
       pedido.nifcliente=this._cliente.nif;
       pedido.fechaPedido=new Date(Date.now());
       pedido.estadoPedido="En proceso";
       pedido.gastosEnvio=5.00;
       pedido.tipoGastosEnvio="Estandar";
     //  pedido.listaElementosPedido.push([this._producto , cantidad]); //<---array de arrays
       pedido.subtotal=(this._producto.precio)*cantidad; //<---multiplicar cantidades por precio
       pedido.total=pedido.gastosEnvio+pedido.subtotal;
       this.pedido=pedido;
   
        //busco el producto en la BD para mostrarlo
        this._peticionesRest.RecuperarUnProducto(this._producto).subscribe((result: Producto)=>{
   
          console.log("hijo-->",result);
       });
  }

}
