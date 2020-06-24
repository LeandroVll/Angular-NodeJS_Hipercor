import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/modelos/pedido';
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: '../../vistas/vistasZonaCliente/panel-usuario.component.html',
  styleUrls: ['../../vistas/css/panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {


  public pedido:Pedido= new Pedido();  
  public carrito:Producto[];
  constructor(private _storage:LocalstorageService) { }

  ngOnInit() {
    this.creaPedido();
    this.creaCarrito();
  }

 //-----------------------------crea pedido---------------------------------------
  //se crea un pedido inicail q guradara los datos iniciales del cleinte y se guradara en local storage
  //para q despues sea llamado por detalle producto y se agrege el array de prodcto 
  //si vuelve al panel de usuario se inicializa y se borra la lista
  creaPedido(){

    var token=  this._storage.RecuperarStorage("token"); //<--recupero el cliente 
    //
    this.pedido.idPedido=Math.random().toString(36).substring(2);
   // this.pedido.nifcliente= token.nif;
    this.pedido.fechaPedido=new Date(Date.now());
    this.pedido.estadoPedido="En proceso"
    this.pedido.gastosEnvio=5.00;
    this.pedido.tipoGastosEnvio="Estandar";
    this.pedido.listaElementosPedido=[];//inicializo el array del Pedido
  //--gurado el pedido en el local storage
  this._storage.AlmacenarStorage("pedido", this.pedido);

}

creaCarrito(){
  
   this.carrito=[];
   this._storage.AlmacenarStorage("carrito", this.carrito);
}
  
}
