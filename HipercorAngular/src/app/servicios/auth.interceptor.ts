import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './LocalstorageService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private _storage:LocalstorageService) { }

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
       
        const token= this._storage.RecuperarStorage("token");//<--recupera el token del local storage
        var _date= new Date(Date.now())
        //.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        if (token) {//<--se comprueba q existe un token            
            console.log("fechaex--> "+ (token.fechaExpiracion) ,"|| ahora-->", _date)
            if (token.fechaexpiracion>_date) {//<--la "fechaexpiracion" del token 
                console.log("TIEMPO OK -->", _date)
            } else {
                
            }
            //--clona el req y agrega la cabecera athentication
            const cloned= req.clone({
                headers: req.headers.set("Authorization", "bearer "+token.token)
            })
           // console.log("bearer "+token.token)
            return next.handle(cloned);//<---se pasa la req clonada y modificada

        } else {//<--si no hay token (cuamo cuando se hace login)
           // console.log("TOKEN-INVALIDO--->"+token.token)
            return next.handle(req);//<--en caso de q no hay token q continue 
        }
       
        throw new Error("Method not implemented.");
    }


}