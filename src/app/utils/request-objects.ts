/**
 * Created by Seppo on 23/08/2017.
 */

export class UserRegistration {
  username: string = "";
  email: string = "";
  password: string = "";

  setUser(userObject: any) {
    this.username = userObject.username;
    this.email = userObject.email;
    this.password = userObject.password;
  }
}

export class UserLogin {
  username: string = "";
  password: string = "";

  setUser(userObject: any) {
    this.username = userObject.username;
    this.password = userObject.password;
  }
}
