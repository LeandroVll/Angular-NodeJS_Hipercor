// ----- van a Imports ----
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// -----componentes (Van a Declrations)-----
import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/zonaTienda/registro.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivarCuentaComponent } from './componentes/zonaCliente/activar-cuenta.component';
import { LoginComponent } from './componentes/zonaCliente/login.component';
import { PanelUsuarioComponent } from './componentes/zonaCliente/panel-usuario.component';
import { TiendaComponent } from './componentes/zonaTienda/tienda.component';
import { DetalleProductoComponent } from './componentes/zonaTienda/detalle-producto.component';
import { PedidoComponent } from './componentes/zonaTienda/pedido.component';
import { DetalleProductoHijoComponent } from './componentes/zonaTienda/detalle-producto-hijo.component';
import { GestionPedidoComponent } from './componentes/zonaCliente/gestion-pedido.component';
import { DireccionComponent } from './componentes/zonaCliente/direccion.component';
import { LospedidosechosComponent } from './componentes/zonaCliente/lospedidosechos.component';
import { ListadireccionesComponent } from './componentes/zonaCliente/listadirecciones.component';
import { AuthInterceptor } from './servicios/auth.interceptor';
import { DatePipe } from '@angular/common';
import { InformacionPersonalComponent } from './componentes/zonaCliente/informacion-personal.component';
import {  DatosAccesoComponent } from './componentes/zonaCliente/datos.acceso.component';
// ----- Servicios va a PROVIDERS -----
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    ActivarCuentaComponent,
    LoginComponent,
    PanelUsuarioComponent,
    TiendaComponent,
    DetalleProductoComponent,
    PedidoComponent,
    DetalleProductoHijoComponent,
    GestionPedidoComponent,
    DireccionComponent,
    LospedidosechosComponent,
    ListadireccionesComponent,
    InformacionPersonalComponent,
    DatosAccesoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,//<---clase q implementa el HttpInterceptor
      multi: true //<---autoriza a tener varios valores el interceptor
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
