import {HttpRequest, HttpHandler, HttpUserEvent, HttpEvent} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamnameService } from '../Service/teamname.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private teamnameService: TeamnameService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
         return next.handle(req.clone());
        }

        if (localStorage.getItem('accessToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
            });

            return next.handle(clonedreq)
                  .do(
                      succ => { },
                      err => {
                          if ( err.status === 401) {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('userName');
                            localStorage.removeItem('loggedInTime');
                            this.teamnameService.isLoggedIn = false;
                            this.router.navigateByUrl('/loginpage');
                        }
                      }
                  );
        } else {
           this.router.navigateByUrl('/loginpage');
        }
    }

}
