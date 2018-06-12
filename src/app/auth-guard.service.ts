import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './providers/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Access validation based on route and role
    // console.log('AuthGuard#canActivate called');
    // console.log(state.url);

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.signOut(true);
      return false;
    }
  }
}
