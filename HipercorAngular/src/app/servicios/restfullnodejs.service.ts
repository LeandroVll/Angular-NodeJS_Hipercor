import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { cliente } from '../modelos/cliente';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';
import { Pedido } from '../modelos/pedido';
import { Direccion } from '../modelos/direccion';
import { LocalstorageService } from './LocalstorageService';
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
  constructor( private _http: HttpClient, private _storage:LocalstorageService) { }

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
public logarCLiente(newCliete : cliente): Observable<Boolean> {//<<--compueba q existe y node devuelve
                                                              // {token: cliente, fechaexp: date}

  return this._http.post<Boolean>(  'http://localhost:3000/api/login',
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
                                      headers : new HttpHeaders({ 
                                                                  'Content-Type': 'application/json'
                                                                })
                                    }
  );
  
}

/**
 * insertar pedidos 
 de mongo*/
 public InseratarDireccion(newDireccion: Direccion): Observable<Direccion> {//<<-


  return this._http.post<Direccion>(  'http://localhost:3000/api/insertDireccion',newDireccion,
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
  );
  
}



/**
 * insertar pedidos 
 de mongo*/
 public InsertarPedido(newPedido: Pedido): Observable<Pedido> {//<<-


  return this._http.post<Pedido>(  'http://localhost:3000/api/insertPedido',newPedido,
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
  );
  
}

/**
 * recuperar productos 
 de mongo*/
 public RecuperarPedidosHechos(): Observable<Pedido[]> {//<<--arr de productos


  return this._http.get<Pedido[]>(  'http://localhost:3000/api/pedidosHechos',
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
  );
  
}

/**
 * recuperar productos 
 de mongo*/
 public RecuperaDirecciones(): Observable<Direccion[]> {//<<--arr de productos


  return this._http.get<Direccion[]>(  'http://localhost:3000/api/listaDirecciones',
                                    {
                                      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                    }
  );
  
}

}