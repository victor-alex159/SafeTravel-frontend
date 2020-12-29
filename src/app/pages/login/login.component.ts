import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserBean } from '../../Beans/UserBean';
import swal from 'sweetalert2'
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserBean;
  isLogin: boolean = false;
    constructor(
      private authService: AuthService,
      private router: Router,
      private sharedService: SharedService
    ) { }


  ngOnInit(): void {
    this.user = new UserBean();
  }
  
  public login(e: any) {
    //const swal = require('sweetalert2');
    this.authService.login(this.user)
    .subscribe(resp => {
      console.log(this.user);
      console.log(resp);
      this.isLogin = true;
      
      this.authService.saveUser(resp.access_token);
      this.authService.saveToken(resp.access_token);

      this.router.navigate(['/so']);
      
      if(this.user.username != null || this.user.password != null) {
        swal.fire(
          'Se ha iniciado sesión correctamente!',
          'Con éxito!',
          'success'
        )
      }

    });
    e.preventDefault();
  }

}
