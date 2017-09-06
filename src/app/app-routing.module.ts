/**
 * Created by Seppo on 21/08/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes, RouterLink} from "@angular/router";
import {MainComponent} from "./main.component";
import {RegistrationComponent} from "./signin/registration.component";
import {LoginComponent} from "./signin/login.component";
import {AuthGuard} from "./utils/auth.guard";
import {PageNotFoundComponent} from "./utils/page-not-found.component";
import {ProjectDetailsComponent} from "./project/project-details.component";
import {ProjectFormComponent} from "./project/project-form.component";

const routes : Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {
    path: 'projects',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectDetailsComponent,
      },
      {
        path: 'add',pathMatch: 'full',
        component: ProjectFormComponent, // ProjectFormComponent
      },
      {
        path: ':id', pathMatch: 'full',
        component: ProjectDetailsComponent,
      },
      {
        path: ':id/edit',pathMatch: 'full',
        component: ProjectFormComponent, // ProjectFormComponent
      },
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

