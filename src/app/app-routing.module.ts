import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthGuard} from "./AuthGuard";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
