import { Component, OnInit } from '@angular/core';
import { ClientBean } from 'src/app/Beans/Client';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { ClientService } from 'src/app/services/client.service';
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
  date_format:string = 'dd/MM/yyyy';
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);


  constructor(
    private userService: UserService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.client = new ClientBean();
  }

  public saveUser(e: any) {
    //const swal = require('sweetalert2');
    let profile = new ProfileBean();
    this.client.profile = profile;
    this.client.profile.id = 2;
    this.client.documentType="01";
    this.client.organization = new OrganizationBean();
    this.client.organization.id = 1;
    if(this.client.genderTypeId == 'Masculino' || this.client.genderTypeId == 'Femenino') {
      this.client.genderTypeId = "1";
    }
    this.clientService.saveClient({data: this.client})
    .subscribe(resp => {
      if(this.client != null) {
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
