/**
 * Created by Seppo on 23/08/2017.
 */

import { Headers } from '@angular/http';
import {AuthService} from "./auth.service";
import {UserInfo} from "./request-objects";
import {isUndefined} from "util";

export class BaseService {
  protected baseUrl: string = "http://localhost:8080";
  protected auth?: AuthService;

  constructor(auth?: AuthService){
    this.auth = auth;
    this.auth.checkAuthentication();
  }

  getHeaders() {
    if (this.auth){
      return {headers: this.auth.getHeaders()}
    }
    return {headers: new Headers()}
  }

  getUser(): UserInfo{
    return this.auth.getUser();
  }

  handleError(error: any): Promise<never> {
    console.error("Error occurred!", error);
    return Promise.reject(error.message || error);
  }

  static isAuthenticated() {
    return sessionStorage.getItem('auth') !== null;
  }
}
