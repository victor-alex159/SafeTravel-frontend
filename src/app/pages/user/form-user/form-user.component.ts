import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientBean } from 'src/app/Beans/Client';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  user: UserBean;
  client: ClientBean;
  organizationList: Array<OrganizationBean> = [];
  date_format:string = 'dd/MM/yyyy';
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);


  constructor(
    private userService: UserService,
    public authService: AuthService,
    private organizationService: OrganizationServiceService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new UserBean();
    this.getAllOrganizations();
  }

  public getAllOrganizations() {
    this.organizationService.getAllOrganization({})
      .subscribe(resp => {
        this.organizationList = resp.datalist;
      });
  }

  public saveUser(e: any) {
    //const swal = require('sweetalert2');
    let profile = new ProfileBean();
    this.user.profile = profile;
    if(!this.authService.hasRole('Administrador')) {
      this.user.profile.id = 3;
    }
    this.user.documentType="01";
    //this.user.organization.id = 1;
    if(this.user.genderTypeId == 'Masculino' || this.user.genderTypeId == 'Femenino') {
      this.user.genderTypeId = "1";
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
      this.router.navigate(['/fl']);
    });

    e.preventDefault();
  }

}
