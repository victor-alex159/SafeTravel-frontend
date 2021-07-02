import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserBean } from '../../Beans/UserBean';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showButtons: boolean = false;
  showNavBar: boolean = true;
  showNavBarButton: boolean = false;

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
  username: string;
  image: string;
  imagenData: any;
  imagenEstado: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userBean = new UserBean();
    //this.usuario = `${this.authService.user.username }` + ' - ' + `${this.authService.user.position }`;
    this.username = `${this.authService.user.username }`
    if(window.screen.width <= 812) {
      this.showNavBar = false;
      this.showNavBarButton = true;
    }
    this.userService.getUserByUserSession({}).subscribe(resp => {
      this.userBean = resp.data;
      if(this.userBean != null && this.userBean.photo != null) {
          this.getImage(this.userBean.photo);
      }
    });
  }
  
  getImage(base64: any){
    let objectURL = 'data:image/jpeg;base64,' + base64;
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
    this.imagenEstado = true;
  }

  public goMyProfile() {
    this.router.navigate(['/us/profile']);
  }

  public logout() {
    this.authService.logout();
    swal.fire('Ha cerrado sesión', 'Correctamente', 'success');
    this.router.navigate(['/main/sps']);
  }

  public showButtonsHeader() {
    this.showNavBar = !this.showNavBar;
  }

}
