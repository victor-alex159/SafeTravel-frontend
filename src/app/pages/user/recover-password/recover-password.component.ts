import { Component, OnInit } from '@angular/core';
import { UserBean } from 'src/app/Beans/UserBean';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  user: UserBean = new UserBean();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public sendEmail(e: any) {
    this.userService.recoverPassword({data: this.user}).subscribe(resp => {
      if(resp.data != null) {
        swal.fire('Se ha enviado un enlace a su correo electrónico', '','success');
      } else {
        swal.fire('El correo ingresado no está registrado', '','info');
      }
    }, error => {
      console.error(error);
    });
    e.preventDefault();
  }

}
