import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestfullnodejsService } from 'src/app/servicios/restfullnodejs.service';
import { Direccion } from 'src/app/modelos/direccion';
import { Provincia } from 'src/app/modelos/provincia';
import { Municipio } from 'src/app/modelos/municipio';

@Component({
  selector: 'app-direccion',
  templateUrl: '../../vistas/vistasZonaCliente/direccion.component.html',
  styleUrls: ['../../vistas/css/direccion.component.css']
})
export class DireccionComponent implements OnInit, OnDestroy {

  public formDireccion : FormGroup; 
  public findInvalidControls() {
    const invalid = [];
    const controls = this.formDireccion.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  constructor(private _peticionesRest : RestfullnodejsService) { 

    this.formDireccion=new FormGroup({
      tipovia: new FormControl("",[Validators.required,Validators.minLength(1), Validators.maxLength(20)]),
      nombrevia: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(25)]),
      edificio: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{1,2}$")]),
      escalera: new FormControl("",[Validators.maxLength(10)]),
      piso: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{1,2}$")]),
      puerta: new FormControl("",[Validators.maxLength(10)]),
      cp: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{3,6}$")]),
      codpro: new FormControl("",[ Validators.pattern("^[0-9]{3,6}$")]),
      nombreProv: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
      codmun: new FormControl("",[ Validators.pattern("^[0-9]{3,6}$")]),
      nombreMun: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(20)])
    });

    
    
  }

  RegistrarDireccion(){
    console.log(this.formDireccion);
    let _direccion = new Direccion();
    _direccion.tipovia=this.formDireccion.controls['tipovia'].value;
    _direccion.nombrevia=this.formDireccion.controls['nombrevia'].value;
    _direccion.edificio=this.formDireccion.controls['edificio'].value;
    _direccion.escalera=this.formDireccion.controls['escalera'].value;
    _direccion.piso=this.formDireccion.controls['piso'].value;
    _direccion.puerta=this.formDireccion.controls['puerta'].value;
    _direccion.cp=this.formDireccion.controls['cp'].value;
    _direccion.provincia = new Provincia(); //<--se inicailiza
    _direccion.provincia.codpro=this.formDireccion.controls['codpro'].value;
    _direccion.provincia.nombreProv=this.formDireccion.controls['nombreProv'].value;
    _direccion.localidad=new Municipio();
    _direccion.localidad.codmun=this.formDireccion.controls['codmun'].value;
    _direccion.localidad.nombreMun=this.formDireccion.controls['nombreMun'].value;

    //-----
    this._peticionesRest.InseratarDireccion(_direccion).subscribe((result)=>{
        console.log("Esta es la respuesta del Observabl==>",result);
    });


  }

  ngOnInit() {
  }

  ngOnDestroy(){
    
  }
}
