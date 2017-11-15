import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UserService} from "./user.service";
import {UserInfo} from "../utils/request-objects";
/**
 * Created by Seppo on 08/09/2017.
 */


@Component({
  selector: "user-selection",
  templateUrl: "user-selection.component.html",
  styles: [
    `
      .my-resizable {
        margin-top: 1em;
        resize: vertical;
        overflow: auto;
        height: 10em;
        border: #9e9e9e solid 1px;
      }
      .my-resizable > button {
        margin-bottom: 0.4em;
        margin-right: 0.4em;
      }
      .not-selected {
        opacity: 0.5;
      }
      .img-border {
        border: white solid 2px;
      }
    `
  ]
})
export class UserSelectionComponent implements OnInit{

  /**
   * Initial selected users
   */
  @Input() selectedUsers: UserInfo[];
  @Output() updateSelectedUsers: EventEmitter<UserInfo[]> = new EventEmitter();
  users: UserInfo[] = [];
  filteredUsers: UserInfo[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().then(users => {
      let userObjects = users.map(u => {
        let user = new UserInfo(u);
        if (this.selectedUsers.findIndex(u1 => u1.id === u.id) >= 0){
          user.setSelected(true);
        }
        return user;
      });
      this.users = userObjects;
      this.filteredUsers = userObjects;
    });
  }

  onClick(user: UserInfo): void {
    if (this.getDisabled(user)) return;
    user.toggleSelected();

    this.updateSelectedUsers.emit(this.users.filter(u => u.getSelected()));
  }

  onChangeSearchTerm(search: string) {
    console.log(search);
    this.filteredUsers = this.users.filter(u => u.username.includes(search))
  }

  getDisabled(user: UserInfo): boolean {
    return user.id === this.userService.getUser().id;
  }

  getAvatar(username: string): string {
    return `https://api.adorable.io/avatars/40/${username}.png`;
  }

  getUsersLength() {
    return this.users.filter(u => u.getSelected()).length;
  }

  getUsersLengthMessage() {
    let msg: string;
    let length = this.getUsersLength() -1;
    if (length > 1) {
      msg = `It's you and ${length} others in this project.`
    } else if (length > 0) {
      msg = "It's you and one other in this project."
    } else {
      msg = "You're alone in this project.";
    }
    return msg
  }
}
