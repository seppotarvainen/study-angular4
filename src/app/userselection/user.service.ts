import {BaseService} from "../utils/base.service";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "../utils/auth.service";
import {Router} from "@angular/router";
import {UserInfo} from "../utils/request-objects";
/**
 * Created by Seppo on 08/09/2017.
 */

@Injectable()
export class UserService extends BaseService {

  private usersUrl: string;

  constructor(private http: Http, private authentication: AuthService, private router: Router) {
    super(authentication);
    this.usersUrl = this.baseUrl + "/users";
  }

  getUsers(): Promise<UserInfo[]> {
    return this.http.get(this.usersUrl, this.getHeaders())
      .toPromise()
      .then(response => response.json() as UserInfo[])
      .catch(this.handleError);
  }
}

