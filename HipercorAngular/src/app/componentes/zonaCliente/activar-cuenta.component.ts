import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { RegistroComponent } from "../zonaTienda/registro.component";
import { cliente } from 'src/app/modelos/cliente';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: '../../vistas/vistasZonaCliente/activar-cuenta.component.html',
  styleUrls: ['../../vistas/css/activar-cuenta.component.css']
})


//--------------------aqui devo recivir los datos del request y pasarselos a enrutamiento  
/**
 *
    ¿como recivo los datos desde registro.component.ts
 */

export class ActivarCuentaComponent implements OnInit, OnDestroy {

  constructor(private _peticionesRest: RestfullnodejsService) { 
    
   

  }

  activarCuenta(){

    
    let _clienteNew = new cliente();
    
    console.log(`********* AQUI 3`);
    this._peticionesRest.activarCuenta(_clienteNew).subscribe((resp: cliente)=>{
      console.log('Esta es la respeusta del servidor a la activacion de la cuenta: ', resp);
                    if (resp) {
                      console.log('>>>>>>>>>>>> activacion ok----->');
                    } else {
                      console.log('<<<<<<<<<< activacion erronea <-----');
                    }
                });
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

}
