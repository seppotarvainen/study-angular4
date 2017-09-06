import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {BaseService} from "./base.service";
/**
 * Created by Seppo on 23/08/2017.
 */

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let authenticated = BaseService.isAuthenticated();

    console.log("Navigating...");
    if (!authenticated) {

      this.router.navigate(['/login']);
    }
    return authenticated;
  }
}
