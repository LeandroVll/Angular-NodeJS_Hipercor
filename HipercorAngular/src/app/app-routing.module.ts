import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --- Referencias de componentes a importar en funcion de la ruta --- 
import { RegistroComponent } from './componentes/zonaCliente/registro.component';
import { LoginComponent } from "./componentes/zonaCliente/login.component";
import { TiendaComponent } from './componentes/zonaTienda/tienda.component';


const routes: Routes = [

  {path: "Cliente", children:[
                                {
                                   path: "Registro", component: RegistroComponent //<--Ruta de acceso hhtp...localhost:4200/cliente/Registrocomponente
                                },
                                {
                                  path: "login", component: LoginComponent //<--Ruta de acceso http://localhost:4200/cliente/loginComponent
                                },
                                {
                                  path: "tienda", component: TiendaComponent //<--Ruta de acceso http://localhost:4200/cliente/tienda
                                }
                            ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
