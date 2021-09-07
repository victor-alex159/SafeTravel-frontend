import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';
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
  organizationBean: OrganizationBean;
  organizationId: number;
  userProfileType: string = '';
  typeUser: any = [
    {
      type: '2',
      name: 'Organización'
    },
    {
      type: '3',
      name: 'Turista'
    }
  ];

  constructor(
    public authService: AuthService,
    private router: Router,
    public constants: ConstantsService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.user = new UserBean();
    this.organizationBean = new OrganizationBean();
    if(this.authService.hasRole('Administrador')) {
      this.getAllOrganizations();
    }
  }

  public getAllOrganizations() {
    this.sharedService.sendOrRecieveData('/oc/gao', {}, true)
      .subscribe(resp => {
        this.organizationList = resp.datalist;
      });
  }

  public saveUser(e: any) {
    this.user.profile = this.profile;
    this.user.profile.id = +this.profile.type;
    this.user.documentType="01";
    if(this.genderMale) {
      this.user.genderTypeId = "1";
    } else if(this.genderFamele) {
      this.user.genderTypeId = "2";
    }
    if(this.userProfileType == this.constants.TYPE_PROFILE_ORGANIZATION) {
      this.sharedService.sendOrRecieveData('/oc/so', this.organizationBean, false)
      .subscribe(resp => {
        this.organizationId = resp.data.id;
        this.user.organizationId = this.organizationId;
      });
    }
    setTimeout(() => {
      this.sharedService.sendOrRecieveData('/uc/su', this.user, true)
      .subscribe(resp => {
        swal.fire(
          'Se ha registrado correctamente!',
          'Con éxito!',
          'success'
          )
          this.router.navigate(['/log/fl']);
        });
    }, 1000);
      e.preventDefault();
  }

  public selecProfileUser(e: any) {
    this.userProfileType = e.value;
    if(this.userProfileType == this.constants.TYPE_PROFILE_TOURIST) {
      this.organizationBean = new OrganizationBean();
    }
  }

}
