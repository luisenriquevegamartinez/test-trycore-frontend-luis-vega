import  Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { filter, tap, catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      tap((resp: HttpResponse<any>) => this.auditEvent(resp)),
      catchError(this.error),
    );
  }

  private error(err) {
    const error = err.error
    console.log(error.errors);
    Swal.fire('Error Durante la Solicitud\n' , `<pre>${ JSON.stringify( error).replace(/[\"[\]{}]+/g,'').replace(/:/g,'\n')}</pre>`, 'error');
    return throwError('Error');
  }

  private auditEvent(resp: HttpResponse<any>) {
    const eventMessage = resp.body;
    if (!eventMessage.success) {
      Swal.fire('Error Durante la Solicitud' + eventMessage.errors.toString(), '', 'error');
    }
  }


}
