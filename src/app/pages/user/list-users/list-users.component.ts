import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

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
    public authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.sharedService.sendOrRecieveData('/uc/gau', {}, false)
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
