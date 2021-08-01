import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard{

  constructor(router: Router, keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    const requiredRoles = route.data.roles;
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return Promise.resolve(true);
    }
    return Promise.resolve(requiredRoles.every((role) => this.roles.includes(role)));
  }
}
