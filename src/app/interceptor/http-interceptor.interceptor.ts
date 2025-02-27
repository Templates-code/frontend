import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BYPASS_AUTH } from '../services/http/http.service';
import { NotificationService } from '../services/Notification/notification.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor( private notification: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if( request.context.get(BYPASS_AUTH)){
      return next.handle(request);
    }else{
      return next.handle(request).pipe( catchError((error: HttpErrorResponse)=>{
        let errorMessage = 'Error desconocido';
        if( error.error instanceof ErrorEvent){ // Error del cliente
          if(navigator.onLine){
            errorMessage= `Error en el cliente: ${error.error.message}`;
          }else{
            errorMessage = "Sin internet";
          }
        }else {
          switch (error.status){
            case 0:
              errorMessage = '🚨 Error de red: No se pudo conectar con el servidor';
              break;
            case 400:
              errorMessage = '⚠️ Petición incorrecta (400)';
              break;
            case 401:
              errorMessage = '🔐 No autorizado (401)';
              break;
            case 403:
              errorMessage = '🚫 Prohibido (403)';
              break;
            case 404:
              errorMessage = '🔍 No encontrado (404)';
              break;
            case 408:
              errorMessage = '⏳ Timeout: El servidor tardó demasiado en responder';
              break;
            case 500:
              errorMessage = '💥 Error interno del servidor (500)';
              break;
            case 503:
              errorMessage = '🚧 Servicio no disponible (503)';
              break;
            default:
              errorMessage = `⚡ Error inesperado: ${error.status} - ${error.message}`;
              break;
          }
        }
        console.error(errorMessage);
        this.notification.openSnackBar(errorMessage,'');
        return throwError(() => new Error(errorMessage));
      }))
    }

  }
}
