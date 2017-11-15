import {Injectable} from "@angular/core";
import { Headers } from '@angular/http';
import {UserInfo} from "./request-objects";
/**
 * Created by Seppo on 23/08/2017.
 */

@Injectable()
export class AuthService {

  private headers: Headers = new Headers();
  private user: UserInfo;

  setAuth(token: string) {
    let auth = "Bearer " + token;
    this.headers.append("Authorization", auth);
    sessionStorage.setItem("auth", auth);
    console.log(sessionStorage);
    let userData = this.parseJwt(token);
    console.log(userData);
    this.user = new UserInfo(userData);
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

  getUser(): UserInfo {
    return this.user;
  }


  checkAuthentication() {
    let token = sessionStorage.getItem("auth");
    if (token !== null && token.startsWith("Bearer ")) {
      this.setAuth(token.split(' ')[1]);
    }
  }

  private parseJwt (token) {
    if (!token || token.length === 0) return;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

}
