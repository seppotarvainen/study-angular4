import {Injectable} from "@angular/core";
import { Headers } from '@angular/http';
/**
 * Created by Seppo on 23/08/2017.
 */

@Injectable()
export class AuthService {

  headers: Headers = new Headers();

  setAuth(token: string) {
    let auth = "Bearer " + token;
    this.headers.append("Authorization", auth);
    sessionStorage.setItem("auth", auth);
    console.log(sessionStorage);
  }

  getHeaders(): Headers{
    let auth = sessionStorage.getItem("auth");
    let head = new Headers();
    head.append("Authorization", auth);
    return head;
    // if (this.headers.get("Authorization")) {
    //   return this.headers;
    // }
    // else if (auth){
    //   this.headers.append("Authorization", auth);
    // }
    // return this.headers;
  }
}
