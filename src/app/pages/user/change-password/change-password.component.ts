import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBean } from 'src/app/Beans/UserBean';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  user: UserBean = new UserBean();
  userPassword: string = '';
  passwordValidate: boolean = false;
  passwordChanged: boolean = false;
  tokenResetPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.tokenResetPassword = this.route.snapshot.paramMap.get('tokenPassword');
  }

  public redirectSingIn() {
    this.router.navigate(['/log/fl']);
  }

  public changePassword(e: any) {
    if(this.user.password == this.userPassword) {
      this.passwordValidate = true;
      this.userService.changePasswordWithTokenPassword({data: this.user}, this.tokenResetPassword)
        .subscribe(resp => {
          if(resp.data != null) {
            swal.fire('Se ha cambiado su contraseña correctamente!', '','success');
            this.passwordChanged = true;
          } else {
            swal.fire('Ha ocurrido un error al momento de cambiar su contraseña', '','error');
          }
        });
    } else {
      swal.fire('Repita la contraseña correctamente!', 'Inténtelo otra vez','error');
    }
    e.preventDefault();
  }

}
