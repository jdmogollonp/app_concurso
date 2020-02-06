import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const decodedToken = this.authenticationService.getTokenInformation();
    if (decodedToken) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
