import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './Auth.service';



@Injectable()
export class RouteGuardService  implements CanActivate{


constructor( private authService: AuthService, private router: Router) { 
}




canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if (!this.authService.isUserLoggedIn()) {
    this.router.navigate(['login']);
    return false;
  }
  if (route.routeConfig.path === '/login') {
    return false;
  } else {
    return true;
  }
}

}