import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  user: UserBean;
  organizationList: Array<OrganizationBean> = [];
  profile: ProfileBean = new ProfileBean();
  date_format:string = 'dd/MM/yyyy';
  genderMale: boolean = false;
  genderFamele: boolean = false;
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);
  typePosition: any = [
    {
      type: 2,
      name: 'Administrador - Organización'
    },
    {
      type: 3,
      name: 'Turista'
    }
  ];

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private organizationService: OrganizationServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new UserBean();
    if(this.authService.hasRole('Administrador')) {
      this.getAllOrganizations();
    }
  }

  public getAllOrganizations() {
    this.organizationService.getAllOrganization({})
      .subscribe(resp => {
        this.organizationList = resp.datalist;
      });
  }

  public saveUser(e: any) {
    //const swal = require('sweetalert2');
    this.user.profile = this.profile;
    if(this.authService.hasRole('Administrador')) {
      if(this.profile.type == '3'){
        this.user.profile.id = +this.profile.type;
      }

      if(this.profile.type == '2') {
        this.user.profile.id = +this.profile.type;
      }
    } else {
      this.user.profile.id = +this.profile.type;
    }
    this.user.documentType="01";
    //this.user.organization.id = 1;
    if(this.genderMale) {
      this.user.genderTypeId = "1";
    } else if(this.genderFamele) {
      this.user.genderTypeId = "2";
    }
    this.userService.saveUser({data: this.user})
    .subscribe(resp => {
      if(this.user != null) {
        swal.fire(
          'Usuario registrado correctamente!',
          'Con éxito!',
          'success'
        )
      }
      this.router.navigate(['/log/fl']);
    });

    e.preventDefault();
  }

}
