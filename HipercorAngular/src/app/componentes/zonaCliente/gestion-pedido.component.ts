import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { Producto } from 'src/app/modelos/producto';
import { Pedido } from 'src/app/modelos/pedido';

@Component({
  selector: 'app-gestion-pedido',
  templateUrl: '../../vistas/vistasZonaCliente/gestion-pedido.component.html',
  styleUrls: ['../../vistas/css/gestion-pedido.component.css']
})
export class GestionPedidoComponent implements OnInit {

  public losPedidos:Pedido[]; //<--se pasa a la vista 
  public pedido:Pedido=new Pedido(); //<--se inicializa   
  public losProductos=[]; //<--se inicializa
  public formPedido : FormGroup; 

  constructor(private _peticionesRest : RestfullnodejsService, private _storage:LocalstorageService) { 

    this.formPedido=new FormGroup({
      //AQUI OBJ CON DATOS PEDIDO
    });
  }

  ngOnInit() {
   
    this.mostrarPedido();
  }


  //-----------------------------calcula y muetsra el pedido-----------------------------------------------
  mostrarPedido(){

    var _pedido = this._storage.RecuperarStorage("pedido");
    this.pedido=_pedido;
    //subtotal=producto*precio
    var subtotal=0;
    for (let index = 0; index < this.pedido.listaElementosPedido.length; index++) {
      const element = this.pedido.listaElementosPedido[index];
      console.log(element[0].precio* element[1]);
      subtotal=subtotal+(element[0].precio* element[1]);
    }
    this.pedido.subtotal=subtotal;
    //total=subtotal+gastosdeenvio
    var total=this.pedido.subtotal+this.pedido.gastosEnvio;
    var total = Math.round(total * 100) / 100;
    this.pedido.total=total;
    //---esto es para mostrarlo despues de haber calculado total
    this.losPedidos=[];
    this.losPedidos.push(this.pedido);
    this.losProductos=[];
    this.losProductos=this.pedido.listaElementosPedido;
    this.losProductos.forEach(element => {
     // console.log(element[0]);
     // console.log(element[1]);

      //console.log("PEDIDO==>",this.pedido);
    });

  }


  //--------------------------------------gurada pedido en BD------------------------------------------------

  GuardarPedidoBD(){
    var _pedido= this.pedido;

    var _cliente=this._storage.RecuperarStorage("token.cliente");
    //_cliente.pedidos=[];
    //_cliente.pedidos.push(_pedido);
    console.log(_cliente);

    console.log(this.pedido,"<---en guardar")
    this._peticionesRest.InsertarPedido(_pedido).subscribe((result)=>{
      if (result!=null) {
        console.log("respuesta de NODE",result);
      }
      else{
        console.log("Fallo la respuesta del servidor");
      }
    
    })

  }
   //--------------------------------------eliminar pedido-----------------------------------------------
   EliminarPedido(_pedido: Pedido){
    console.log(_pedido);
    var elpedido=this._storage.RecuperarStorage("pedido");
    if (_pedido.idPedido===elpedido.id) {
      console.log("coinciden")
    }
    
    

  }

  ngOnDestroy(){

  }

}
