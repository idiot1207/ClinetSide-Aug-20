import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { TeamnameService } from './Service/teamname.service';


@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  constructor(private logincomponent: TeamnameService , private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    if (localStorage.getItem('accessToken') != null) {
      return true;
      } else {
        this.router.navigate(['/loginpage']);
        return false;
      }
  }

}
