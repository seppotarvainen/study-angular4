import {BrowserModule} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {FormInput} from "./form/form-input.component";
import {ProjectListComponent} from "./project/project-list.component";
import {ProjectService} from "./project/project.service";
import {ProjectDetailsComponent} from "./project/project-details.component";
import {HttpModule} from "@angular/http";
import {MainComponent} from "./main.component";
import {ChecklistComponent} from "./checklist/checklist.component";
import {TimerComponent} from "./timer/timer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaxLenghtValidatorDirective} from "./max-length-validator.directive";
import {DurationPipe} from "./timer/duration.pipe";
import {AppRoutingModule} from "./app-routing.module";
import {SigninModule} from "./signin/signin.module";
import {AuthService} from "./utils/auth.service";
import {AuthGuard} from "./utils/auth.guard";
import {PageNotFoundComponent} from "./utils/page-not-found.component";
import {ProjectFormComponent} from "./project/project-form.component";
import {FormInputModule} from "./form/form-input.module";
import {Lock} from "./utils/lock.directive";
import {SubProjectComponent} from "./subproject/sub-project.component";
import {SubProjectFormComponent} from "./subproject/sub-project-form.component";
import {SubProjectDetailsComponent} from "./subproject/sub-project-details.component";
import {UserSelectionComponent} from "./userselection/user-selection.component";
import {UserService} from "./userselection/user.service";

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    ProjectFormComponent,
    MainComponent,
    ChecklistComponent,
    SubProjectComponent,
    SubProjectFormComponent,
    SubProjectDetailsComponent,
    TimerComponent,
    MaxLenghtValidatorDirective,
    DurationPipe,
    PageNotFoundComponent,
    UserSelectionComponent,
    Lock
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    SigninModule,
    FormInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProjectService,
    AuthService,
    UserService,
    AuthGuard],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
