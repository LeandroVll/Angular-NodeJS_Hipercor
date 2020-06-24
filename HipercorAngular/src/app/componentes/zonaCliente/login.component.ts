import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RestfullnodejsService } from "../../servicios/restfullnodejs.service";
import { cliente } from 'src/app/modelos/cliente';
import { Credenciales } from 'src/app/modelos/credenciales';
import { Router } from "@angular/router";
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';

@Component({
  selector: 'app-login',
  templateUrl: '../../vistas/vistasZonaCliente/login.component.html',
  styleUrls: ['../../vistas/css/login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //
  public formLogin : FormGroup; //<--- propiedad de login.component.html 

  constructor(private _peticionesRest : RestfullnodejsService, private _router:Router,
              private _storage:LocalstorageService ) { 

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

    //le paso el obj cliente q contiene credenciales al servicio y este devolvera 
    //un Json {token: cliente, fechaexp: date}
     this._peticionesRest.logarCLiente(_clienteNew).subscribe((result)=>{
      console.log(`Esta es la respeusta del servidor al registro: `, result);

        //redirije a la vista 
        if(result!=null)
        {
            this._storage.AlmacenarStorage("token", result );
            this._router.navigate(["/Cliente/PanelUsuario"]);
        }
        else{
          console.log("Fallo subcripcion en el componet login");
        }

     })

  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

}
