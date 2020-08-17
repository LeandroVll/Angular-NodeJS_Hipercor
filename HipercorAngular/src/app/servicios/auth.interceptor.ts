import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './LocalstorageService';
import { DatePipe } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private _storage:LocalstorageService, public datepipe: DatePipe) { }

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
       
        const token= this._storage.RecuperarStorage("token");//<--recupera el token del local storage
        var _dateNow= new Date(Date.now());
        var formatDate= this.datepipe.transform(_dateNow, 'yyyy-MM-ddThh:mm:ss+02:00');
      //  console.log('*--->',token.fechaExpiracion)
        var tokenEX= token.fechaExpiracion;
        
        if (token) {//<--se comprueba q existe un token            
           // console.log("fechaex--> "+ new Date(tokenEX) ,"|| fechaforma-->", new Date(formatDtae))
            if ( (new Date(tokenEX).getTime()) > (new Date(formatDate)).getTime()) {//<--la "fechaexpiracion" del token 
                console.log("TIEMPO OK -->", tokenEX)
                //--clona el req y agrega la cabecera athentication
                const cloned= req.clone({
                headers: req.headers.set("Authorization", "bearer "+token.token)
                })
                return next.handle(cloned);//<---se pasa la req clonada y modificada
            } 
            else 
            {
                console.log("TIEMPO INVALIDO -->", tokenEX)
                return next.handle(req);//<--en caso de q no hay token q continue 
            }

        } else {//<--si no hay token (cuamo cuando se hace login)
           // console.log("TOKEN-INVALIDO--->"+token.token)
            return next.handle(req);//<--en caso de q no hay token q continue 
        }
    }


}