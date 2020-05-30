import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { cliente } from 'src/app/modelos/cliente';
import { Pedido } from 'src/app/modelos/pedido';
@Component({
  selector: 'app-pedido',
  templateUrl: '../../vistas/vistasZonaTienda/pedido.component.html',
  styleUrls: ['../../vistas/css/pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private _peticionesRest : RestfullnodejsService, private _router:Router, 
              private _rutaActiva: ActivatedRoute,
              private _storage:LocalstorageService) { }

  @Input()infoProducto:Producto;
  public listaProductos:Producto[]; 
  public totalPedido:number=0;
 

  ngOnInit() {


  }



  controlPedido(){

  }



}
