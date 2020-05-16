import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RestfullnodejsService } from "../../servicios/restfullnodejs.service";
import { cliente } from 'src/app/modelos/cliente';
import { Credenciales } from 'src/app/modelos/credenciales';

@Component({
  selector: 'app-login',
  templateUrl: '../../vistas/vistasZonaCliente/login.component.html',
  styleUrls: ['../../vistas/css/login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //
  public formLogin : FormGroup; //<--- propiedad de login.component.html 

  constructor(private _peticionesRest : RestfullnodejsService ) { 

      //creo un objeto json con validaciones  
      this.formLogin = new FormGroup({
        email: new FormControl("",[Validators.required,Validators.pattern("^.*@.*"),Validators.maxLength(50)]),
        password: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(25)])
      });
  }

  logarCliente(){
    let _clienteNew = new cliente();
    _clienteNew.credenciales = new Credenciales();
     _clienteNew.credenciales.email= this.formLogin.controls['email'].value;
     _clienteNew.credenciales.password= this.formLogin.controls['password'].value;

    //le paso el obj cliente.credenciales al servicio
     this._peticionesRest.logarCLiente(_clienteNew).subscribe((cleinteRespuesta: cliente)=>{
      console.log(`Esta es la respeusta del servidor al registro: `, cleinteRespuesta);
     })

  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

}
