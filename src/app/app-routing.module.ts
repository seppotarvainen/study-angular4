/**
 * Created by Seppo on 21/08/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes, RouterLink} from "@angular/router";
import {MainComponent} from "./main.component";
import {RegistrationComponent} from "./signin/registration.component";
import {LoginComponent} from "./signin/login.component";

const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

