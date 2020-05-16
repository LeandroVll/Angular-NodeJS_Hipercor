import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { cliente } from '../modelos/cliente';
import { Observable } from 'rxjs';
//import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class RestfullnodejsService {
  // Codigo para hacer llamadasa al servicio RestFull de node, para lo cual necesito
  // el modulo HttpClient de angular
  constructor( private _http: HttpClient) { }

  /**
   * RegistraCliente
   */
  public RegistraCliente(newCliente: cliente): Observable<Boolean> {
    

    return this._http.post<Boolean>('http://localhost:3000/api/registroCliente', 
                                    newCliente,
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
                                    );
  }

  /*
    ---Aqui recive los datos desde activar-cuenta.component.ts otro metodo public
       que este a la escucha en la URL http://localhost:3000/api/activarCUenta'
       y devuelve un boolean 
       Public activarCuenta(¿que obj le deberia pasar?) ¿observable?<bool>{
      return http....
  }
  */
 public activarCuenta(newCliente: cliente): Observable<cliente> {
    

  return this._http.post<cliente>('http://localhost:3000/api/activarCUenta', 
                                  newCliente,
                                  {
                                    headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                  }
                                  );
}


/**
 * logarCLiente
newCliete : cliente : Observable<Boolean>*/
public logarCLiente(newCliete : cliente): Observable<cliente> {//<<--credenciles


  return this._http.post<cliente>(  'http://localhost:3000/api/login',
                                    newCliete,
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
  );
  
}


}
