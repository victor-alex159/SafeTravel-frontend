import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import * as bcrypt from 'bcryptjs';
import swal from 'sweetalert2'
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserBean;
  userBefore: UserBean;
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
  listGender: any = [
    { genderTypeId: "1", description: "Masculino" },
    { genderTypeId: "2", description: "Femenino" }
  ]

  image: string;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  urlImageSelected: any;
  enableEdit: boolean = false;
  enableChangePassword: boolean = false;
  showInfo: boolean = true;
  password: string;
  passwordVerificated: string;
  passwordChanged: boolean = false;
  noSavedPhoto: boolean = false;

  constructor(
    public authService: AuthService,
    private sanitization: DomSanitizer,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.user = new UserBean();
    this.userBefore = new UserBean();
    this.sharedService.sendOrRecieveData('/uc/gubus', {}, false)
    .subscribe(resp => {
      this.user = resp.data;
      this.userBefore = JSON.parse(JSON.stringify(this.user));
      this.sharedService.getImageById('/uc/gi', this.user.id)
      .subscribe(resp => {
        if(resp.data) {
          this.getImage(resp.data);
        }
      });
    });
    
  }

  getImage(base64: any){
    let objectURL = 'data:image/jpeg;base64,' + base64;
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
    this.imagenEstado = true;
  }

  selectImage( e: any ): void {
    this.image = e.target.files[0].name;
    this.selectedFiles = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload= (e)=> {
      this.urlImageSelected = e.target.result;
    };
    this.imagenEstado = false
    this.noSavedPhoto = true;
  }

  public savePhoto() {
    if(this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File( [''], 'None' );
    }
    this.sharedService.sendDataWithFile('/uc/sp', this.user, 'userPhoto', this.currentFileUpload)
      .subscribe(resp => {
        swal.fire(
          'Su foto se ha actualizado',
          'Con éxito!',
          'success'
        )
      });
      this.noSavedPhoto = false;
  }

  public seeInfo() {
    this.showInfo = true;
    this.enableChangePassword = false;
    this.enableEdit = false;
    this.user = JSON.parse(JSON.stringify(this.userBefore));
  }

  public editInfo() {
    this.enableEdit = true;
    this.enableChangePassword = false;
  }

  public save() {
    this.enableEdit = false;
    console.log(this.user.password)
    this.sharedService.sendOrRecieveData('/uc/su', this.user, true)
      .subscribe(resp => {
        swal.fire(
          'Se ha guardado correctamente!',
          'Con éxito!',
          'success'
        )
        this.user = resp.data
      });
  }

  public cancelEditForm() {
    this.enableEdit = false;
    this.user = JSON.parse(JSON.stringify(this.userBefore));
  }

  public changePassword() {
    if(this.password == this.passwordVerificated) {
      let salt = bcrypt.genSaltSync(10);
      this.user.password = bcrypt.hashSync(this.password, salt);
      this.sharedService.sendOrRecieveData('/uc/cp/', this.user, true)
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
  }

}
