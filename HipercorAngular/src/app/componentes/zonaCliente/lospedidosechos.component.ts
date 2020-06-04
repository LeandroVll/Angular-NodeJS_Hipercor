import { Component, OnInit } from '@angular/core';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { Pedido } from 'src/app/modelos/pedido';

@Component({
  selector: 'app-lospedidosechos',
  templateUrl: '../../vistas/vistasZonaCliente/lospedidosechos.component.html',
  styleUrls: ['../../vistas/css/lospedidosechos.component.css']
})
export class LospedidosechosComponent implements OnInit {

  public listaPedidos:Pedido[];  

  constructor(private _peticionesRest : RestfullnodejsService) { }

  ngOnInit() {
    this.RecuperarPedidos()
  }

  RecuperarPedidos(){

    this._peticionesRest.RecuperarPedidosHechos().subscribe((result)=>{
      if (result!=null) {
        console.log("respuesta->", result)
        var outPutLista=[] ; 
        outPutLista.push(result);
        this.listaPedidos=outPutLista;
      } else {
        console.log("error->")
      }
    })

    

  }

}
