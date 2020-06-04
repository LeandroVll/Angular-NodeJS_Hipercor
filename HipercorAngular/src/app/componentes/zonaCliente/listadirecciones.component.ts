import { Component, OnInit } from '@angular/core';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { Direccion } from 'src/app/modelos/direccion';

@Component({
  selector: 'app-listadirecciones',
  templateUrl: '../../vistas/vistasZonaCliente/listadirecciones.component.html',
  styleUrls: ['../../vistas/css/listadirecciones.component.css']
})
export class ListadireccionesComponent implements OnInit {

  public listaDirecciones:Direccion[];  
  constructor(private _peticionesRest : RestfullnodejsService) { }

  ngOnInit() {
    this.listadirecciones()
  }


  listadirecciones(){
    this._peticionesRest.RecuperaDirecciones().subscribe((result)=>{
      if (result!=null) {
        console.log("Resultado-->", result)
        var outPutLista=[] ; 
        outPutLista.push(result);
        this.listaDirecciones=outPutLista;
      } else {
        console.log("fallo-->")
      }
    })
  }
}
