import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { HomeComponent } from './home/home.component';

function initializeKeycloak(keycloak: KeycloakService){
  return ()=>
    keycloak.init({
      config:{
        url: 'http://localhost:9080/auth',
        realm: 'angular-keycloak',
        clientId: 'login-app'
      },
      initOptions:{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin+'/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/login'],
      loadUserProfileAtStartUp: true
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
