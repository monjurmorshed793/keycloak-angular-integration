import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.keycloakService.getToken().then(res=>{
      console.log(res);
    });
  }

  async loadUserProfile(){
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  async logout(){
    await this.keycloakService.logout();
    await this.keycloakService.login();
  }

}
