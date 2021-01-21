import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserBean } from '../../Beans/UserBean';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {
      text: 'INCIO'
    }, 
    {
      text: 'HOTEL'
    },
    {
      text: 'RESTAURANTE'
    },
    {
      text: 'SERVICIO'
    },
    {
      text: 'CONTACTO'
    },
    {
      text: 'NOSOTROS'
    },
  ];
  userBean: UserBean;
  usuario: string;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userBean = new UserBean();
    this.usuario = `${this.authService.user.username }` + ' - ' + `${this.authService.user.position }`;
    console.log(this.authService.user);
  }
  
  public logout() {
    this.authService.logout();
    swal.fire('Ha cerrado sesión', 'Correctamente', 'success');
    this.router.navigate(['/main/sps']);
  }

}
