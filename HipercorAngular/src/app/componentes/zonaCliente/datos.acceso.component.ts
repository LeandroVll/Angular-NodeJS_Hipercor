import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { cliente } from 'src/app/modelos/cliente';
import { Credenciales } from 'src/app/modelos/credenciales';

@Component({
  selector: 'app-datos.acceso',
  templateUrl: '../../vistas/vistasZonaCliente/datos.acceso.component.html',
  styleUrls: ['../../vistas/css/datos.acceso.component.css']
})
export class DatosAccesoComponent implements OnInit, OnDestroy {

  public formcuenta:FormGroup;//<--el fromgrup q valida el primer form (el del email)
  public formPassword:FormGroup;
  public datosCliente: cliente[]; 
  public _cliente: cliente;  

  constructor(private _peticionesRest: RestfullnodejsService,  private _storage:LocalstorageService) 
  {
    this.formcuenta = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.pattern("^.*@.*"),Validators.maxLength(50)])
    });
    this.formPassword = new FormGroup({
      password: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(25)]),
      oldpassword: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(25)]),
      repassword: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(25)]),
    });
  }


  cambiarCuenta()
  {    
    console.log(this.formcuenta)
    let _clienteNew = new cliente();
    _clienteNew.credenciales = new Credenciales();//<---hay q importar e iniciar el objeto credenciales
    _clienteNew.credenciales.email= this.formcuenta.controls['email'].value;
    console.log('====*====>',_clienteNew.credenciales.email)
    
    
    this._peticionesRest.InsertarDatosPersonales(this._cliente).subscribe((res)=>{//se pasan a node los datos
      if (res) {
        console.log("NODE insercion correcta-->", res);
      } else {
        console.log("NODE err-->", this._cliente);
      }
    })
    
  }

  cambiarPassword()
  {
    console.log(this.formPassword)
    let _clienteNew = new cliente();
    _clienteNew.credenciales = new Credenciales();//<---hay q importar e iniciar el objeto credenciales
    _clienteNew.credenciales.password= this.formPassword.controls['password'].value;
    _clienteNew.credenciales.repassword= this.formPassword.controls['repassword'].value;
   var _oldpassword= this.formPassword.controls['oldpassword'].value;


   //---se comprueba q coiciden las _olpassword con la de la BD
   //--se tiene q descodificar la password en this.datosCliente[0].credenciales para comparar 
   var cli= this._cliente;
   var newcreds = _clienteNew.credenciales.repassword;
   var _data = {cli,newcreds, _oldpassword }; //<--obj con todos los datos q neceita el servidor
   console.log(this._cliente.credenciales)
 

   //<--esta comparando hashed pass con numeros
   // console.log('contraseña antigua correcta',this.datosCliente[0].credenciales )
     if ( _clienteNew.credenciales.password == _clienteNew.credenciales.repassword) {
      console.log('la pass y la repass conciden' )
        this._peticionesRest.ActualizaCredenciales(_data).subscribe((result)=>{
          if (result) {
            console.log('respueta del servidor===>', result)
          } else {
            console.log('LA RESPUESTA DEL SERVIDOR')          
          }
        });
     } else {
      console.log('NO coinciden las pass y la repass')
     }


  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
    
    var _token= this._storage.RecuperarStorage('token');
    console.log(_token)
    this._peticionesRest.decodToken(_token).subscribe((_client)=>{//<---
      if (_client) {
        console.log("datoscliente-->", _client)
          this._cliente=_client;
          this.datosCliente=[];          
          this.datosCliente.push(_client);
          //this._storage.AlmacenarStorage('_client',this._cliente)
      } else {
        
      }
    });
  }

}
