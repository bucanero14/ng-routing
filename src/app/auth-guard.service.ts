import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

export class AuthGuard implements CanActivate {
    constructor(private authSvc: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.authSvc.isAuthenticated().then(
            (authenticated: boolean) => {
                if (authenticated) {
                    return true;
                }

                this.router.navigate(['/']);
            }
        );
    }
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }
}