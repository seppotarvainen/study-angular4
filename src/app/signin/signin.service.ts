/**
 * Created by Seppo on 21/08/2017.
 */

// login

// register

import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";

import "rxjs/add/operator/toPromise";
import {BaseService} from "../utils/base.service";
import {JwtResponse, TextResponse} from "../utils/response-objects";
import {UserLogin, UserRegistration} from "../utils/request-objects";
import {AuthService} from "../utils/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class SignInService extends BaseService {

  private authUrl: string;
  private token: string;

  constructor(private http: Http, private authentication: AuthService, private router: Router) {
    super(authentication);
    this.authUrl = this.baseUrl + "/auth";
  }

  register(user: UserRegistration): Promise<TextResponse>{
    return this.http.post(this.authUrl+"/registration", user)
      .toPromise()
      .then(response => response.json() as TextResponse)
      .catch(this.handleError);
  }

  login(user: UserLogin): Promise<JwtResponse> {
    return this.http.post(this.authUrl+"/login", user)
      .toPromise()
      .then(response => response.json() as JwtResponse)
      .catch(this.handleError);
  }

  setLoggedInUser(loginResponse: JwtResponse) {
    this.auth.setAuth(loginResponse.token);
  }

  get getToken() {return this.token}
}
