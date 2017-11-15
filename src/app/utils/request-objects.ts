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

export class UserInfo {
  id: number;
  username: string;
  email: string;
  private selected: boolean = false;

  constructor(userObject: any) {
    if (userObject.hasOwnProperty('id')) this.id = userObject.id;
    if (userObject.hasOwnProperty('username')) this.username = userObject.username;
    if (userObject.hasOwnProperty('email')) this.email = userObject.email;
  }

  toggleSelected(): void{
    this.selected = !this.selected;
  }

  setSelected(value: boolean): void{
    this.selected = value;
  }

  getSelected(): boolean{
    return this.selected;
  }

  toJsonString(): string {
    let obj = {id: this.id};
    return JSON.stringify(obj);
  }
}
