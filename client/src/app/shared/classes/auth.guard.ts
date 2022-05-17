import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.auth.isAuthenticated()) {
            return of(true) // Если пользователь зарегистрирован - можно посещать страницы
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true // Если токена нет - редирект на страницу логина
                }
            })
            return of(false)
        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state)
    }
}