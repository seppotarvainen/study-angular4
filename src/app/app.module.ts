import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {ProjectListComponent} from "./project/project-list.component";
import {ProjectService} from "./project/project.service";
import {ProjectDetailsComponent} from "./project/project-details.component";
import {HttpModule} from "@angular/http";
import {MainComponent} from "./main.component";
import {ChecklistComponent} from "./checklist/checklist.component";
import {TimerComponent} from "./timer/timer.component";
import {FormsModule} from "@angular/forms";
import {MaxLenghtValidatorDirective} from "./max-length-validator.directive";
import {DurationPipe} from "./timer/duration.pipe";
import {AppRoutingModule} from "./app-routing.module";
import {SigninModule} from "./signin/signin.module";

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    MainComponent,
    ChecklistComponent,
    TimerComponent,
    MaxLenghtValidatorDirective,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    SigninModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
