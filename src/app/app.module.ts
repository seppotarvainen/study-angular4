import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {ProjectListComponent} from "./project/project-list.component";
import {ProjectService} from "./project/project.service";
import {ProjectFormComponent} from "./project/project-form.component";
import {HttpModule} from "@angular/http";
import {MainComponent} from "./main.component";
import {TimerComponent} from "./timer/timer.component";
import {FormsModule} from "@angular/forms";
import {ProjectDetailsComponent} from "./project/project-details.component";
import {ProjectViewComponent} from "./project/project-view.component";

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectFormComponent,
    ProjectViewComponent,
    ProjectDetailsComponent,
    MainComponent,
    TimerComponent,
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
