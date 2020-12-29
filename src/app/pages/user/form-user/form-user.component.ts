import { Component, OnInit } from '@angular/core';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  user: UserBean;
  date_format:string = 'dd/MM/yyyy';
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = new UserBean();
  }

  public saveUser(e: any) {
    //const swal = require('sweetalert2');
    let profile = new ProfileBean();
    this.user.profile = profile;
    this.user.profile.id = 1;
    this.user.documentType="01";
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
    });

    e.preventDefault();
  }

}
