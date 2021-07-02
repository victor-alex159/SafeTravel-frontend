import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  user: UserBean;
  @Input() userId: number;
  organizationList: Array<OrganizationBean> = [];
  profile: ProfileBean = new ProfileBean();
  date_format:string = 'dd/MM/yyyy';
  genderMale: boolean = false;
  genderFamele: boolean = false;
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);
  userProfileType: string;
  disableEdit: boolean = false;
  @Output() closePopup: EventEmitter<string> = new EventEmitter<string>();
  typePosition: any = [
    {type: '2', name: 'Administrador - Organización'},
    {type: '3', name: 'Turista'}
  ];

  listGender: any = [
    { genderTypeId: "1", description: "Masculino" },
    { genderTypeId: "2", description: "Femenino" }
  ]

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
    if(this.userId) {
      this.disableEdit = true;
      this.getUserById(this.userId);
    }
  }

  public getAllOrganizations() {
    this.organizationService.getAllOrganization({})
      .subscribe(resp => {
        this.organizationList = resp.datalist;
      });
  }

  public getUserById(id: number) {
    let userBean = new UserBean();
    userBean.id = id;
    this.userService.getUserById({data: userBean})
      .subscribe(resp => {
        this.user = resp.data;
        this.profile = this.user.profile;
        this.userProfileType = this.user.profile.type;
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
    /* if(this.user.id == null) {
      let salt = bcrypt.genSaltSync(10);
      this.user.password = bcrypt.hashSync(this.user.documentNumber, salt); 
    } */
    this.userService.saveUser({data: this.user})
    .subscribe(resp => {
      if(this.user != null) {
        swal.fire(
          'Usuario registrado correctamente!',
          'Con éxito!',
          'success'
        )
      }
      this.closePopup.emit("false");
    });
    this.userProfileType = '';

    e.preventDefault();
  }
}
