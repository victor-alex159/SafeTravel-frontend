import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBean } from 'src/app/Beans/UserBean';
import swal from 'sweetalert2'
import * as bcrypt from 'bcryptjs';
import { SharedService } from 'src/app/services/shared.service';

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
    private sharedService: SharedService
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
      let salt = bcrypt.genSaltSync(10);
      this.user.password = bcrypt.hashSync(this.user.password, salt);
      this.sharedService.sendOrRecieveData('/uc/cpwt/' + this.tokenResetPassword, this.user, true)
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
