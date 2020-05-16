// ----- van a Imports ----
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// -----componentes (Van a Declrations)-----
import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/zonaCliente/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivarCuentaComponent } from './componentes/zonaCliente/activar-cuenta.component';
import { LoginComponent } from './componentes/zonaCliente/login.component';
import { TiendaComponent } from './componentes/zonaTienda/tienda.component';
// ----- Servicios va a PROVIDERS -----
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    ActivarCuentaComponent,
    LoginComponent,
    TiendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
