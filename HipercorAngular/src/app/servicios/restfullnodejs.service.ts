import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { cliente } from '../modelos/cliente';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';
import { Pedido } from '../modelos/pedido';
//import { promise } from 'protractor';
/***
 * 
 * Para usar la funcion AUTH de mi servicio middleware de Nodejs tengo q implementar aqui el tipo de dabecera
 * q este va a recibir
 * 
 */

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

/**
 * recuperar productos 
 de mongo*/
public RecuperarProductos(): Observable<Producto[]> {//<<--arr de productos


  return this._http.get<Producto[]>(  'http://localhost:3000/api/productos',
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
  );
  
}

/**
 * recuperar productos 
 de mongo*/
 public RecuperarUnProducto(unProducto: Producto): Observable<Producto> {//<<--paso el producto del storage
  let params= new HttpParams();
  params= params.append('variableX', unProducto.idproducto);
  console.log(params,"<---servicio");
  return this._http.get<Producto>(  'http://localhost:3000/api/unProducto',
                                                    {
                                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                                    }
  );
  
}


/**
 * recuperar productos 
 de mongo*/
 public InsertarPedido(newPedido: Pedido): Observable<Pedido> {//<<-


  return this._http.get<Pedido>(  'http://localhost:3000/api/insertPedido',
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
  );
  
}


}