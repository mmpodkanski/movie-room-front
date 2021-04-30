import { Injectable, Injector } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private navbar: AppComponent
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.navbar.tokenStorageLogout();
          window.sessionStorage.clear();
          this.navbar.ngOnInit();
          this.router.navigate(['/login'])
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );    
  }
}
