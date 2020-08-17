import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { cliente } from 'src/app/modelos/cliente';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: '../../vistas/vistasZonaCliente/informacion-personal.component.html',
  styleUrls: ['../../vistas/css/informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit, OnDestroy{

  public datosCliente: cliente[];  
  public formDatosPersonales : FormGroup; 
  public findInvalidControls() {
    const invalid = [];
    const controls = this.formDatosPersonales.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  constructor(private _peticionesRest : RestfullnodejsService, private _storage:LocalstorageService) 
  {
    this.formDatosPersonales = new FormGroup({
      Nombre: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(25)]),
      primerApellido: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(25)]),
      segundoApellido: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(25)]),
      fechaNacimiento: new FormControl("",[Validators.required]),
      nif: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{8}-[A-Za-z]$")]),
      telefono: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{9}$")]),
      movil: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{9}$")])
    });
  }


  RegistrarDatos(){
    
    console.log("NODE DATOSPERSONALES-->",  this.datosCliente[0]);
    let _cliente = new cliente();//<---recive el valor de los datos del formulario
    _cliente.nombre=this.formDatosPersonales.controls['Nombre'].value;
    _cliente.primerApellido=this.formDatosPersonales.controls['primerApellido'].value;
    _cliente.segundoApellido=this.formDatosPersonales.controls['segundoApellido'].value;
    _cliente.fechaNacimiento=this.formDatosPersonales.controls['fechaNacimiento'].value;
    _cliente.nif=this.formDatosPersonales.controls['nif'].value;
    _cliente.telefono=this.formDatosPersonales.controls['telefono'].value;   
    _cliente.movil=this.formDatosPersonales.controls['movil'].value;   
    this.datosCliente[0].movil= _cliente.movil;
    this.datosCliente[0].nif= _cliente.nif;
    this.datosCliente[0].nombre= _cliente.nombre;
    this.datosCliente[0].primerApellido= _cliente.primerApellido;
    this.datosCliente[0].segundoApellido=_cliente.segundoApellido;      
    this.datosCliente[0].telefono=_cliente.telefono;  
    this.datosCliente[0].fechaNacimiento=_cliente.fechaNacimiento;  

    console.log("NODE DATOSPERSONALES-->", this.datosCliente[0]);
    this._peticionesRest.InsertarDatosPersonales(this.datosCliente[0]).subscribe((res)=>{//se pasan a node los datos
      if (res) {
        console.log("NODE insercion correcta-->", res);
      } else {
        console.log("NODE err-->", this.datosCliente[0]);
      }
    })
  }

 
  ngOnInit() {

    
    var token= this._storage.RecuperarStorage('token');
      
    this._peticionesRest.decodToken(token).subscribe((result)=>{//decodifica el token 
      if (result) {//<--se recibe el token decodificado
        console.log("datoscliente-->", result)
          this.datosCliente=[];
          this.datosCliente.push(result);
      } else {
        console.log("err DATOSPERSONALES-->");
      }
      
    });
  }

  ngOnDestroy(){
    
  }
}
