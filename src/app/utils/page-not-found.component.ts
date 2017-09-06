import {Component} from "@angular/core";
/**
 * Created by Seppo on 23/08/2017.
 */

@Component({
  template: `
    <div>
      <h1>Page not found</h1>
      <p>Try the <a routerLink="/projects">projects page</a>, will you?</p>
    </div>`,
  selector: "page-not-found"
})
export class PageNotFoundComponent {}
