import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --- Referencias de componentes a importar en funcion de la ruta --- 
import { RegistroComponent } from './componentes/zonaCliente/registro.component';
import { LoginComponent } from "./componentes/zonaCliente/login.component";
import { PanelUsuarioComponent } from "./componentes/zonaCliente/panel-usuario.component";
import { TiendaComponent } from "./componentes/zonaTienda/tienda.component";
import { PedidoComponent } from './componentes/zonaTienda/pedido.component';
import { DetalleProductoComponent } from './componentes/zonaTienda/detalle-producto.component';
import { GestionPedidoComponent } from './componentes/zonaCliente/gestion-pedido.component';
import { DireccionComponent } from './componentes/zonaCliente/direccion.component';
import { LospedidosechosComponent } from './componentes/zonaCliente/lospedidosechos.component';
import { ListadireccionesComponent } from './componentes/zonaCliente/listadirecciones.component';

const routes: Routes = [

  {path: "Cliente", children:[
                                {
                                   path: "Registro", component: RegistroComponent //<--Ruta de acceso hhtp...localhost:4200/cliente/Registrocomponente
                                },
                                {
                                  path: "login", component: LoginComponent //<--Ruta de acceso http://localhost:4200/cliente/loginComponent
                                },
                                {
                                  path: "PanelUsuario", component: PanelUsuarioComponent //<--Ruta de acceso http://localhost:4200/cliente/loginComponent
                                },
                                {
                                  path: "GestionPedido", component: GestionPedidoComponent //
                                },
                                {
                                  path: "Direccion", component: DireccionComponent //
                                },
                                {
                                  path: "PedidosHechos", component: LospedidosechosComponent //
                                },
                                {
                                  path: "ListaDirecciones", component: ListadireccionesComponent //
                                }
                            ],
                            

  },

  {path: "Tienda", children:[

                            {
                              path: "productos", component: TiendaComponent //
                            },
                            {
                              path: "DetalleProducto", component: DetalleProductoComponent //
                            }
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
