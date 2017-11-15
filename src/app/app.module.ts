import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {ProjectListComponent} from "./project/project-list.component";
import {ProjectService} from "./project/project.service";
import {ProjectDetailsComponent} from "./project/project-details.component";
import {HttpModule} from "@angular/http";
import {MainComponent} from "./main.component";
import {TimerComponent} from "./timer/timer.component";
import {FormsModule} from "@angular/forms";
import {MaxLenghtValidatorDirective} from "./max-length-validator.directive";

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    MainComponent,
    TimerComponent,
    MaxLenghtValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
