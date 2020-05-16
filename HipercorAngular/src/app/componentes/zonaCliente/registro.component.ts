import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from'@angular/forms';
import { cliente } from 'src/app/modelos/cliente';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { Credenciales } from 'src/app/modelos/credenciales';

@Component({
  selector: 'app-registro',
  templateUrl: '../../vistas/vistasZonaCliente/registro.component.html',
  styleUrls: ['../../vistas/css/registro.component.css']
})

//-------------------------------------esta es la clase --------------------------------------------
export class RegistroComponent implements OnInit, OnDestroy{

  //varibale pubica q va servir de conexion entre este componente y su lista
  public formregistro:FormGroup;

  constructor(private _peticionesRest: RestfullnodejsService) {
    //conjunto de instrucciones que se invocan nada mas 
    //invocarse al comonente por el modulo de enrutamiento
    this.formregistro = new FormGroup({ //este jason tiene 
      email: new FormControl("",[Validators.required,Validators.pattern("^.*@.*"),Validators.maxLength(50)]),
      password: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(25)]),
      repassword: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(25)]),
      nombre: new FormControl("",[Validators.required,Validators.maxLength(25)]),
      primape: new FormControl("",[Validators.required,Validators.maxLength(25)]),
      secape: new FormControl("",[Validators.required,Validators.maxLength(25)])
    });
   }

   RegistrarCliente(){
     console.log(this.formregistro);
     //Tnego que mandar un JSON al Rest de NODEJS para almacenarlo en MongoDB
     //creo objeto de tipo cliente 
     let _clienteNew = new cliente();
     _clienteNew.nombre=this.formregistro.controls['nombre'].value;
     _clienteNew.primerApellido=this.formregistro.controls['primape'].value;
     _clienteNew.segundoApellido=this.formregistro.controls['secape'].value;

     //Hay q instanciar el objeto credenciales
      _clienteNew.credenciales = new Credenciales();
     _clienteNew.credenciales.email= this.formregistro.controls['email'].value;
     _clienteNew.credenciales.password= this.formregistro.controls['password'].value;

     // aqui se hace la invocacion a mi servicio angular
     this._peticionesRest.RegistraCliente(_clienteNew).subscribe((respuesta : Boolean)=>{

          console.log(`Esta es la respeusta del servidor al registro: `, respuesta);
          if (respuesta) {
            //registro ok paso datos a activar-cuenta.compone
            //se los deberia pasar con el servicio Restfullnodejs
           
            //
                console.log(`********* AQUI 1`);
               this._peticionesRest.activarCuenta(_clienteNew);//<--deberian ser las credenciales
               console.log(`********* AQUI 2`, _clienteNew);

          }else{
            //registro failed... mensaje de error
          }
     });

   }
//-----------------------------------------next--------------------------------------------
  ngOnInit() {
    //conjunto de instrucciones q se invocan  EL COMPOENTE
    //antes de renderizar la vistas


  }
//----------------------------------------complete ----------------------------------------
  ngOnDestroy(){
    //conjunto de instrucciones que se invocan justo antes de descargarse la vista del componente
    //y destruir el conujunto de instrucciones de este componente y pasar a otro <---
  }


}
