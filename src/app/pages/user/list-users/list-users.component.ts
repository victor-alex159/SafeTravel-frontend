import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  listUsers: Array<UserBean> = [];
  showPopupUserForm: boolean = false;
  showPopupUserFormEdit: boolean = false;
  selectedUser: UserBean = new UserBean();
  @Output() closePopup: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private organizationService: OrganizationServiceService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.userService.getAllUsers({})
      .subscribe(resp => {
        this.listUsers = resp.datalist;
      });
  }

  public editUser(user: any) {
    let userSelected = user.data;
    this.selectedUser = new UserBean();
    this.selectedUser = JSON.parse(JSON.stringify(userSelected));
    this.showPopupUserFormEdit = true;
  }

  public showFormUser() {
    this.showPopupUserForm = true;
  }

  public onClosePopupForm(e: any) {
    if(e == 'false') {
      this.showPopupUserForm = false
      setTimeout(() => {
        this.getAllUsers();
      }, 1500);
    }
  }

  public onClosePopupFormEdit(e: any) {
    if(e == 'false') {
      this.showPopupUserFormEdit = false
      setTimeout(() => {
        this.getAllUsers();
      }, 1500);
    }
  }

}
