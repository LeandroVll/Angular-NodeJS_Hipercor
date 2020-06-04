import { Component, OnInit , Input} from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { RestfullnodejsService } from "../../servicios/restfullnodejs.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LocalstorageService } from 'src/app/servicios/LocalstorageService';
import { cliente } from 'src/app/modelos/cliente';
import { Pedido } from 'src/app/modelos/pedido';
import { promise } from 'protractor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: '../../vistas/vistasZonaTienda/detalle-producto.component.html',
  styleUrls: ['../../vistas/css/detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  //--------------------------- 
  public losProductos:Producto[];   //<--se pasa a la vista  
  public unproducto:Producto=new Producto(); //<---es el prodcuto q se va pintar
  public pedido:Pedido;
  public carrito:Producto[];
  private _subcripcion:Subscription;
  constructor(private _peticionesRest : RestfullnodejsService, private _router:Router,
              private _storage:LocalstorageService, 
              private _rutaActiva: ActivatedRoute) 
    { 
      
    }


  ngOnInit() 
  {
    this.Productoseleccionado();

    this.carrito=[];
  }
  
 //--------------------------muestra el producto seleccionado------------------------------
 
  Productoseleccionado(){
//-------------recupero los valores del storage ----token, cliente y producto
  var token=  this._storage.RecuperarStorage("token");
 // console.log("el cleinte dentro del token-->", token.cliente.nif);
 // console.log("el token dentro del token-->", token.token);
  var tokenproducto = this._storage.RecuperarStorage("Producto");
  console.log("este es el producto seleccionado desde la tienda",tokenproducto._id);
 // var storageArr=[];
 // storageArr.push(tokenproducto);

  var tokenproducto = this._storage.RecuperarStorage("Producto");//<--recive el id del producto seleccionado
//------recupero la lista de productos
        this._subcripcion=this._peticionesRest.RecuperarProductos().subscribe((_producto)=>{
             if (_producto!=null) {
             // console.log("dentro",_producto[2]._id);
             // recivo todos los prodcutos
                _producto.forEach(element => {
              //   console.log("lo q hay en la respuesta del servicio",element); //<--element es un Producto    
                if (element._id==tokenproducto._id) { //<--identifico por id el prdoducto
                  this.unproducto=element;
                  
                //  console.log("funcionaa-->", this.unproducto._id);
                  //aqui element ya es un obj prodcuto
                  //Pedido solo admite array de productos
                  //tengo q pasar el objeto a un array de productos
                 this.losProductos=[];//<--inicializo el array q muestra el producto
                 this.losProductos.push(this.unproducto); //<---le paso el producto al array 
                // console.log("arr--->",this.losProductos[0]);


                } else {
              //    console.log("nooo", );
                }           
                

              });
             }
          
        });

  }


//--------------------------recive la confirmacion de agregar al carrito-------------------------------
  AgregaraCarrito(_Producto: Producto){
  //---carrito esta inicializado desde panle de usuario y lo llamo del localstorage
  //    
   var _carrito=this._storage.RecuperarStorage("carrito");
   this.carrito=_carrito;
   this.carrito.push(_Producto);
   this._storage.AlmacenarStorage("carrito",this.carrito);
   console.log(this.carrito);
   this.modificarPedido(_Producto);

  //---------------------------------------------------------------------------------
  /*
  var num = 1;
   var lista = this._storage.RecuperarStorage("lisaProductos");
   

  if (lista!=null) { //si contiene algun elemento q almacene en el array carrito el producto
      this.carrito.push(_Producto);
      this._storage.AlmacenarStorage("listaProductos",this.carrito);
      console.log("carrito not null-->");
    } else { //si no hay carrito (lista de productos seleccionados) q se cree
     
        if (this.carrito.length===0) {
          console.log("carrito vacio-->");          
          this.carrito.push(_Producto);
          this._storage.AlmacenarStorage("listaProductos",this.carrito);
          this.modificarPedido(_Producto);
        } 
        else { //si el carrito tiene algun producto es decir lista de storage
          
          console.log("carrito tiene algo-->"); //si tiene algo q busque el id en pedido.listaElementosPedido


         /* this.carrito.forEach(_producto => { //---el array q contiene el producto
            // console.log("carrito-->",_producto);
             //aqui deberia comprobar si hay una id igual en el array 
             if (_producto._id===_Producto._id) { //si la id dentro de la lista cincide con el producto pasado hay modificar el valor de number
               num++;
               console.log("coincidencias de id--->",num);
               //---hay q buscar la posicion en el array y en esa cambiar el number [arr[0], num]
              // this.pedido.listaElementosPedido.push([_producto,num]); //<--esto hay q modificarlo
              //deberia pasar el array
                var _pedido = this._storage.RecuperarStorage("pedido");
                this.pedido=_pedido;
                this.pedido.listaElementosPedido.splice(1,num);
                this.pedido.listaElementosPedido.forEach(element => {
                 console.log("dentro lista===>",element);
               });

             }
         
           });

          //----------
          this.carrito.push(_Producto); //<--agrega un producto a la lista 
          this._storage.AlmacenarStorage("listaProductos",this.carrito); //<---guarda la list en localstorage
          this.modificarPedido(_Producto);
        }
        
      
    }*/
    
   
  }

contar(_Producto:Producto){

}  

//-----------------------------modificar pedido y agregar array de producto---------------------------------------
//se modifica el pedido inicail q guradara los datos del carrito 
modificarPedido(_Producto:Producto){

  //--recupero el pedido del localstorage y modifico con los datos del producto nuevo
  var _pedido = this._storage.RecuperarStorage("pedido");
  this.pedido=_pedido;
  var _carrito=this._storage.RecuperarStorage("carrito");
  this.carrito=_carrito;
  //---cuenta el numero de veces q se repite la id de un roducto en carrito 
  var num=0;
  for (let index = 0; index < this.carrito.length; index++) {
    const element = this.carrito[index];
    if (element._id===_Producto._id) {
      num++;     
    }
    
  }

 //---meto los datos en el pedido
 if (this.pedido.listaElementosPedido.length===0) {
   console.log("--pedido vacio--");
   this.pedido.listaElementosPedido.push([_Producto,1]);
   this._storage.AlmacenarStorage("pedido", this.pedido);
 } else {
  console.log("--pedido con algo--");
  var cont=2;
  for (let index = 0; index < this.pedido.listaElementosPedido.length; index++) {
    const element = this.pedido.listaElementosPedido[index];
    if (element[0]._id===_Producto._id) { //<---busca en 
      console.log(element[1],"<==for lista");
      //aqui habria q sustituir
      this.pedido.listaElementosPedido.splice(index,1,[_Producto,num]); //<--sustituye array de tuplas en su primera posicion
     // this.pedido.listaElementosPedido.splice(index+1,1);
      this._storage.AlmacenarStorage("pedido", this.pedido);
      break;
    }
    
    if (element[0]._id!==_Producto._id) {
      
      this.pedido.listaElementosPedido.splice(this.carrito.length,1 ,[_Producto,1]);
      this.pedido.listaElementosPedido.splice(index+2,1);  //<---quita el item demas q aparace 
      this._storage.AlmacenarStorage("pedido", this.pedido); 
    }

          
  }
  
  //this._storage.AlmacenarStorage("pedido", this.pedido);
 }


}
//------------busca el producto y lo elimina del array de listaproducto de peddio--------------------
QuitardePedido(_producto: Producto){

  var _pedido =this._storage.RecuperarStorage("pedido");
  this.pedido=_pedido;
  //recorro el array y busco el elemeto con el id 
  for (let index = 0; index < this.pedido.listaElementosPedido.length; index++) {
    const element = this.pedido.listaElementosPedido[index];
    if (element[0]._id===_producto._id) {
        console.log(element[1], "<---cantidad producto eliminar");
        var num = element[1];   
        if (num<1) {
          console.log("menorrr"); //<--tengo q evitar q sea menor a 1
        }   
        this.pedido.listaElementosPedido.splice(index,1,[_producto,num-1]); //<---sustitulle el valor number de [Producto|number]
        this._storage.AlmacenarStorage("pedido", this.pedido);              //  con su (valor-1)
        this.eliminarProductoCarrito(_producto);
    }
    
  }
  
}

eliminarProductoCarrito(_producto: Producto){
  var _carrito=this._storage.RecuperarStorage("carrito");
  this.carrito=_carrito;
  //---cuenta el numero de veces q se repite la id de un roducto en carrito 
  var num=0;
  for (let index = 0; index < this.carrito.length; index++) {
    const element = this.carrito[index];
    if (element._id===_producto._id) {      
         this.carrito.splice(index,1);
         this._storage.AlmacenarStorage("carrito", this.carrito);
    }
    
  }
}
  
}

